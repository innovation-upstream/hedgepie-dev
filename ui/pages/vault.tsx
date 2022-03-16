/* eslint-disable no-use-before-define */
import React from 'react'
import type { NextPage } from 'next'

import { Vault } from 'components/Vault'
import { HedgePieFinance } from 'components/HedgePieFinance'

const VaultPage: NextPage = () => {
  return (
    <HedgePieFinance title="Farms">
      <Vault />
    </HedgePieFinance>
  )
}

export default VaultPage
