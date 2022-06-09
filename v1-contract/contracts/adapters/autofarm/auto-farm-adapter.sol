// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IMasterChef {
    function pendingAUTO(uint256 pid, address user)
        external
        view
        returns (uint256);

    function userInfo(uint256 pid, address user)
        external
        view
        returns (uint256, uint256);
}

contract AutoFarmAdapter is Ownable {
    uint256 public poolID;
    address public stakingToken;
    address public rewardToken;
    address public repayToken;
    address public strategy;
    address public vStrategy;
    address public router;
    string public name;
    address public investor;

    // user => nft id => withdrawal amount
    mapping(address => mapping(uint256 => uint256)) public withdrawalAmount;

    // inToken => outToken => paths
    mapping(address => mapping(address => address[])) public paths;

    modifier onlyInvestor() {
        require(msg.sender == investor, "Error: Caller is not investor");
        _;
    }

    /**
     * @notice Construct
     * @param _strategy  address of strategy
     * @param _vStrategy  address of vault strategy
     * @param _stakingToken  address of staking token
     * @param _rewardToken  address of reward token
     * @param _router  address of DEX router
     * @param _name  adatper name
     */
    constructor(
        address _strategy,
        address _vStrategy,
        address _stakingToken,
        address _rewardToken,
        address _router,
        string memory _name
    ) {
        stakingToken = _stakingToken;
        rewardToken = _rewardToken;
        strategy = _strategy;
        vStrategy = _vStrategy;
        name = _name;
        router = _router;
    }

    /**
     * @notice Get withdrwal amount
     * @param _user  user address
     * @param _nftId  nftId
     */
    function getWithdrawalAmount(address _user, uint256 _nftId)
        external
        view
        returns (uint256 amount)
    {
        amount = withdrawalAmount[_user][_nftId];
    }

    /**
     * @notice Get invest calldata
     * @param _amount  amount of invest
     */
    function getInvestCallData(uint256 _amount)
        external
        view
        returns (
            address to,
            uint256 value,
            bytes memory data
        )
    {
        to = strategy;
        value = 0;
        data = abi.encodeWithSignature(
            "deposit(uint256,uint256)",
            poolID,
            _amount
        );
    }

    /**
     * @notice Get devest calldata`
     * @param _amount  amount of devest
     */
    function getDevestCallData(uint256 _amount)
        external
        view
        returns (
            address to,
            uint256 value,
            bytes memory data
        )
    {
        to = strategy;
        value = 0;
        data = abi.encodeWithSignature(
            "withdraw(uint256,uint256)",
            poolID,
            _amount
        );
    }

    /**
     * @notice Get pending AUTO token reward
     */
    function pendingReward() external view returns (uint256 reward) {
        reward = IMasterChef(strategy).pendingAUTO(poolID, msg.sender);
    }

    /**
     * @notice Get pending shares
     */
    function pendingShares() external view returns (uint256 shares) {
        (shares, ) = IMasterChef(strategy).userInfo(poolID, msg.sender);
    }

    /**
     * @notice Increase withdrwal amount
     * @param _user  user address
     * @param _nftId  nftId
     * @param _amount  amount of withdrawal
     */
    function increaseWithdrawalAmount(
        address _user,
        uint256 _nftId,
        uint256 _amount
    ) external onlyInvestor {
        withdrawalAmount[_user][_nftId] += _amount;
    }

    /**
     * @notice Set investor
     * @param _investor  address of investor
     */
    function setInvestor(address _investor) external onlyOwner {
        require(_investor != address(0), "Error: Investor zero address");
        investor = _investor;
    }

    /**
     * @notice Set poolId
     * @param _poolID pool in masterchef
     */
    function setPoolID(uint256 _poolID) external onlyOwner {
        poolID = _poolID;
    }

    /**
     * @notice Get path
     * @param _inToken token address of inToken
     * @param _outToken token address of outToken
     */
    function getPaths(address _inToken, address _outToken)
        external
        view
        onlyInvestor
        returns (address[] memory)
    {
        require(
            paths[_inToken][_outToken].length > 1,
            "Path length is not valid"
        );
        require(
            paths[_inToken][_outToken][0] == _inToken,
            "Path is not existed"
        );
        require(
            paths[_inToken][_outToken][paths[_inToken][_outToken].length - 1] ==
                _outToken,
            "Path is not existed"
        );

        return paths[_inToken][_outToken];
    }

    /**
     * @notice Set paths from inToken to outToken
     * @param _inToken token address of inToken
     * @param _outToken token address of outToken
     * @param _paths swapping paths
     */
    function setPath(
        address _inToken,
        address _outToken,
        address[] memory _paths
    ) external onlyOwner {
        require(_paths.length > 1, "Invalid paths length");
        require(_inToken == _paths[0], "Invalid inToken address");
        require(
            _outToken == _paths[_paths.length - 1],
            "Invalid inToken address"
        );

        uint8 i;

        for (i = 0; i < _paths.length; i++) {
            if (i < paths[_inToken][_outToken].length) {
                paths[_inToken][_outToken][i] = _paths[i];
            } else {
                paths[_inToken][_outToken].push(_paths[i]);
            }
        }

        if (paths[_inToken][_outToken].length > _paths.length)
            for (
                i = 0;
                i < paths[_inToken][_outToken].length - _paths.length;
                i++
            ) paths[_inToken][_outToken].pop();
    }
}
