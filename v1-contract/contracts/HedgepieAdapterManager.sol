// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.4;

import "./libraries/Ownable.sol";
import "./interfaces/IAdapter.sol";

contract HedgepieAdapterManager is Ownable {
    struct AdapterInfo {
        address addr;
        string name;
        address stakingToken;
        bool status;
    }

    // Info of each adapter
    AdapterInfo[] public adapterInfo;
    // investor address
    address public investor;

    event AdapterAdded(address strategy);
    event AdapterRemoveed(address strategy);

    /**
     * @notice Throws if adapter is not active
     */
    modifier onlyActiveAdapter(address _adapter) {
        bool isExisted = false;
        for (uint256 i = 0; i < adapterInfo.length; i++) {
            if (
                adapterInfo[i].addr == address(_adapter) &&
                adapterInfo[i].status
            ) {
                isExisted = true;
                break;
            }
        }
        require(isExisted, "Error: Adapter is not active");
        _;
    }

    /**
     * @notice Throws if called by any account other than the investor.
     */
    modifier onlyInvestor() {
        require(msg.sender == investor, "Error: caller is not investor");
        _;
    }

    /**
     * @notice Get a list of adapters
     */
    function getAdapters() external view returns (AdapterInfo[] memory) {
        return adapterInfo;
    }

    /**
     * @notice Get strategy address of adapter contract
     * @param _adapter  adapter address
     */
    function getAdapterStrat(address _adapter)
        external
        view
        onlyActiveAdapter(_adapter)
        returns (address adapterStrat)
    {
        adapterStrat = IAdapter(_adapter).strategy();
    }

    /**
     * @notice Get Deposit call data of adapter contract
     * @param _adapter  adapter address
     * @param _amount  deposit amount
     */
    function getDepositCallData(address _adapter, uint256 _amount)
        external
        view
        onlyActiveAdapter(_adapter)
        onlyInvestor
        returns (
            address to,
            uint256 value,
            bytes memory data
        )
    {
        require(_amount > 0, "Amount can not be 0");
        return IAdapter(_adapter).getInvestCallData(_amount);
    }

    /**
     * @notice Get Withdraw call data of adapter contract
     * @param _adapter  adapter address
     * @param _amount  deposit amount
     */
    function getWithdrawCallData(address _adapter, uint256 _amount)
        external
        view
        onlyActiveAdapter(_adapter)
        onlyInvestor
        returns (
            address to,
            uint256 value,
            bytes memory data
        )
    {
        require(_amount > 0, "Amount can not be 0");
        return IAdapter(_adapter).getDevestCallData(_amount);
    }

    /**
     * @notice Get EnterMarket call data of adapter contract
     * @param _adapter  adapter address
     */
    function getEnterMarketCallData(address _adapter)
        external
        view
        onlyActiveAdapter(_adapter)
        onlyInvestor
        returns (
            address to,
            uint256 value,
            bytes memory data
        )
    {
        return IAdapter(_adapter).getEnterMarketCallData();
    }

    /**
     * @notice Get Loan call data of adapter contract
     * @param _adapter  adapter address
     * @param _amount  loan amount
     */
    function getLoanCallData(address _adapter, uint256 _amount)
        external
        view
        onlyActiveAdapter(_adapter)
        onlyInvestor
        returns (
            address to,
            uint256 value,
            bytes memory data
        )
    {
        require(_amount > 0, "Amount can not be 0");
        return IAdapter(_adapter).getLoanCallData(_amount);
    }

    /**
     * @notice Get DeLoan call data of adapter contract
     * @param _adapter  adapter address
     * @param _amount  loan amount
     */
    function getDeLoanCallData(address _adapter, uint256 _amount)
        external
        view
        onlyActiveAdapter(_adapter)
        onlyInvestor
        returns (
            address to,
            uint256 value,
            bytes memory data
        )
    {
        require(_amount > 0, "Amount can not be 0");
        return IAdapter(_adapter).getDeLoanCallData(_amount);
    }

    // ===== Owner functions =====
    /**
     * @notice Add adapter
     * @param _adapter  adapter address
     */
    function addAdapter(address _adapter) external onlyOwner {
        require(_adapter != address(0), "Invalid adapter address");

        adapterInfo.push(
            AdapterInfo({
                addr: _adapter,
                name: IAdapter(_adapter).name(),
                stakingToken: IAdapter(_adapter).stakingToken(),
                status: true
            })
        );

        emit AdapterAdded(_adapter);
    }

    /**
     * @notice Remove adapter
     * @param _adapterId  adapter id
     * @param _status  adapter status
     */
    function setAdapter(uint256 _adapterId, bool _status) external onlyOwner {
        require(_adapterId < adapterInfo.length, "Invalid adapter address");

        adapterInfo[_adapterId].status = _status;
    }

    /**
     * @notice Set investor contract
     * @param _investor  investor address
     */
    function setInvestor(address _investor) external onlyOwner {
        require(_investor != address(0), "Invalid investor address");
        investor = _investor;
    }
}
