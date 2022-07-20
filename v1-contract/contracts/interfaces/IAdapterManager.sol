// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.4;

interface IAdapterManager {
    function getAdapterStrat(address _adapter)
        external
        view
        returns (address adapterStrat);

    function getDepositCallData(address _adapter, uint256 _amount)
        external
        view
        returns (
            address to,
            uint256 value,
            bytes memory data
        );

    function getWithdrawCallData(address _adapter, uint256 _amount)
        external
        view
        returns (
            address to,
            uint256 value,
            bytes memory data
        );

    function getLoanCallData(address _adapter, uint256 _amount)
        external
        view
        returns (
            address to,
            uint256 value,
            bytes memory data
        );

    function getDeLoanCallData(address _adapter, uint256 _amount)
        external
        view
        returns (
            address to,
            uint256 value,
            bytes memory data
        );

    function getEnterMarketCallData(address _adapter)
        external
        view
        returns (
            address to,
            uint256 value,
            bytes memory data
        );
}
