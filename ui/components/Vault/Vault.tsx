/** @jsx jsx */
/** @jsxRuntime classic */

import { ThemeProvider, jsx, Box, Flex } from 'theme-ui'

import { theme } from 'themes/theme'
import { HPButtonInput } from 'widgets/HPButtonInput'
import { HPInput } from 'widgets/HPInput'
import { HPInstrumentSelect } from 'widgets/HPInstrumentSelect'
import { HPStakeWithdrawSwitch } from 'widgets/HPStakeWithdrawSwitch'
import { HPVaultSummary } from 'widgets/HPVaultSummary'

import styles from './Vault.module.css'

type Props = {}

const Vault = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Box p={3}>
        <Flex css={{ alignItems: 'center', justifyContent: 'center' }}>
          <Box p={3} className={styles.vault_wrapper}>
            <HPStakeWithdrawSwitch />
            <HPInstrumentSelect />
            <HPInput label="STAKED" placeholder="0.000" />
            <HPInput label="APY" placeholder="400%" />
            <HPInput label="Profit" placeholder="0.000" />
            <HPButtonInput label="Connect Wallet" placeholder="0.00" />
            <HPVaultSummary platform={'Venus'} tvl={'$241,431'} />
          </Box>
        </Flex>
      </Box>
    </ThemeProvider>
  )
}

export default Vault
