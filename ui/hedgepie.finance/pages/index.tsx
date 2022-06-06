/* eslint-disable no-use-before-define */
import React from 'react'
import type { NextPage } from 'next'

// Components
import { HedgePieFinance } from 'components/HedgePieFinance'
import { Home } from 'views/home'
import { LeaderBoard } from 'views/nft-leaderboard'

import LeaderboardMain from 'views/nft-leaderboard/LeaderBoard'

const HomePage: NextPage = () => {
  return (
    <>
      <HedgePieFinance title="YB NFT leaderboard">
        <LeaderboardMain />
      </HedgePieFinance>
    </>
  )
}

export default HomePage
