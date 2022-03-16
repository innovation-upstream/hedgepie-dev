/** @jsx jsx */
/** @jsxRuntime classic */

import { ConnectWallet } from 'components/ConnectWallet'
import { ThemeProvider, jsx, Button } from 'theme-ui'

import { theme } from 'themes/theme'

type Props = {}

const HPConnectWalletButton = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <ConnectWallet>
        <Button
          css={{
            width: '240px',
            height: '60px',
            borderRadius: '40px',
            padding: '0px 20px',
            lineHeight: '48px',
            fontSize: '16px',
            fontWeight: '600',
            backgroundColor: '#1799DE',
            color: '#fff',
            cursor: 'pointer',
            ':hover': {
              border: '2px solid rgb(157 83 182)',
              color: 'rgb(157 83 182)',
            },
            boxShadow: '0px 20px 40px 0px rgba(23, 153, 222, 0.2)',
          }}
        >
          Connect Wallet →
        </Button>
      </ConnectWallet>
    </ThemeProvider>
  )
}

export default HPConnectWalletButton
