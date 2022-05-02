// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../../libraries/Ownable.sol";
import "../../interfaces/mock/IPancakeFarmMasterChef.sol";

contract StrategyPancakeLPFarm is Ownable {
    address public strategy;
    address public investor;

    event InvestorSet(address indexed user, address investor);

    constructor(
        address _strategy
    ) {
        strategy = _strategy;
    }

    // ===== modifiers =====
    modifier onlyInvestor(address _user) {
        require(_user == investor, "Error: caller is not investor");
        _;
    }

    function invest(uint _pid, uint256 _amount) external onlyInvestor(msg.sender) {
        IPancakeFarmMasterChef(strategy).deposit(_pid, _amount);
    }

    function withdraw(uint _pid, uint256 _amount) external onlyInvestor(msg.sender) {
        IPancakeFarmMasterChef(strategy).withdraw(_pid, _amount);
    }

    function getName() external pure returns (string memory) {
        return "StrategyPancakeLPFarm";
    }

    // ===== Owner functions =====
    /**
     * @notice Set investor contract
     * @param _investor  investor address
     */
    function setInvestor(address _investor) external onlyOwner {
        require(_investor != address(0), "Invalid NFT address");

        investor = _investor;

        emit InvestorSet(msg.sender, _investor);
    }
}