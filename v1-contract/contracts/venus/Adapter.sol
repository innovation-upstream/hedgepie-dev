// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./interface/VBep20Interface.sol";

contract VenusAdapter is Ownable, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // reward fee
    uint256 public rewardFee;

    // MAX reward fee
    uint256 public constant MAX_REWARD_FEE = 10000;

    // vToken => bool
    mapping(address => bool) public isVToken;

    // vToken => nToken
    mapping(address => address) public nTokens;

    // nToken => vToken
    mapping(address => address) public vTokens;

    constructor(uint256 rewardFee_) public {
        require(rewardFee_ <= MAX_REWARD_FEE, "Invalid reward fee");
        rewardFee = rewardFee_;
    }

    modifier onlyEOA() {
        require(msg.sender == tx.origin, "Sender is contract");
        _;
    }

    /**
     * @notice Approve Token allowance to target address
     * @param _token  Token address
     * @param _target  Token address
     * @param _amount  Token amount that going to use from user's wallet
     */
    function _approveVToken(
        address _token,
        address _target,
        uint256 _amount
    ) internal {
        if (IERC20(_token).allowance(address(this), _target) < _amount) {
            IERC20(_token).approve(_target, 2**256 - 1);
        }
    }

    /**
     * @notice Supply collateral to Venus
     * @param _nToken  collateral token address
     * @param _amount  token amount that gonna supply to venus
     */
    function supply(address _nToken, uint256 _amount)
        external
        onlyEOA
        whenNotPaused
        nonReentrant
    {
        require(vTokens[_nToken] != address(0), "vToken is not set or invalid");

        address _vToken = vTokens[_nToken];

        _approveVToken(_nToken, _vToken, _amount);
        IERC20(_nToken).safeTransferFrom(msg.sender, address(this), _amount);

        require(
            VBep20Interface(_vToken).mint(_amount) == 0,
            "Venus Protocol Error"
        );
        // VBep20Interface(_vToken).mint(_amount);
        IERC20(_vToken).safeTransfer(
            msg.sender,
            IERC20(_vToken).balanceOf(address(this))
        );
    }

    /**
     * @notice Redeem vToken to get supplied collateral to Venus
     * @param _vToken  vToken address
     * @param _amount  token amount that gonna redeem from venus
     */
    function redeem(address _vToken, uint256 _amount)
        external
        onlyEOA
        whenNotPaused
        nonReentrant
    {
        require(isVToken[_vToken], "vToken is not set or invalid");

        _approveVToken(_vToken, _vToken, _amount);
        IERC20(_vToken).safeTransferFrom(msg.sender, address(this), _amount);

        require(
            VBep20Interface(_vToken).redeem(_amount) == 0,
            "Venus Protocol Error"
        );
        IERC20(nTokens[_vToken]).safeTransfer(
            msg.sender,
            IERC20(nTokens[_vToken]).balanceOf(address(this))
        );
    }

    /**
     * @notice Add vToken vs collateral token
     * @param _vTokens array of vTokens which are registerd to Venus
     * @param _nTokens array of collateral tokens pointed to each vToken address from Venus
     */
    function addVTokens(address[] memory _vTokens, address[] memory _nTokens)
        external
        onlyOwner
    {
        require(
            _vTokens.length == _nTokens.length && _vTokens.length != 0,
            "Invalid array length"
        );

        for (uint256 i = 0; i < _vTokens.length; i++) {
            require(_vTokens[i] != address(0), "Invalid Bep20 token address");
            require(_nTokens[i] != address(0), "Invalid Bep20 token address");

            isVToken[_vTokens[i]] = true;
            nTokens[_vTokens[i]] = _nTokens[i];
            vTokens[_nTokens[i]] = _vTokens[i];
        }
    }

    /**
     * @notice pause supply & redeem functions
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @notice unpause supply & redeem functions
     */
    function unpause() external onlyOwner {
        _unpause();
    }
}
