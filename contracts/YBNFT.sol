// SPDX-License-Identifier: AGPL-3.0-or-later
// pragma solidity ^0.7.5;
pragma solidity ^0.8.4;

import "./interfaces/IPancakeRouter.sol";
import "./interfaces/IYBNFT.sol";
import "./interfaces/IHedgepieInvestor.sol";

import "./libraries/Ownable.sol";
import "./libraries/SafeMath.sol";
import "./libraries/SafeBEP20.sol";

import "./type/BEP721.sol";

contract YBNFT is BEP721, IYBNFT, Ownable {
    using SafeMath for uint256;
    using SafeBEP20 for IBEP20;

    // lottery address
    address public lottery;
    // treasury address
    address public treasury;
    // investor address
    address public investor;
    // token => status
    mapping(address => bool) public allowedToken;
    // tokenId => strategy[]
    mapping(uint256 => Strategy[]) nftStrategy;

    event Mint(uint256 indexed tokenId, address indexed user);

    constructor(
        address _investor,
        address _lottery,
        address _treasury
    ) BEP721("Hedgepie YBNFT", "YBNFT") {
        require(_investor != address(0));
        require(_lottery != address(0));
        require(_treasury != address(0));
        investor = _investor;
        lottery = _lottery;
        treasury = _treasury;
    }

    // ===== modifiers =====
    modifier onlyAllowedToken(address token) {
        require(allowedToken[token], "Error: token is not allowed");
        _;
    }

    // TODO: ===== external functions =====
    function getNftStrategy(uint256 _tokenId)
        external
        view
        override
        returns (Strategy[] memory)
    {
        return nftStrategy[_tokenId];
    }

    function chkToken(uint256 _tokenId) external view returns (bool) {
        return _exists(_tokenId);
    }

    // external functions
    function mint(
        uint256 _tokenId,
        uint256[] calldata _swapPercent,
        address[] calldata _swapToken,
        address[] calldata _stakeAddress
    ) external onlyOwner {
        // TODO: tokenId should be increased automatically, no need to check _tokenId here!
        require(_tokenId > 0);
        require(
            _swapToken.length > 0 &&
                _swapToken.length == _swapPercent.length &&
                _swapToken.length == _stakeAddress.length,
            "Error: strategy data is incorrect"
        );
        require(_checkPercent(_swapPercent));

        // mint token
        _safeMint(address(this), _tokenId);

        // set strategy
        _setStrategy(_tokenId, _swapPercent, _swapToken, _stakeAddress);

        emit Mint(_tokenId, address(this));
    }

    // TODO: ===== public functions =====
    function manageToken(address[] calldata _tokens, bool _flag)
        public
        onlyOwner
    {
        require(_tokens.length > 0);

        for (uint8 idx = 0; idx < _tokens.length; idx++) {
            allowedToken[_tokens[idx]] = _flag;
        }
    }

    function deposit(
        uint256 _tokenId,
        address _token,
        uint256 _amount
    ) external onlyAllowedToken(_token) {
        require(_exists(_tokenId), "BEP721: NFT not exist");
        require(_amount > 0);

        _deposit(_tokenId, _token, _amount);
    }

    function withdraw(
        uint256 _tokenId,
        address _token,
        uint256 _amount
    ) external onlyAllowedToken(_token) {
        require(_exists(_tokenId), "BEP721: NFT not exist");
        require(_amount > 0);

        _withdraw(_tokenId, _token, _amount);
    }

    function withdraw(uint256 _tokenId, address _token)
        external
        onlyAllowedToken(_token)
    {
        require(_exists(_tokenId), "BEP721: NFT not exist");

        _withdrawAll(_tokenId, _token);
    }

    // TODO: ===== internal functions =====
    function _setStrategy(
        uint256 _tokenId,
        uint256[] calldata _swapPercent,
        address[] calldata _swapToken,
        address[] calldata _stakeAddress
    ) internal {
        for (uint8 idx = 0; idx < _swapToken.length; idx++) {
            nftStrategy[_tokenId].push(
                Strategy({
                    percent: _swapPercent[idx],
                    swapToken: _swapToken[idx],
                    stakeAddress: _stakeAddress[idx]
                })
            );
        }
    }

    function _deposit(
        uint256 _tokenId,
        address _token,
        uint256 _amount
    ) internal {
        IBEP20(_token).safeTransferFrom(msg.sender, address(this), _amount);
        IHedgepieInvestor(investor).deposit(
            address(this),
            _tokenId,
            _token,
            _amount
        );
    }

    function _withdraw(
        uint256 _tokenId,
        address _token,
        uint256 _amount
    ) internal {
        IHedgepieInvestor(investor).withdraw(
            address(this),
            _tokenId,
            _token,
            _amount
        );
    }

    function _withdrawAll(uint256 _tokenId, address _token) internal {
        IHedgepieInvestor(investor).withdrawAll(
            address(this),
            _tokenId,
            _token
        );
    }

    function _checkPercent(uint256[] calldata _swapPercent)
        internal
        pure
        returns (bool)
    {
        uint256 totalPercent;
        for (uint256 idx = 0; idx < _swapPercent.length; idx++) {
            totalPercent = totalPercent.add(_swapPercent[idx]);
        }

        return totalPercent.sub(1e4) == 0;
    }
}
