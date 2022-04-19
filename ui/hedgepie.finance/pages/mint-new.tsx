import React from 'react'
import type { NextPage } from 'next'
import { HedgePieFinance } from 'components/HedgePieFinance'
import { Mint } from 'views/mint'

const VaultPage: NextPage = () => {
  return (
    <HedgePieFinance title="Mint">
      <Mint />
    </HedgePieFinance>
  )
}

export default VaultPage
