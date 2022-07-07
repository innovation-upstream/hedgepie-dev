// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract BeltLPStakeAdapter is Ownable {
    uint256 public pid;
    address public stakingToken;
    address public rewardToken;
    address public repayToken;
    address public strategy;
    address public vStrategy;
    address public wrapToken;
    address public router;
    string public name;
    address public investor;

    address private constant USDT = 0x55d398326f99059fF775485246999027B3197955;
    address private constant USDC = 0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d;
    address private constant DAI = 0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3;
    address private constant BUSD = 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56;

    // inToken => outToken => paths
    mapping(address => mapping(address => address[])) public paths;

    // user => nft id => withdrawal amount
    mapping(address => mapping(uint256 => uint256)) public withdrawalAmount;

    modifier onlyInvestor() {
        require(msg.sender == investor, "Error: Caller is not investor");
        _;
    }

    /**
     * @notice Construct
     * @param _pid  number of pid
     * @param _strategy  address of strategy
     * @param _stakingToken  address of staking token
     * @param _rewardToken  address of reward token
     * @param _wrapToken  address of wrap token(stablecoin)
     * @param _router  address of router
     * @param _name  adatper name
     */
    constructor(
        uint256 _pid,
        address _strategy,
        address _stakingToken,
        address _rewardToken,
        address _wrapToken,
        address _router,
        string memory _name
    ) {
        stakingToken = _stakingToken;
        rewardToken = _rewardToken;
        strategy = _strategy;
        wrapToken = _wrapToken;
        router = _router;
        pid = _pid;
        name = _name;
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
        data = abi.encodeWithSignature("deposit(uint256,uint256)", pid, _amount);
    }

    /**
     * @notice Get devest calldata
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
        data = abi.encodeWithSignature("withdraw(uint256,uint256)", pid, _amount);
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
     * @notice Set withdrwal amount
     * @param _user  user address
     * @param _nftId  nftId
     * @param _amount  amount of withdrawal
     */
    function setWithdrawalAmount(
        address _user,
        uint256 _nftId,
        uint256 _amount
    ) external onlyInvestor {
        withdrawalAmount[_user][_nftId] = _amount;
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

    function getAmounts(uint256 _amount) external view returns(uint256[4] memory uamounts) {
        uamounts[0] = wrapToken == DAI ? _amount : 0; // DAI
        uamounts[1] = wrapToken == USDC ? _amount : 0; // USDC
        uamounts[2] = wrapToken == USDT ? _amount : 0; // USDT
        uamounts[3] = wrapToken == BUSD ? _amount : 0; // BUSD
    }
}
