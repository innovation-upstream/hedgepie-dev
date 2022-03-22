/* eslint-disable no-use-before-define */
import React from 'react'
import type { NextPage } from 'next'
import { HedgePieFinance } from 'components/HedgePieFinance'
import { Mint } from 'views/nft-mint'

const VaultPage: NextPage = () => {
  return (
    <HedgePieFinance title="Mint">
      <Mint />
    </HedgePieFinance>
  )
}

export default VaultPage
