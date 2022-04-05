import React, { useEffect, useState } from 'react'
import { ThemeProvider, Box, Input, Button, Flex } from 'theme-ui'
import { theme } from 'themes/theme'
import { useWeb3React } from '@web3-react/core'
import { ConnectWallet } from 'components/ConnectWallet'
import { useVaultPools } from 'state/hooks'
import { useERC20Contract } from 'hooks/useContract'
import { useVault } from 'hooks/useVault'
import BigNumber from 'bignumber.js'

type Props = {
  activePoolIdx?: number
  formType: string
  stakedBalance: BigNumber | undefined
  allowance: number | undefined
}

const HPButtonInput = (props: Props) => {
  const { activePoolIdx, formType, stakedBalance, allowance } = props
  const [isPending, setPending] = useState(false)
  const [amount, setAmount] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [invalidAmount, setInvalidAmount] = useState(false)
  const { account } = useWeb3React()
  const pools = useVaultPools()
  const { onApprove, onStake, onUnstake, onClaim } = useVault()
  const activePool = pools.find((pool) => pool.pid === activePoolIdx)
  const userData = activePool?.userData
  const tokenContract = useERC20Contract(activePool?.lpToken || '')
  const isApproved = userData && userData.allowance > 0

  const onApproveOrDeposit = async () => {
    if (!isApproved) {
      setPending(true)

      try {
        await onApprove(tokenContract)
      } catch (err) {
        console.log('Approve error:', err)
      }

      setPending(false)
    } else {
      setPending(true)
      try {
        await onStake(activePool.pid, amount)
      } catch (err) {
        console.log('Staking error:', err)
      }
      setPending(false)
      setAmount('')
    }
  }

  const onWithdraw = async () => {
    setPending(true)
    try {
      await onUnstake(activePool?.pid, amount)
    } catch (err) {
      console.log('Staking error:', err)
    }
    setPending(false)
    setAmount('')
  }

  const onChangeAmount = (e) => {
    setAmount(e.target.value)
  }

  // Setting parameters for the button to be disabled/enabled
  useEffect(() => {
    if (
      (allowance && formType === 'DEPOSIT' && Number.parseFloat(amount) > allowance) ||
      (stakedBalance && formType == 'WITHDRAW' && new BigNumber(Number.parseFloat(amount)) > stakedBalance)
    ) {
      setInvalidAmount(true)
    } else {
      setInvalidAmount(false)
    }
  }, [stakedBalance, allowance, formType, amount])

  useEffect(() => {
    setDisabled(invalidAmount || isPending || !account)
  }, [invalidAmount, isPending, account])

  const getBtnText = () => {
    if (isPending) return 'Pending...'
    if (formType === 'DEPOSIT') return isApproved ? 'Stake' : 'Approve'
    if (formType === 'WITHDRAW') return 'Unstake'
  }

  const onMaxClick = () => {
    if (formType === 'DEPOSIT' && isApproved) {
      allowance && setAmount(String(allowance.toFixed(2)))
    } else if (formType === 'WITHDRAW') {
      stakedBalance && setAmount(String(stakedBalance.toFixed(2)))
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          marginBottom: '10px',
          backgroundColor: '#fff',
          borderRadius: '31px',
        }}
      >
        <Flex sx={{ position: 'absolute', marginTop: 0, height: '100%', gap: '6px', zIndex: '1' }}>
          {account ? (
            <Button
              {...props}
              sx={{
                background: '#1799DE',
                borderRadius: '50px',
                padding: '0px 48.5px',
                cursor: 'pointer',
                opacity: disabled ? 0.5 : 1,
              }}
              disabled={disabled}
              onClick={() => {
                formType === 'DEPOSIT' ? onApproveOrDeposit() : onWithdraw()
              }}
            >
              {getBtnText()}
            </Button>
          ) : (
            <ConnectWallet />
          )}
          <Button
            sx={{
              width: 'min-content',
              height: 'min-content',
              alignSelf: 'center',
              backgroundColor: 'rgba(160, 160, 160, 0.32)',
              borderRadius: '4px',
              fontSize: '12px',
              color: '#8E8DA0',
              fontWeight: '300',
              cursor: 'pointer',
              ':hover': {
                backgroundColor: '#fff',
                border: '2px solid rgba(160, 160, 160, 0.32)',
              },
              padding: '4px',
            }}
            onClick={onMaxClick}
          >
            MAX
          </Button>
        </Flex>
        <Input
          sx={{
            position: 'relative',
            height: '56px',
            borderRadius: '30px',
            minWidth: '30rem',
            boxShadow: 'none',
            border: 'none',
            outline: 0,
            fontSize: '16px',
            paddingRight: '1rem',
            textAlign: 'right',
            fontWeight: '600',
            color: '#8E8DA0',
          }}
          maxLength={6}
          placeholder="0.0"
          value={amount}
          onChange={onChangeAmount}
        />
      </Box>
    </ThemeProvider>
  )
}

export default HPButtonInput