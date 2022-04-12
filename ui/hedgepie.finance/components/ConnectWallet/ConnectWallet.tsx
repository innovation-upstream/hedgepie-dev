import React from 'react'
import { Button, Box, ThemeUICSSObject } from 'theme-ui'
import { ArrowRight } from 'react-feather'
import { useWeb3React } from '@web3-react/core'
import useWalletModal from 'widgets/WalletModal/useWalletModal'
import useAuth from 'hooks/useAuth'

import { styles } from './styles'

const ConnectWallet = (props) => {
  const { isHeaderBtn } = props
  const { login, logout } = useAuth()
  const { account } = useWeb3React()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null

  return (
    <>
      {isHeaderBtn ? (
        <Button
          sx={styles.header_connect_wallet_btn as ThemeUICSSObject}
          onClick={() => {
            if (account) return
            onPresentConnectModal()
          }}
          {...props}
        >
          {account ? (
            <>{accountEllipsis}</>
          ) : (
            <>
              <Box
                sx={{
                  marginRight: '9px',
                }}
              >
                {'Connect Wallet'}
              </Box>
              <ArrowRight />
            </>
          )}
        </Button>
      ) : (
        <Button
          sx={styles.non_header_connect_wallet_btn as ThemeUICSSObject}
          onClick={onPresentConnectModal}
          {...props}
        >
          {'Connect Wallet'}
        </Button>
      )}
    </>
  )
}

export { ConnectWallet }
