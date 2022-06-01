// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.4;

interface IAdapter {
    function strategy() external view returns (address strategy);

    function name() external view returns (string memory);

    function stakingToken() external view returns (address);

    function repayToken() external view returns (address);

    function getAdapterStrategy(uint256 _adapter)
        external
        view
        returns (address strategy);

    function getWithdrawalAmount(address _user, uint256 _nftId)
        external
        view
        returns (uint256 amount);

    function getSupplyCallData(uint256 _amount)
        external
        view
        returns (
            address to,
            uint256 value,
            bytes memory data
        );

    function getRedeemCallData(uint256 _amount)
        external
        view
        returns (
            address to,
            uint256 value,
            bytes memory data
        );

    function getInvestCallData(uint256 _amount)
        external
        view
        returns (
            address to,
            uint256 value,
            bytes memory data
        );

    function getDevestCallData(uint256 _amount)
        external
        view
        returns (
            address to,
            uint256 value,
            bytes memory data
        );

    function increaseWithdrawalAmount(
        address _user,
        uint256 _nftId,
        uint256 _amount
    ) external;

    function getEnterMarketCallData()
        external
        view
        returns (
            address to,
            uint256 value,
            bytes memory data
        );

    function setInvestor(address _investor) external;
}
