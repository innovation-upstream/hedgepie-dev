import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { ThemeProvider, Box, Flex } from 'theme-ui'

import { useWeb3Context } from '../../hooks/web3Context'

import { theme } from 'themes/theme'
import { HPButtonInput } from 'widgets/HPButtonInput'
import { HPInput } from 'widgets/HPInput'
import { HPInstrumentSelect } from 'widgets/HPInstrumentSelect'
import { HPStakeWithdrawSwitch } from 'widgets/HPStakeWithdrawSwitch'
import { HPVaultSummary } from 'widgets/HPVaultSummary'

import { getInfo, vaultAction } from '../../helpers/vault'

import styles from './Vault.module.css'

type Props = {}

const Vault = (props: Props) => {
  const [apyVal, setApy] = useState('')
  const [profitVal, setProfit] = useState('')
  const [stakedVal, setStaked] = useState('')
  const [tvlVal, setTVL] = useState('')

  const { provider, address } = useWeb3Context()

  useEffect(() => {
    async function getData() {
      const { tvl, apy, profit, staked } = await getInfo(provider, address)
      setApy(apy.toString())
      setProfit(profit.toString())
      setTVL(tvl.toString())
      setStaked(staked.toString())
    }

    getData()
  }, [provider, address])

  const doAction = async (action: string, token: string) => {
    await vaultAction(provider, token, ethers.utils.parseUnits('10'), action)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box p={3}>
        <Flex css={{ alignItems: 'center', justifyContent: 'center' }}>
          <Box p={3} className={styles.vault_wrapper}>
            <HPStakeWithdrawSwitch />
            <HPInstrumentSelect />
            <HPInput label="STAKED" placeholder={stakedVal} />
            <HPInput label="APY" placeholder={apyVal + '%'} />
            <HPInput label="Profit" placeholder={profitVal} />
            <HPButtonInput label="Connect Wallet" placeholder="0.00" />
            <HPVaultSummary platform={'Venus'} tvl={'$' + tvlVal} />
          </Box>
        </Flex>
      </Box>
    </ThemeProvider>
  )
}

export default Vault
