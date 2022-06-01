// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interface/VBep20Interface.sol";

contract VenusLeverageAdapter is Ownable {
    address public stakingToken;
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
     * @param _repayToken  address of repay token
     * @param _name  adatper name
     */
    constructor(
        address _strategy,
        address _stakingToken,
        address _repayToken,
        string memory _name
    ) {
        require(
            VBep20Interface(_strategy).isVToken(),
            "Error: Invalid vToken address"
        );
        require(
            VBep20Interface(_strategy).underlying() == _stakingToken,
            "Error: Invalid underlying address"
        );

        strategy = _strategy;
        stakingToken = _stakingToken;
        repayToken = _repayToken;
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
     * @notice Get supply calldata
     * @param _amount  amount of invest
     */
    function getSupplyCallData(uint256 _amount)
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
        data = abi.encodeWithSignature("mint(uint256)", _amount);
    }

    /**
     * @notice Get redeem calldata
     * @param _amount  amount of invest
     */
    function getRedeemCallData(uint256 _amount)
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
        data = abi.encodeWithSignature("redeem(uint256)", _amount);
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
        data = abi.encodeWithSignature("borrow(uint256)", _amount);
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
        data = abi.encodeWithSignature("repayBorrow(uint256)", _amount);
    }

    /**
     * @notice Get enter market calldata
     */
    function getEnterMarketCallData()
        external
        view
        returns (
            address to,
            uint256 value,
            bytes memory data
        )
    {
        to = VBep20Interface(strategy).comptroller();
        value = 0;
        data = abi.encodeWithSignature("enterMarkets(address[])", [strategy]);
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
