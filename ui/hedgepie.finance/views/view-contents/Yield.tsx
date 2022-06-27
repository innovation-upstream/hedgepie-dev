import { useInvestor } from 'hooks/useInvestor'
import React from 'react'
import { Box, Button, Text, ThemeUICSSObject } from 'theme-ui'
import { styles } from './styles'

function Yield(props: any) {
  // TODO : Get Yield for the given account from the Investor Contract
  const {} = useInvestor()

  const handleWithdrawYield = async () => {}
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        marginTop: '1rem',
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '12rem' }}>
        <Text sx={{ fontSize: 24, fontWeight: 700, color: '#e3bc20' }}>YIELD</Text>
        <Text sx={{ fontSize: 24, fontWeight: 700, color: '#e3bc20' }}>500 BNB</Text>
      </Box>
      <Button sx={styles.withdraw_yield_button as ThemeUICSSObject} onClick={handleWithdrawYield}>
        WITHDRAW YIELD
      </Button>
    </Box>
  )
}

export default Yield
