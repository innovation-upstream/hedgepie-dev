// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.4;

interface IBeefyStrategy {
    function deposit(uint256 _amount) external;

    function depositAll() external;

    function withdraw(uint256 _amount) external;

    function withdrawAll() external;
}
