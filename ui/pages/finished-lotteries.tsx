/* eslint-disable no-use-before-define */
import React from 'react'
import type { NextPage } from 'next'

// Components
import { HedgePieFinance } from "components/HedgePieFinance"
import LeaderboardHero from "components/pages/finished-lotteries/LeaderboardHero"
import LeaderboardMain from "components/pages/finished-lotteries/LeaderboardMain"

const FinishedLotteries: NextPage = () => {
  return (
    <HedgePieFinance>
      <LeaderboardHero />
      <LeaderboardMain />
    </HedgePieFinance>
  )
}

export default FinishedLotteries
