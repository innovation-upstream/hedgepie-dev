// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./libraries/SafeBEP20.sol";
import "./libraries/Ownable.sol";

import "./interfaces/IYBNFT.sol";
import "./interfaces/IAdapter.sol";
import "./interfaces/IAdapterManager.sol";
import "./interfaces/IPancakePair.sol";
import "./interfaces/IPancakeRouter.sol";

contract HedgepieInvestor is Ownable, ReentrancyGuard {
    using SafeBEP20 for IBEP20;

    // user => ybnft => nft id => amount
    mapping(address => mapping(address => mapping(uint256 => uint256)))
        public userInfo;
    // user => nft id => adapter => amount
    mapping(address => mapping(uint256 => mapping(address => uint256)))
        public userAdapterInfo;
    // ybnft address
    address public ybnft;
    // swap router address
    address public swapRouter;
    // wrapped bnb address
    address public wbnb;
    // strategy manager
    address public adapterManager;

    event Deposit(
        address indexed user,
        address nft,
        uint256 nftId,
        uint256 amount
    );
    event DepositBNB(
        address indexed user,
        address nft,
        uint256 nftId,
        uint256 amount
    );
    event Withdraw(
        address indexed user,
        address nft,
        uint256 nftId,
        uint256 amount
    );
    event WithdrawBNB(
        address indexed user,
        address nft,
        uint256 nftId,
        uint256 amount
    );
    event AdapterManagerChanged(address indexed user, address adapterManager);

    /**
     * @notice Construct
     * @param _ybnft  address of YBNFT
     * @param _swapRouter  address of pancakeswap router
     * @param _wbnb  address of Wrapped BNB address
     */
    constructor(
        address _ybnft,
        address _swapRouter,
        address _wbnb
    ) {
        require(_ybnft != address(0), "Error: YBNFT address missing");
        require(_swapRouter != address(0), "Error: swap router missing");
        require(_wbnb != address(0), "Error: WBNB missing");

        ybnft = _ybnft;
        swapRouter = _swapRouter;
        wbnb = _wbnb;
    }

    /**
     * @notice Throws if sender and user address is not matched
     */
    modifier shouldMatchCaller(address _user) {
        require(_user == msg.sender, "Error: Caller is not matched");
        _;
    }

    /**
     * @notice Deposit fund
     * @param _user  user address
     * @param _tokenId  YBNft token id
     * @param _token  token address
     * @param _amount  token amount
     */
    function deposit(
        address _user,
        uint256 _tokenId,
        address _token,
        uint256 _amount
    ) external shouldMatchCaller(_user) nonReentrant {
        require(_amount > 0, "Error: Amount can not be 0");
        require(
            IYBNFT(ybnft).exists(_tokenId),
            "Error: nft tokenId is invalid"
        );

        IBEP20(_token).safeTransferFrom(_user, address(this), _amount);

        IYBNFT.Adapter[] memory adapterInfo = IYBNFT(ybnft).getAdapterInfo(
            _tokenId
        );

        for (uint8 i = 0; i < adapterInfo.length; i++) {
            IYBNFT.Adapter memory adapter = adapterInfo[i];

            uint256 amountIn = (_amount * adapter.allocation) / 1e4;
            uint256 amountOut;
            address routerAddr = IAdapter(adapter.addr).router();
            if(routerAddr == address(0)) { // swap
                amountOut = _swapOnPKS(amountIn, _token, adapter.token);
            } else { // get lp
                amountOut = _getLP(amountIn, _token, adapter.token, routerAddr);
            }

            // deposit to adapter
            _depositToAdapter(adapter.token, adapter.addr, _tokenId, amountOut);
            userAdapterInfo[_user][_tokenId][adapter.addr] += amountOut;
        }

        userInfo[_user][ybnft][_tokenId] += _amount;
        emit Deposit(_user, ybnft, _tokenId, _amount);
    }

    /**
     * @notice Deposit with BNB
     * @param _user  user address
     * @param _tokenId  YBNft token id
     * @param _amount  BNB amount
     */
    function depositBNB(
        address _user,
        uint256 _tokenId,
        uint256 _amount
    ) external payable shouldMatchCaller(_user) nonReentrant {
        require(_amount > 0, "Error: Amount can not be 0");
        require(msg.value == _amount, "Error: Insufficient BNB");
        require(
            IYBNFT(ybnft).exists(_tokenId),
            "Error: nft tokenId is invalid"
        );

        IYBNFT.Adapter[] memory adapterInfo = IYBNFT(ybnft).getAdapterInfo(
            _tokenId
        );

        uint256 beforeBalance = address(this).balance;

        for (uint8 i = 0; i < adapterInfo.length; i++) {
            IYBNFT.Adapter memory adapter = adapterInfo[i];

            uint256 amountIn = (_amount * adapter.allocation) / 1e4;
            uint256 amountOut;
            address routerAddr = IAdapter(adapter.addr).router();
            if(routerAddr == address(0)) { // swap
                amountOut = _swapOnRouuterBNB(amountIn, adapter.token, swapRouter);
            } else { // get lp
                amountOut = _getLPBNB(amountIn, adapter.token, routerAddr);
            }

            // deposit to adapter
            _depositToAdapter(adapter.token, adapter.addr, _tokenId, amountOut);
            userAdapterInfo[_user][_tokenId][adapter.addr] += amountOut;
        }

        userInfo[_user][ybnft][_tokenId] += _amount;

        uint256 afterBalance = address(this).balance;
        if(afterBalance > beforeBalance) payable(_user).transfer(afterBalance - beforeBalance);

        emit DepositBNB(_user, ybnft, _tokenId, _amount);
    }

    /**
     * @notice Withdraw fund
     * @param _user  user address
     * @param _tokenId  YBNft token id
     * @param _token  token address
     */
    function withdraw(
        address _user,
        uint256 _tokenId,
        address _token
    ) public shouldMatchCaller(_user) nonReentrant {
        uint256 userAmount = userInfo[_user][ybnft][_tokenId];
        require(
            IYBNFT(ybnft).exists(_tokenId),
            "Error: nft tokenId is invalid"
        );
        require(userAmount > 0, "Error: Amount should be greater than 0");

        IYBNFT.Adapter[] memory adapterInfo = IYBNFT(ybnft).getAdapterInfo(
            _tokenId
        );

        uint256 amountOut;
        for (uint8 i = 0; i < adapterInfo.length; i++) {
            IYBNFT.Adapter memory adapter = adapterInfo[i];
            _withdrawFromAdapter(
                adapter.addr,
                _tokenId,
                IAdapter(adapter.addr).getWithdrawalAmount(msg.sender, _tokenId)
            );

            // swap
            amountOut += _swapOnPKS(
                userAdapterInfo[_user][_tokenId][adapter.addr],
                adapter.token,
                _token
            );

            userAdapterInfo[_user][_tokenId][adapter.addr] = 0;
        }

        userInfo[_user][ybnft][_tokenId] -= userAmount;

        IBEP20(_token).safeTransfer(_user, amountOut);
        emit Withdraw(_user, ybnft, _tokenId, userAmount);
    }

    /**
     * @notice Withdraw by BNB
     * @param _user  user address
     * @param _tokenId  YBNft token id
     */
    function withdrawBNB(
        address _user,
        uint256 _tokenId
    ) external shouldMatchCaller(_user) nonReentrant {
        require(
            IYBNFT(ybnft).exists(_tokenId),
            "Error: nft tokenId is invalid"
        );
        uint256 userAmount = userInfo[_user][ybnft][_tokenId];
        require(userAmount > 0, "Error: Amount should be greater than 0");

        IYBNFT.Adapter[] memory adapterInfo = IYBNFT(ybnft).getAdapterInfo(
            _tokenId
        );

        uint256 amountOut;
        for (uint8 i = 0; i < adapterInfo.length; i++) {
            IYBNFT.Adapter memory adapter = adapterInfo[i];
            uint256 beforeBalance = IBEP20(adapter.token).balanceOf(address(this));
            _withdrawFromAdapter(
                adapter.addr,
                _tokenId,
                IAdapter(adapter.addr).getWithdrawalAmount(_user, _tokenId)
            );
            uint256 afterBalance = IBEP20(adapter.token).balanceOf(address(this));

            address routerAddr = IAdapter(adapter.addr).router();
            if(routerAddr == address(0)) { // swap
                amountOut += _swapforBNB(
                    afterBalance - beforeBalance,
                    adapter.token,
                    swapRouter
                );
            } else { // withdraw lp and get BNB
                amountOut += _withdrawLPBNB(
                    afterBalance - beforeBalance, 
                    adapter.token, 
                    routerAddr
                );
            }

            userAdapterInfo[_user][_tokenId][adapter.addr] = 0;
        }   

        userInfo[_user][ybnft][_tokenId] -= userAmount;

        if(amountOut > 0) payable(_user).transfer(amountOut);
        emit WithdrawBNB(_user, ybnft, _tokenId, userAmount);
    }

    /**
     * @notice Set strategy manager contract
     * @param _adapterManager  nft address
     */
    function setAdapterManager(address _adapterManager) external onlyOwner {
        require(_adapterManager != address(0), "Error: Invalid NFT address");

        adapterManager = _adapterManager;

        emit AdapterManagerChanged(msg.sender, _adapterManager);
    }

    /**
     * @notice deposit fund to adapter
     * @param _adapterAddr  adapter address
     * @param _amount  token amount
     */
    function _depositToAdapter(
        address _token,
        address _adapterAddr,
        uint256 _tokenId,
        uint256 _amount
    ) internal {
        address repayToken = IAdapter(_adapterAddr).repayToken();
        uint256 repayTokenAmountBefore = repayToken != address(0)
            // ? IBEP20(IAdapter(_adapterAddr).strategy()).balanceOf(address(this))
            ? IBEP20(repayToken).balanceOf(address(this))
            : 0;

        IBEP20(_token).safeApprove(
            IAdapterManager(adapterManager).getAdapterStrat(_adapterAddr),
            _amount
        );

        (address to, uint256 value, bytes memory callData) = IAdapterManager(
            adapterManager
        ).getDepositCallData(_adapterAddr, _amount);

        (bool success, ) = to.call{value: value}(callData);
        require(success, "Error: Deposit internal issue");

        uint256 repayTokenAmountAfter = repayToken != address(0)
            // ? IBEP20(IAdapter(_adapterAddr).strategy()).balanceOf(address(this))
            ? IBEP20(repayToken).balanceOf(address(this))
            : 0;

        if (repayToken != address(0)) {
            require(
                repayTokenAmountAfter > repayTokenAmountBefore,
                "Error: Deposit failed"
            );
            IAdapter(_adapterAddr).increaseWithdrawalAmount(
                msg.sender,
                _tokenId,
                repayTokenAmountAfter - repayTokenAmountBefore
            );
        } else {
            IAdapter(_adapterAddr).increaseWithdrawalAmount(
                msg.sender,
                _tokenId,
                _amount
            );
        }
    }

    /**
     * @notice Withdraw fund from adapter
     * @param _adapterAddr  adapter address
     * @param _amount  token amount
     */
    function _withdrawFromAdapter(
        address _adapterAddr,
        uint256 _tokenId,
        uint256 _amount
    ) internal {
        (address to, uint256 value, bytes memory callData) = IAdapterManager(
            adapterManager
        ).getWithdrawCallData(_adapterAddr, _amount);

        (bool success, ) = to.call{value: value}(callData);

        // update storage data on adapter
        IAdapter(_adapterAddr).increaseWithdrawalAmount(
            msg.sender,
            _tokenId,
            0
        );
        require(success, "Error: Withdraw internal issue");
    }

    /**
     * @notice Get path via pancakeswap router from inToken and outToken
     * @param _inToken  address of inToken
     * @param _outToken  address of outToken
     */
    function _getPaths(address _inToken, address _outToken)
        internal
        view
        returns (address[] memory path)
    {
        if (_outToken == wbnb || _inToken == wbnb) {
            path = new address[](2);
            path[0] = _inToken;
            path[1] = _outToken;
        } else {
            path = new address[](3);
            path[0] = _inToken;
            path[1] = wbnb;
            path[2] = _outToken;
        }
    }

    /**
     * @notice Swap token via pancakeswap router
     * @param _amountIn  amount of inToken
     * @param _inToken  address of inToken
     * @param _outToken  address of outToken
     */
    function _swapOnPKS(
        uint256 _amountIn,
        address _inToken,
        address _outToken
    ) internal returns (uint256 amountOut) {
        IBEP20(_inToken).safeApprove(swapRouter, _amountIn);
        address[] memory path = _getPaths(_inToken, _outToken);
        uint256[] memory amounts = IPancakeRouter(swapRouter)
            .swapExactTokensForTokens(
                _amountIn,
                0,
                path,
                address(this),
                block.timestamp + 2 hours
            );

        amountOut = amounts[amounts.length - 1];
    }

    /**
     * @notice Swap BNB to _outToken via router
     * @param _amountIn  amount of inToken
     * @param _outToken  address of outToken
     * @param _router  address of router
     */
    function _swapOnRouuterBNB(
        uint256 _amountIn,
        address _outToken,
        address _router
    ) internal returns (uint256 amountOut) {
        address[] memory path = _getPaths(wbnb, _outToken);
        uint256 beforeBalance = IBEP20(_outToken).balanceOf(address(this));
        IPancakeRouter(_router)
        .swapExactETHForTokensSupportingFeeOnTransferTokens{value: _amountIn} (
            0,
            path,
            address(this),
            block.timestamp + 2 hours
        );

        uint256 afterBalance = IBEP20(_outToken).balanceOf(address(this));
        amountOut = afterBalance - beforeBalance;
    }

    /**
     * @notice Swap tokens to BNB
     * @param _amountIn  amount of inToken
     * @param _inToken  address of inToken
     * @param _router  address of swap router
     */
    function _swapforBNB(
        uint256 _amountIn,
        address _inToken,
        address _router
    ) internal returns (uint256 amountOut) {
        address[] memory path = _getPaths(_inToken, wbnb);
        uint256 beforeBalance = address(this).balance;

        IBEP20(_inToken).approve(address(_router), _amountIn);

        IPancakeRouter(_router)
        .swapExactTokensForETHSupportingFeeOnTransferTokens (
            _amountIn,
            0,
            path,
            address(this),
            block.timestamp + 2 hours
        );

        uint256 afterBalance = address(this).balance;
        amountOut = afterBalance - beforeBalance;
    }

    /**
     * @notice GET pair LP from router
     * @param _amountIn  amount of inToken
     * @param _inToken  address of inToken
     * @param _pairToken  address of pairToken
     * @param _router  address of router
     */
    function _getLP(
        uint256 _amountIn,
        address _inToken,
        address _pairToken,
        address _router
    ) internal returns (uint256 amountOut) {
        address token0 = IPancakePair(_pairToken).token0();
        address token1 = IPancakePair(_pairToken).token1();

        uint256 token0Amount = _amountIn / 2;
        uint256 token1Amount = _amountIn / 2;
        if(token0 != _inToken) {
            token0Amount = _swapOnPKS(token0Amount, _inToken, token0);
        }

        if(token1 != _inToken) {
            token1Amount = _swapOnPKS(token1Amount, _inToken, token1);
        }

        if(token0Amount > 0 && token1Amount > 0) {
            IBEP20(token0).safeApprove(_router, token0Amount);
            IBEP20(token1).safeApprove(_router, token1Amount);
            (,, amountOut) = IPancakeRouter(_router).addLiquidity(
                token0, 
                token1, 
                token0Amount, 
                token1Amount, 
                0, 
                0, 
                address(this), 
                block.timestamp + 2 hours
            );
        }
    }

    /**
     * @notice GET LP using BNB
     * @param _amountIn  amount of inToken
     * @param _pairToken  address of pairToken
     * @param _router  address of router
     */
    function _getLPBNB(
        uint256 _amountIn,
        address _pairToken,
        address _router
    ) internal returns (uint256 amountOut) {
        address token0 = IPancakePair(_pairToken).token0();
        address token1 = IPancakePair(_pairToken).token1();

        uint256 token0Amount = _amountIn / 2;
        uint256 token1Amount = _amountIn / 2;
        if(token0 != wbnb) {
            token0Amount = _swapOnRouuterBNB(token0Amount, token0, _router);
            IBEP20(token0).safeApprove(_router, token0Amount);
        }

        if(token1 != wbnb) {
            token1Amount = _swapOnRouuterBNB(token1Amount, token1, _router);
            IBEP20(token1).safeApprove(_router, token1Amount);
        }

        if(token0Amount > 0 && token1Amount > 0) {
            if(token0 == wbnb || token1 == wbnb) {
                (,, amountOut) = IPancakeRouter(_router).addLiquidityETH{value: token0 == wbnb ? token0Amount : token1Amount} (
                    token0 == wbnb ? token1 : token0,
                    token0 == wbnb ? token1Amount : token0Amount, 
                    0, 
                    0, 
                    address(this), 
                    block.timestamp + 2 hours
                );
            } else {
                (,, amountOut) = IPancakeRouter(_router).addLiquidity(
                    token0, 
                    token1, 
                    token0Amount, 
                    token1Amount, 
                    0, 
                    0, 
                    address(this), 
                    block.timestamp + 2 hours
                );
            }
        }
    }

    /**
     * @notice Withdraw LP then swap pair tokens to BNB
     * @param _amountIn  amount of inToken
     * @param _pairToken  address of pairToken
     * @param _router  address of router
     */
    function _withdrawLPBNB(
        uint256 _amountIn,
        address _pairToken,
        address _router
    ) internal returns (uint256 amountOut) {
        address token0 = IPancakePair(_pairToken).token0();
        address token1 = IPancakePair(_pairToken).token1();

        IBEP20(_pairToken).safeApprove(_router, _amountIn);

        if(token0 == wbnb || token1 == wbnb) {
            address tokenAddr = token0 == wbnb ? token1 : token0;
            (uint256 amountToken, uint256 amountETH) = IPancakeRouter(_router).removeLiquidityETH(
                tokenAddr, 
                _amountIn, 
                0, 
                0, 
                address(this), 
                block.timestamp + 2 hours
            );

            amountOut = amountETH;
            amountOut += _swapforBNB(amountToken, tokenAddr, _router);
        } else {
            (uint256 amountA, uint256 amountB) = IPancakeRouter(_router).removeLiquidity(
                token0, 
                token1, 
                _amountIn, 
                0, 
                0, 
                address(this), 
                block.timestamp + 2 hours
            );

            amountOut += _swapforBNB(amountA, token0, _router);
            amountOut += _swapforBNB(amountB, token1, _router);
        }
    }

    receive() external payable {}
}
