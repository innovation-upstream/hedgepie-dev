// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./libraries/SafeBEP20.sol";
import "./libraries/Ownable.sol";

import "./interfaces/IYBNFT.sol";
import "./interfaces/IAdapter.sol";
import "./interfaces/IAdapterManager.sol";
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
    // borrowDepth
    uint8 public borrowDepth;

    event Deposit(
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
    event AdapterManagerChanged(address indexed user, address adapterManager);
    event BorrowDepthChanged(uint8 depth);

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
        IBEP20(_token).safeApprove(swapRouter, _amount);

        IYBNFT.Adapter[] memory adapterInfo = IYBNFT(ybnft).getAdapterInfo(
            _tokenId
        );

        for (uint8 i = 0; i < adapterInfo.length; i++) {
            IYBNFT.Adapter memory adapter = adapterInfo[i];

            // swap
            uint256 amountIn = (_amount * adapter.allocation) / 1e4;
            uint256 amountOut = _swapOnPKS(amountIn, _token, adapter.token);

            // deposit to adapter
            _depositToAdapter(adapter.token, adapter.addr, _tokenId, amountOut);
            userAdapterInfo[_user][_tokenId][adapter.addr] += amountOut;
        }

        userInfo[_user][ybnft][_tokenId] += _amount;
        emit Deposit(_user, ybnft, _tokenId, _amount);
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
            IBEP20(adapter.token).safeApprove(
                swapRouter,
                userAdapterInfo[_user][_tokenId][adapter.addr]
            );
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
     * @notice Set strategy manager contract
     * @param _adapterManager  nft address
     */
    function setAdapterManager(address _adapterManager) external onlyOwner {
        require(_adapterManager != address(0), "Error: Invalid NFT address");

        adapterManager = _adapterManager;

        emit AdapterManagerChanged(msg.sender, _adapterManager);
    }

    /**
     * @notice Set borrow depth
     * @param _borrowDepth borrow depth number
     */
    function setBorrowDepth(uint8 _borrowDepth) external onlyOwner {
        require(_borrowDepth != 0, "Error: borrowDepth number");

        borrowDepth = _borrowDepth;

        emit BorrowDepthChanged(borrowDepth);
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
            ? IBEP20(IAdapter(_adapterAddr).strategy()).balanceOf(address(this))
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
            ? IBEP20(IAdapter(_adapterAddr).strategy()).balanceOf(address(this))
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
}
