/* eslint-disable no-use-before-define */
import React from 'react'
import type { NextPage } from 'next'

// Components
import { HedgePieFinance } from 'components/HedgePieFinance'
import { LandingPage } from 'components/LandingPage'

const HomePage: NextPage = () => {
  return (
    <HedgePieFinance>
      <LandingPage />
    </HedgePieFinance>
  )
}

export default HomePage
