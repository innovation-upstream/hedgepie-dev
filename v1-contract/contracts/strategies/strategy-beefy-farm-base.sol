// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../interfaces/strategies/IBeefyStrategy.sol";
import "../libraries/Ownable.sol";

abstract contract StrategyBeefyFarmBase is Ownable {
    address public strategy;
    address public investor;

    event InvestorSet(address indexed user, address investor);

    constructor(
        address _strategy
    ) {
        strategy = _strategy;
    }

    // ===== modifiers =====
    modifier onlyInvestor() {
        require(msg.sender == investor, "Error: caller is not investor");
        _;
    }

    function invest(uint256 _amount) external onlyInvestor {
        IBeefyStrategy(strategy).deposit(_amount);
    }

    function investAll() external onlyInvestor {
        IBeefyStrategy(strategy).depositAll();
    }

    function withdraw(uint256 _amount) external onlyInvestor {
        IBeefyStrategy(strategy).withdraw(_amount);
    }

    function withdrawAll() external onlyInvestor {
        IBeefyStrategy(strategy).withdrawAll();
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