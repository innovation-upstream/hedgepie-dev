// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.4;

import "./libraries/SafeBEP20.sol";
import "./interfaces/IPancakeRouter.sol";

contract HedgepieTest {
    address private constant BUSD = 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56;

    function testFunc(
        address router,
        uint amount
    ) external {
        IBEP20(BUSD).approve(router, amount);
        IBeltRouter(router).add_liquidity(getAmounts(amount), 0);
    }

    function getAmounts(uint256 _amount) private pure returns(uint256[4] memory uamounts) {
        uamounts[3] = _amount;
    }
}