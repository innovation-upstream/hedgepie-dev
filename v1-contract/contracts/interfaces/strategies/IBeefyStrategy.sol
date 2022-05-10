// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.4;

import "../IERC20.sol";

interface IBeefyStrategy {
    function want() external view returns (IERC20);

    function deposit(uint256 _amount) external;

    function depositAll() external;

    function withdraw(uint256 _amount) external;

    function withdrawAll() external;
}
