/* eslint-disable no-use-before-define */
import React from 'react'
import type { NextPage } from 'next'

import { FinalMint } from 'components/FinalMint'
import { HedgePieFinance } from 'components/HedgePieFinance'

const VaultPage: NextPage = () => {
  return (
    <HedgePieFinance title="Mint">
      <FinalMint />
    </HedgePieFinance>
  )
}

export default VaultPage
