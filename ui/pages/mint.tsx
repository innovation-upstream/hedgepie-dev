/* eslint-disable no-use-before-define */
import React from 'react'
import type { NextPage } from 'next'

import { Mint } from 'components/Mint'
import { HedgePieFinance } from 'components/HedgePieFinance'

const VaultPage: NextPage = () => {
  return (
    <HedgePieFinance title="Mint">
      <Mint />
    </HedgePieFinance>
  )
}

export default VaultPage
