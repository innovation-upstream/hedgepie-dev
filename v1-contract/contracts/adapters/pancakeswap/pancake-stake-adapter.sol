// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PancakeStakeAdapter is Ownable {
    address public stakingToken;
    address public rewardToken;
    address public repayToken;
    address public strategy;
    string public name;
    address public investor;
    // user => withdrawal amount
    mapping(address => uint256) public withdrawalAmount;

    modifier onlyInvestor() {
        require(msg.sender == investor, "Error: Caller is not investor");
        _;
    }

    /**
     * @notice Construct
     * @param _strategy  address of strategy
     * @param _stakingToken  address of staking token
     * @param _rewardToken  address of reward token
     * @param _name  adatper name
     */
    constructor(
        address _strategy,
        address _stakingToken,
        address _rewardToken,
        string memory _name
    ) {
        stakingToken = _stakingToken;
        rewardToken = _rewardToken;
        strategy = _strategy;
        name = _name;
    }

    /**
     * @notice Get withdrwal amount
     * @param _user  user address
     */
    function getWithdrawalAmount(address _user)
        external
        view
        returns (uint256 amount)
    {
        amount = withdrawalAmount[_user];
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
        data = abi.encodeWithSignature("deposit(uint256)", _amount);
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
        data = abi.encodeWithSignature("withdraw(uint256)", _amount);
    }

    /**
     * @notice Set withdrwal amount
     * @param _user  user address
     * @param _amount  amount of withdrawal
     */
    function setWithdrawalAmount(address _user, uint256 _amount)
        external
        onlyInvestor
    {
        withdrawalAmount[_user] = _amount;
    }

    /**
     * @notice Set investor
     * @param _investor  address of investor
     */
    function setInvestor(address _investor) external onlyOwner {
        require(_investor != address(0), "Error: Investor zero address");
        investor = _investor;
    }
}
