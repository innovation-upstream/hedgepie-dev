// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./libraries/SafeBEP20.sol";
import "./libraries/Ownable.sol";

import "./interfaces/IYBNFT.sol";
import "./interfaces/IAdapter.sol";
import "./interfaces/IVaultStrategy.sol";
import "./interfaces/IAdapterManager.sol";
import "./interfaces/IPancakePair.sol";
import "./interfaces/IPancakeRouter.sol";
import "./interfaces/IPancakePair.sol";

contract HedgepieInvestor is Ownable, ReentrancyGuard {
    using SafeBEP20 for IBEP20;

    struct UserAdapterInfo {
        uint256 amount;
        uint256 userShares;
    }

    struct AdapterInfo {
        uint256 accTokenPerShare;
        uint256 totalStaked;
    }

    // user => ybnft => nft id => amount(Invested WBNB)
    mapping(address => mapping(address => mapping(uint256 => uint256)))
        public userInfo;

    // user => nft id => adapter => UserAdapterInfo
    mapping(address => mapping(uint256 => mapping(address => UserAdapterInfo)))
        public userAdapterInfos;

    // nft id => adapter => AdapterInfo
    mapping(uint256 => mapping(address => AdapterInfo)) public adapterInfos;

    // ybnft address
    address public ybnft;

    // swap router address
    address public swapRouter;

    // wrapped bnb address
    address public wbnb;

    // strategy manager
    address public adapterManager;

    address public treasuryAddr;
    uint256 public taxPercent;

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
     * @notice Set treasury address and percent
     * @param _treasury  treasury address
     * @param _percent  user address
     */
    function setTreasury(address _treasury, uint256 _percent)
        external
        onlyOwner
    {
        require(_treasury != address(0), "Invalid address");

        treasuryAddr = _treasury;
        taxPercent = _percent;
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
        require(_amount != 0, "Error: Amount can not be 0");
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
            if (routerAddr == address(0)) {
                // swap
                amountOut = _swapOnPKS(
                    adapter.addr,
                    amountIn,
                    _token,
                    adapter.token
                );
            } else {
                // get lp
                amountOut = _getLP(
                    adapter.addr,
                    amountIn,
                    _token,
                    adapter.token,
                    routerAddr
                );
            }

            // deposit to adapter
            _depositToAdapter(adapter.token, adapter.addr, _tokenId, amountOut);
            userAdapterInfos[_user][_tokenId][adapter.addr].amount += amountOut;
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
        require(_amount != 0, "Error: Amount can not be 0");
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
            if (routerAddr == address(0)) {
                // swap
                amountOut = _swapOnRouterBNB(
                    adapter.addr,
                    amountIn,
                    adapter.token,
                    swapRouter
                );
            } else {
                // get lp
                amountOut = _getLPBNB(
                    adapter.addr,
                    amountIn,
                    adapter.token,
                    routerAddr
                );
            }

            // deposit to adapter
            _depositToAdapter(adapter.token, adapter.addr, _tokenId, amountOut);

            userAdapterInfos[_user][_tokenId][adapter.addr].amount += amountOut;
            adapterInfos[_tokenId][adapter.addr].totalStaked += amountOut;
        }

        userInfo[_user][ybnft][_tokenId] += _amount;

        uint256 afterBalance = address(this).balance;
        if (afterBalance > beforeBalance)
            payable(_user).transfer(afterBalance - beforeBalance);

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
        require(userAmount != 0, "Error: Amount should be greater than 0");

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
                adapter.addr,
                userAdapterInfos[_user][_tokenId][adapter.addr].amount,
                adapter.token,
                _token
            );

            userAdapterInfos[_user][_tokenId][adapter.addr].amount = 0;
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
    function withdrawBNB(address _user, uint256 _tokenId)
        external
        shouldMatchCaller(_user)
        nonReentrant
    {
        require(
            IYBNFT(ybnft).exists(_tokenId),
            "Error: nft tokenId is invalid"
        );
        uint256 userAmount = userInfo[_user][ybnft][_tokenId];
        require(userAmount != 0, "Error: Amount should be greater than 0");

        IYBNFT.Adapter[] memory adapterInfo = IYBNFT(ybnft).getAdapterInfo(
            _tokenId
        );

        uint256 amountOut;
        for (uint8 i = 0; i < adapterInfo.length; i++) {
            IYBNFT.Adapter memory adapter = adapterInfo[i];
            uint256[2] memory balances;
            balances[0] = IBEP20(adapter.token).balanceOf(address(this));

            UserAdapterInfo storage userAdapter = userAdapterInfos[msg.sender][
                _tokenId
            ][adapter.addr];

            _withdrawFromAdapter(
                adapter.addr,
                _tokenId,
                IAdapter(adapter.addr).getWithdrawalAmount(msg.sender, _tokenId)
            );

            balances[1] = IBEP20(adapter.token).balanceOf(address(this));
            if (IAdapter(adapter.addr).router() == address(0)) {
                // swap
                amountOut += _swapforBNB(
                    adapter.addr,
                    balances[1] - balances[0],
                    adapter.token,
                    swapRouter
                );
            } else {
                uint256 taxAmount;

                // withdraw lp and get BNB
                if (
                    IAdapter(adapter.addr).rewardToken() ==
                    IAdapter(adapter.addr).stakingToken()
                ) {
                    // Get fee to BNB
                    uint256 _vAmount = (userAdapter.userShares *
                        IVaultStrategy(IAdapter(adapter.addr).vStrategy())
                            .wantLockedTotal()) /
                        IVaultStrategy(IAdapter(adapter.addr).vStrategy())
                            .sharesTotal();

                    if (
                        _vAmount >
                        IAdapter(adapter.addr).getWithdrawalAmount(
                            msg.sender,
                            _tokenId
                        )
                    ) {
                        taxAmount =
                            ((_vAmount -
                                IAdapter(adapter.addr).getWithdrawalAmount(
                                    _user,
                                    _tokenId
                                )) * taxPercent) /
                            1e4;

                        if (taxAmount != 0) {
                            IBEP20(adapter.token).transfer(
                                treasuryAddr,
                                taxAmount
                            );
                        }
                    }

                    userAdapter.userShares = 0;
                }

                amountOut += _withdrawLPBNB(
                    adapter.addr,
                    balances[1] - balances[0] - taxAmount,
                    adapter.token,
                    IAdapter(adapter.addr).router()
                );

                if (IAdapter(adapter.addr).rewardToken() != address(0)) {
                    // Convert rewards to BNB

                    uint256 rewards = _getRewards(
                        _tokenId,
                        msg.sender,
                        adapter.addr
                    );

                    taxAmount = (rewards * taxPercent) / 1e4;

                    if (taxAmount != 0) {
                        IBEP20(IAdapter(adapter.addr).rewardToken()).transfer(
                            treasuryAddr,
                            taxAmount
                        );
                    }

                    if (rewards != 0) {
                        amountOut += _swapforBNB(
                            adapter.addr,
                            rewards - taxAmount,
                            IAdapter(adapter.addr).rewardToken(),
                            swapRouter
                        );
                    }
                }
            }

            adapterInfos[_tokenId][adapter.addr]
                .totalStaked -= userAdapterInfos[_user][_tokenId][adapter.addr]
                .amount;
            userAdapterInfos[_user][_tokenId][adapter.addr].amount = 0;
        }

        userInfo[_user][ybnft][_tokenId] -= userAmount;

        if (amountOut != 0) payable(_user).transfer(amountOut);
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
        uint256[2] memory repayTokenAmount;
        uint256[2] memory rewardTokenAmount;
        uint256[2] memory shares;

        address stakingToken = IAdapter(_adapterAddr).stakingToken();
        address repayToken = IAdapter(_adapterAddr).repayToken();
        address rewardToken = IAdapter(_adapterAddr).rewardToken();

        repayTokenAmount[0] = repayToken != address(0)
            ? IBEP20(repayToken).balanceOf(address(this))
            : 0;
        rewardTokenAmount[0] = rewardToken != address(0)
            ? IBEP20(rewardToken).balanceOf(address(this))
            : 0;
        shares[0] = rewardToken == stakingToken
            ? IAdapter(_adapterAddr).pendingShares()
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

        repayTokenAmount[1] = repayToken != address(0)
            ? IBEP20(repayToken).balanceOf(address(this))
            : 0;
        rewardTokenAmount[1] = rewardToken != address(0)
            ? IBEP20(rewardToken).balanceOf(address(this))
            : 0;
        shares[1] = rewardToken == stakingToken
            ? IAdapter(_adapterAddr).pendingShares()
            : 0;

        if (rewardToken == stakingToken) {
            require(shares[1] > shares[0], "Error: Deposit failed");

            userAdapterInfos[msg.sender][_tokenId][_adapterAddr].userShares +=
                shares[1] -
                shares[0];

            IAdapter(_adapterAddr).increaseWithdrawalAmount(
                msg.sender,
                _tokenId,
                shares[1] - shares[0]
            );
        } else if (repayToken != address(0)) {
            require(
                repayTokenAmount[1] > repayTokenAmount[0],
                "Error: Deposit failed"
            );
            IAdapter(_adapterAddr).increaseWithdrawalAmount(
                msg.sender,
                _tokenId,
                repayTokenAmount[1] - repayTokenAmount[0]
            );
        } else if (rewardToken != address(0)) {
            // Farm Pool

            if (rewardTokenAmount[1] - rewardTokenAmount[0] != 0) {
                AdapterInfo storage adapter = adapterInfos[_tokenId][
                    _adapterAddr
                ];

                if (adapter.totalStaked != 0)
                    adapter.accTokenPerShare +=
                        ((rewardTokenAmount[1] - rewardTokenAmount[0]) * 1e12) /
                        adapter.totalStaked;
            }

            if (
                userAdapterInfos[msg.sender][_tokenId][_adapterAddr].amount == 0
            ) {
                userAdapterInfos[msg.sender][_tokenId][_adapterAddr]
                    .userShares = adapterInfos[_tokenId][_adapterAddr]
                    .accTokenPerShare;
            }

            IAdapter(_adapterAddr).increaseWithdrawalAmount(
                msg.sender,
                _tokenId,
                _amount
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
        address vStrategy = IAdapter(_adapterAddr).vStrategy();
        address stakingToken = IAdapter(_adapterAddr).stakingToken();
        address rewardToken = IAdapter(_adapterAddr).rewardToken();
        uint256[2] memory rewardTokenAmount;
        UserAdapterInfo memory userAdapter = userAdapterInfos[msg.sender][
            _tokenId
        ][_adapterAddr];

        rewardTokenAmount[0] = rewardToken != address(0)
            ? IBEP20(rewardToken).balanceOf(address(this))
            : 0;

        // Vault case - recalculate want token withdrawal amount for user
        uint256 _vAmount;
        if (rewardToken == stakingToken) {
            _vAmount =
                (userAdapter.userShares *
                    IVaultStrategy(vStrategy).wantLockedTotal()) /
                IVaultStrategy(vStrategy).sharesTotal();
        }

        (address to, uint256 value, bytes memory callData) = IAdapterManager(
            adapterManager
        ).getWithdrawCallData(_adapterAddr, _vAmount == 0 ? _amount : _vAmount);

        (bool success, ) = to.call{value: value}(callData);

        rewardTokenAmount[1] = rewardToken != address(0)
            ? IBEP20(rewardToken).balanceOf(address(this))
            : 0;

        if (rewardToken != address(0)) {
            if (rewardTokenAmount[1] - rewardTokenAmount[0] != 0) {
                AdapterInfo storage adapter = adapterInfos[_tokenId][
                    _adapterAddr
                ];

                if (adapter.accTokenPerShare != 0)
                    adapter.accTokenPerShare +=
                        ((rewardTokenAmount[1] - rewardTokenAmount[0]) * 1e12) /
                        adapter.totalStaked;
            }
        }

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
     * @param _adapter  address of adapter
     * @param _inToken  address of inToken
     * @param _outToken  address of outToken
     */
    function _getPaths(
        address _adapter,
        address _inToken,
        address _outToken
    ) internal view returns (address[] memory path) {
        return IAdapter(_adapter).getPaths(_inToken, _outToken);
    }

    /**
     * @notice Swap token via pancakeswap router
     * @param _adapter  address of adapter
     * @param _amountIn  amount of inToken
     * @param _inToken  address of inToken
     * @param _outToken  address of outToken
     */
    function _swapOnPKS(
        address _adapter,
        uint256 _amountIn,
        address _inToken,
        address _outToken
    ) internal returns (uint256 amountOut) {
        IBEP20(_inToken).safeApprove(swapRouter, _amountIn);
        address[] memory path = _getPaths(_adapter, _inToken, _outToken);
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
     * @param _adapter  address of adapter
     * @param _amountIn  amount of inToken
     * @param _outToken  address of outToken
     * @param _router  address of router
     */
    function _swapOnRouterBNB(
        address _adapter,
        uint256 _amountIn,
        address _outToken,
        address _router
    ) internal returns (uint256 amountOut) {
        address[] memory path = _getPaths(_adapter, wbnb, _outToken);
        uint256 beforeBalance = IBEP20(_outToken).balanceOf(address(this));
        IPancakeRouter(_router)
            .swapExactETHForTokensSupportingFeeOnTransferTokens{
            value: _amountIn
        }(0, path, address(this), block.timestamp + 2 hours);

        uint256 afterBalance = IBEP20(_outToken).balanceOf(address(this));
        amountOut = afterBalance - beforeBalance;
    }

    /**
     * @notice Swap tokens to BNB
     * @param _adapter  address of adapter
     * @param _amountIn  amount of inToken
     * @param _inToken  address of inToken
     * @param _router  address of swap router
     */
    function _swapforBNB(
        address _adapter,
        uint256 _amountIn,
        address _inToken,
        address _router
    ) internal returns (uint256 amountOut) {
        address[] memory path = _getPaths(_adapter, _inToken, wbnb);
        uint256 beforeBalance = address(this).balance;

        IBEP20(_inToken).approve(address(_router), _amountIn);

        IPancakeRouter(_router)
            .swapExactTokensForETHSupportingFeeOnTransferTokens(
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
     * @param _adapter  address of adapter
     * @param _amountIn  amount of inToken
     * @param _inToken  address of inToken
     * @param _pairToken  address of pairToken
     * @param _router  address of router
     */
    function _getLP(
        address _adapter,
        uint256 _amountIn,
        address _inToken,
        address _pairToken,
        address _router
    ) internal returns (uint256 amountOut) {
        address token0 = IPancakePair(_pairToken).token0();
        address token1 = IPancakePair(_pairToken).token1();

        uint256 token0Amount = _amountIn / 2;
        uint256 token1Amount = _amountIn - token0Amount;
        if (token0 != _inToken) {
            token0Amount = _swapOnPKS(_adapter, token0Amount, _inToken, token0);
        }

        if (token1 != _inToken) {
            token1Amount = _swapOnPKS(_adapter, token1Amount, _inToken, token1);
        }

        if (token0Amount != 0 && token1Amount != 0) {
            IBEP20(token0).safeApprove(_router, token0Amount);
            IBEP20(token1).safeApprove(_router, token1Amount);
            (, , amountOut) = IPancakeRouter(_router).addLiquidity(
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
     * @param _adapter  address of adapter
     * @param _amountIn  amount of inToken
     * @param _pairToken  address of pairToken
     * @param _router  address of router
     */
    function _getLPBNB(
        address _adapter,
        uint256 _amountIn,
        address _pairToken,
        address _router
    ) internal returns (uint256 amountOut) {
        address token0 = IPancakePair(_pairToken).token0();
        address token1 = IPancakePair(_pairToken).token1();

        uint256 token0Amount = _amountIn / 2;
        uint256 token1Amount = _amountIn / 2;
        if (token0 != wbnb) {
            token0Amount = _swapOnRouterBNB(
                _adapter,
                token0Amount,
                token0,
                _router
            );
            IBEP20(token0).safeApprove(_router, token0Amount);
        }

        if (token1 != wbnb) {
            token1Amount = _swapOnRouterBNB(
                _adapter,
                token1Amount,
                token1,
                _router
            );
            IBEP20(token1).safeApprove(_router, token1Amount);
        }

        if (token0Amount != 0 && token1Amount != 0) {
            if (token0 == wbnb || token1 == wbnb) {
                (, , amountOut) = IPancakeRouter(_router).addLiquidityETH{
                    value: token0 == wbnb ? token0Amount : token1Amount
                }(
                    token0 == wbnb ? token1 : token0,
                    token0 == wbnb ? token1Amount : token0Amount,
                    0,
                    0,
                    address(this),
                    block.timestamp + 2 hours
                );
            } else {
                (, , amountOut) = IPancakeRouter(_router).addLiquidity(
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
     * @param _adapter  address of adapter
     * @param _amountIn  amount of inToken
     * @param _pairToken  address of pairToken
     * @param _router  address of router
     */
    function _withdrawLPBNB(
        address _adapter,
        uint256 _amountIn,
        address _pairToken,
        address _router
    ) internal returns (uint256 amountOut) {
        address token0 = IPancakePair(_pairToken).token0();
        address token1 = IPancakePair(_pairToken).token1();

        IBEP20(_pairToken).safeApprove(_router, _amountIn);

        if (token0 == wbnb || token1 == wbnb) {
            address tokenAddr = token0 == wbnb ? token1 : token0;
            (uint256 amountToken, uint256 amountETH) = IPancakeRouter(_router)
                .removeLiquidityETH(
                    tokenAddr,
                    _amountIn,
                    0,
                    0,
                    address(this),
                    block.timestamp + 2 hours
                );

            amountOut = amountETH;
            amountOut += _swapforBNB(_adapter, amountToken, tokenAddr, _router);
        } else {
            (uint256 amountA, uint256 amountB) = IPancakeRouter(_router)
                .removeLiquidity(
                    token0,
                    token1,
                    _amountIn,
                    0,
                    0,
                    address(this),
                    block.timestamp + 2 hours
                );

            amountOut += _swapforBNB(_adapter, amountA, token0, _router);
            amountOut += _swapforBNB(_adapter, amountB, token1, _router);
        }
    }

    /**
     * @notice Get current rewards amount in BNB
     * @param _account user account address
     * @param _tokenId NFT token id
     */
    function pendingReward(address _account, uint256 _tokenId)
        public
        view
        returns (uint256)
    {
        IYBNFT.Adapter[] memory ybnftAapters = IYBNFT(ybnft).getAdapterInfo(
            _tokenId
        );

        uint256 rewards;

        for (uint8 i = 0; i < ybnftAapters.length; i++) {
            IYBNFT.Adapter memory adapter = ybnftAapters[i];
            AdapterInfo memory adapterInfo = adapterInfos[_tokenId][
                adapter.addr
            ];

            if (
                IAdapter(adapter.addr).rewardToken() != address(0) &&
                adapterInfo.totalStaked != 0 &&
                adapterInfo.accTokenPerShare != 0
            ) {
                UserAdapterInfo memory userAdapterInfo = userAdapterInfos[
                    _account
                ][_tokenId][adapter.addr];

                uint256 updatedAccTokenPerShare = adapterInfo.accTokenPerShare +
                    ((IAdapter(adapter.addr).pendingReward() * 1e12) /
                        adapterInfo.totalStaked);

                uint256 tokenRewards = ((updatedAccTokenPerShare -
                    userAdapterInfo.userShares) * userAdapterInfo.amount) /
                    1e12;

                rewards += IPancakeRouter(swapRouter).getAmountsOut(
                    tokenRewards,
                    _getPaths(
                        adapter.addr,
                        IAdapter(adapter.addr).rewardToken(),
                        wbnb
                    )
                )[1];
            }
        }

        return rewards;
    }

    /**
     * @notice Get current rewards amount
     * @param _adapterAddr  address of Adapter
     * @param _account user account address
     */
    function _getRewards(
        uint256 _tokenId,
        address _account,
        address _adapterAddr
    ) internal returns (uint256) {
        AdapterInfo memory adapter = adapterInfos[_tokenId][_adapterAddr];
        UserAdapterInfo memory userAdapterInfo = userAdapterInfos[_account][
            _tokenId
        ][_adapterAddr];

        if (
            IAdapter(_adapterAddr).rewardToken() == address(0) ||
            adapter.totalStaked == 0 ||
            adapter.accTokenPerShare == 0
        ) return 0;

        return
            ((adapter.accTokenPerShare - userAdapterInfo.userShares) *
                userAdapterInfo.amount) / 1e12;
    }

    receive() external payable {}
}
