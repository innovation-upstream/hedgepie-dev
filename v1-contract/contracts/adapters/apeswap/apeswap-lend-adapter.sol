// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ApeswapLendAdapter is Ownable {
    address public strategy;
    string public name;

    constructor(
        address _strategy,
        string memory _name
    ) {
        strategy = _strategy;
        name = _name;
    }

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
        data = abi.encodeWithSignature("mint(uint256)", _amount);
    }

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
        data = abi.encodeWithSignature("redeem(uint256)", _amount);
    }
}