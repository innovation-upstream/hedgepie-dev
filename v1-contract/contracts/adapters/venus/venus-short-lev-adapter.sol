// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./interface/VBep20Interface.sol";
import "./interface/ComptrollerInterface.sol";

contract VenusShortLevAdapter is Ownable {
    uint256 pid;
    address public stakingToken;
    address public rewardToken;
    address public repayToken;
    address public strategy;
    address public vStrategy;
    address public router;
    string public name;
    address public investor;

    address public wrapToken;

    uint256 public borrowRate; // 10,000 Max

    uint256 public constant DEEPTH = 1;

    bool public isLeverage;

    bool public isEntered;

    // inToken => outToken => paths
    mapping(address => mapping(address => address[])) public paths;

    // user => nft id => withdrawal amount
    mapping(address => mapping(uint256 => uint256)) public withdrawalAmount;

    // user => nft id => withdrawal amounts stack
    mapping(address => mapping(uint256 => uint256[DEEPTH + 1]))
        public stackWithdrawalAmounts;

    modifier onlyInvestor() {
        require(msg.sender == investor, "Error: Caller is not investor");
        _;
    }

    /**
     * @notice Construct
     * @param _strategy  address of strategy
     * @param _name  adatper name
     */
    constructor(address _strategy, string memory _name) {
        require(
            VBep20Interface(_strategy).isVToken(),
            "Error: Invalid vToken address"
        );
        require(
            VBep20Interface(_strategy).underlying() != address(0),
            "Error: Invalid underlying address"
        );

        stakingToken = VBep20Interface(_strategy).underlying();
        repayToken = _strategy;
        strategy = _strategy;
        name = _name;

        isLeverage = true;
        borrowRate = 7900;
    }

    /**
     * @notice Get withdrwal amount
     * @param _user  user address
     * @param _nftId  nftId
     */
    function getWithdrawalAmount(address _user, uint256 _nftId)
        external
        view
        returns (uint256 amount)
    {
        amount = withdrawalAmount[_user][_nftId];
    }

    /**
     * @notice Get enter market calldata
     */
    function getEnterMarketCallData()
        external
        view
        returns (
            address to,
            uint256 value,
            bytes memory data
        )
    {
        address[] memory _vTokens = new address[](1);
        _vTokens[0] = strategy;
        to = VBep20Interface(strategy).comptroller();
        value = 0;
        data = abi.encodeWithSignature("enterMarkets(address[])", _vTokens);
    }

    /**
     * @notice Get loan market calldata
     * @param _amount  amount of loan
     */
    function getLoanCallData(uint256 _amount)
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
        data = abi.encodeWithSignature("borrow(uint256)", _amount);
    }

    /**
     * @notice Get de-loan market calldata
     * @param _amount  amount of loan
     */
    function getDeLoanCallData(uint256 _amount)
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
        data = abi.encodeWithSignature("repayBorrow(uint256)", _amount);
    }

    /**
     * @notice Get invest calldata
     * @param _amount  amount of invest
     */
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

    /**
     * @notice Get devest calldata
     * @param _amount  amount of devest
     */
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
        data = abi.encodeWithSignature("redeemUnderlying(uint256)", _amount);
    }

    /**
     * @notice Increase withdrwal amount
     * @param _user  user address
     * @param _nftId  nftId
     * @param _amount  amount of withdrawal
     */
    function increaseWithdrawalAmount(
        address _user,
        uint256 _nftId,
        uint256 _amount
    ) external onlyInvestor {
        withdrawalAmount[_user][_nftId] += _amount;
        stackWithdrawalAmounts[_user][_nftId][0] += _amount;
    }

    /**
     * @notice Increase withdrwal amount
     * @param _user user address
     * @param _nftId nftId
     * @param _amount amount of withdrawal
     * @param _deepId deepth id
     */
    function increaseWithdrawalAmount(
        address _user,
        uint256 _nftId,
        uint256 _amount,
        uint256 _deepId
    ) external onlyInvestor {
        require(_deepId <= DEEPTH && _deepId != 0, "Invalid deep id");
        withdrawalAmount[_user][_nftId] += _amount;
        stackWithdrawalAmounts[_user][_nftId][_deepId] += _amount;
    }

    /**
     * @notice Set withdrwal amount
     * @param _user  user address
     * @param _nftId  nftId
     * @param _amount  amount of withdrawal
     */
    function setWithdrawalAmount(
        address _user,
        uint256 _nftId,
        uint256 _amount
    ) external onlyInvestor {
        withdrawalAmount[_user][_nftId] = _amount;
        for (uint256 i = 0; i <= DEEPTH; i++)
            stackWithdrawalAmounts[_user][_nftId][i] = _amount;
    }

    /**
     * @notice Set withdrwal amount
     * @param _isEntered entered status
     */
    function setIsEntered(bool _isEntered) external onlyInvestor {
        isEntered = _isEntered;
    }

    /**
     * @notice Set investor
     * @param _investor  address of investor
     */
    function setInvestor(address _investor) external onlyOwner {
        require(_investor != address(0), "Error: Investor zero address");
        investor = _investor;
    }

    /**
     * @notice Get path
     * @param _inToken token address of inToken
     * @param _outToken token address of outToken
     */
    function getPaths(address _inToken, address _outToken)
        external
        view
        onlyInvestor
        returns (address[] memory)
    {
        require(
            paths[_inToken][_outToken].length > 1,
            "Path length is not valid"
        );
        require(
            paths[_inToken][_outToken][0] == _inToken,
            "Path is not existed"
        );
        require(
            paths[_inToken][_outToken][paths[_inToken][_outToken].length - 1] ==
                _outToken,
            "Path is not existed"
        );

        return paths[_inToken][_outToken];
    }

    /**
     * @notice Set paths from inToken to outToken
     * @param _inToken token address of inToken
     * @param _outToken token address of outToken
     * @param _paths swapping paths
     */
    function setPath(
        address _inToken,
        address _outToken,
        address[] memory _paths
    ) external onlyOwner {
        require(_paths.length > 1, "Invalid paths length");
        require(_inToken == _paths[0], "Invalid inToken address");
        require(
            _outToken == _paths[_paths.length - 1],
            "Invalid inToken address"
        );

        uint8 i;

        for (i = 0; i < _paths.length; i++) {
            if (i < paths[_inToken][_outToken].length) {
                paths[_inToken][_outToken][i] = _paths[i];
            } else {
                paths[_inToken][_outToken].push(_paths[i]);
            }
        }

        if (paths[_inToken][_outToken].length > _paths.length)
            for (
                i = 0;
                i < paths[_inToken][_outToken].length - _paths.length;
                i++
            ) paths[_inToken][_outToken].pop();
    }

    /**
     * @notice Get pending reward
     * @param _user  address of investor
     */
    function getReward(address _user) external view returns (uint256) {
        return 0;
    }
}
