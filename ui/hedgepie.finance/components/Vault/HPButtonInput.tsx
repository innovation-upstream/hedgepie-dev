import React, { useEffect, useState } from 'react'
import { ThemeProvider, Box, Input, Button, Flex, ThemeUICSSObject } from 'theme-ui'
import BigNumber from 'bignumber.js'
import { theme } from 'themes/theme'
import { useWeb3React } from '@web3-react/core'
import { ConnectWallet } from 'components/ConnectWallet'
import { useVaultPools } from 'state/hooks'
import { useERC20Contract } from 'hooks/useContract'
import { useVault } from 'hooks/useVault'
import { getBalanceInEther, getBalanceInWei } from 'utils/formatBalance'

import { styles } from './styles'

type Props = {
  activePoolIdx?: number
  formType: string
  stakedBalance: BigNumber | undefined
  stakingTokenBalance: BigNumber | undefined
}

const HPButtonInput = (props: Props) => {
  const { activePoolIdx, formType, stakedBalance, stakingTokenBalance } = props
  const [isPending, setPending] = useState(false)
  const [amount, setAmount] = useState<number | BigNumber>(0.0)
  const [amountString, setAmountString] = useState('0.00')
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
      setAmount(0.0)
      setAmountString('0.00')
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
    setAmount(0.0)
    setAmountString('0.00')
  }

  const onChangeAmount = (e) => {
    setAmountString(e.target.value)
    e.target.value && !isNaN(e.target.value) && setAmount(getBalanceInWei(e.target.value))
  }

  // Setting parameters for the button to be disabled/enabled
  useEffect(() => {
    if (
      (stakingTokenBalance && formType === 'DEPOSIT' && new BigNumber(amount).gt(stakingTokenBalance)) ||
      (stakedBalance && formType == 'WITHDRAW' && amount && new BigNumber(amount).gt(stakedBalance))
    ) {
      setInvalidAmount(true)
    } else {
      setInvalidAmount(false)
    }
  }, [activePoolIdx, stakedBalance, stakingTokenBalance, formType, amount])

  useEffect(() => {
    setDisabled(invalidAmount || isPending || !account)
  }, [invalidAmount, isPending, account])

  useEffect(() => {
    setAmount(0.0)
    setAmountString('0.00')
  }, [formType, activePoolIdx])

  const getBtnText = () => {
    if (isPending) return 'Pending...'
    if (formType === 'DEPOSIT') return isApproved ? 'Stake' : 'Approve'
    if (formType === 'WITHDRAW') return 'Unstake'
  }

  const onMaxClick = () => {
    if (formType === 'DEPOSIT' && isApproved) {
      if (stakingTokenBalance) {
        setAmount(stakingTokenBalance)
        setAmountString(getBalanceInEther(stakingTokenBalance).toFixed(2))
      }
    } else if (formType === 'WITHDRAW') {
      if (stakedBalance) {
        setAmount(stakedBalance)
        setAmountString(getBalanceInEther(stakedBalance).toFixed(2))
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={styles.button_input_container as ThemeUICSSObject}>
        <Flex sx={styles.button_input_flex_container as ThemeUICSSObject}>
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
          <Button sx={styles.button_input_max_btn as ThemeUICSSObject} onClick={onMaxClick}>
            MAX
          </Button>
        </Flex>
        <Input
          sx={styles.button_input_input as ThemeUICSSObject}
          placeholder="0.0"
          value={amountString}
          onChange={onChangeAmount}
        />
      </Box>
    </ThemeProvider>
  )
}

export default HPButtonInput
