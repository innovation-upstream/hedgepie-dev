import React from 'react'
import { Box, Button, ThemeUICSSObject } from 'theme-ui'
import { useWeb3React } from '@web3-react/core'
import useWalletModal from 'widgets/WalletModal/useWalletModal'
import useAuth from 'hooks/useAuth'

import { styles } from './styles'

const ActionStakeButton = ({ onStake, isDisabled, onApprove, approved }) => {
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)
  const { account } = useWeb3React()

  const getBtnText = () => {
    const btnText = approved ? 'STAKE' : 'APPROVE'
    return btnText
  }

  const handleApproveOrStake = () => {
    approved ? onStake() : onApprove()
  }
  return (
    <>
      {account ? (
        <Button
          sx={styles.vault_action_button as ThemeUICSSObject}
          onClick={handleApproveOrStake}
          id="action-button"
          disabled={isDisabled}
        >
          {getBtnText()}
        </Button>
      ) : (
        <Button sx={styles.vault_action_button as ThemeUICSSObject} onClick={onPresentConnectModal}>
          Connect Wallet
        </Button>
      )}
    </>
  )
}

export default ActionStakeButton
