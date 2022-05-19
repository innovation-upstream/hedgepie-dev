// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ApeswapVaultAdapter is Ownable {
    uint256 pid;
    address public strategy;
    string public name;

    constructor(
        uint256 _pid,
        address _strategy,
        string memory _name
    ) {
        pid = _pid;
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
        data = abi.encodeWithSignature("deposit(uint256,uint256)", pid, _amount);
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
        data = abi.encodeWithSignature("withdraw(uint256,uint256)", pid, _amount);
    }
}