// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.4;

interface IAdapter {
    function getPaths() external view returns (address[][] memory);

    function stakingToken() external view returns (address);

    function poolID() external view returns (address);

    function strategy() external view returns (address strategy);

    function pendingReward() external view returns (uint256 reward);

    function name() external view returns (string memory);

    function repayToken() external view returns (address);

    function rewardToken() external view returns (address);

    function router() external view returns (address);

    function getAdapterStrategy(uint256 _adapter)
        external
        view
        returns (address strategy);

    function getWithdrawalAmount(address _user, uint256 _nftId)
        external
        view
        returns (uint256 amount);

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

    function getReward(address _user) external view returns (uint256);

    function increaseWithdrawalAmount(
        address _user,
        uint256 _nftId,
        uint256 _amount
    ) external;

    function setWithdrawalAmount(
        address _user,
        uint256 _nftId,
        uint256 _amount
    ) external;

    function setInvestor(address _investor) external;
}
