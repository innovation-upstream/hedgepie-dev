// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../strategy-beefy-farm-base.sol";

contract StrategyBeefySingle is StrategyBeefyFarmBase {
    constructor(
        address _strategist
    ) StrategyBeefyFarmBase(_strategist) {}

    function getName() external pure returns (string memory) {
        return "StrategyBeefySingle";
    }
}