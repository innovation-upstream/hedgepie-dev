/** @jsx jsx */
/** @jsxRuntime classic */

import { ConnectWallet } from 'components/ConnectWallet'
import { useEffect } from 'react'
import { ThemeProvider, jsx, Box, Input, Button, Badge, Flex } from 'theme-ui'

import { theme } from 'themes/theme'

type Props = { label: string; placeholder?: string }

const HPButtonInput = (props: Props) => {
  useEffect(() => {}, [])
  const { label, placeholder } = props
  return (
    <ThemeProvider theme={theme}>
      <Box
        css={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          marginBottom: '10px',
          backgroundColor: '#fff',
          borderRadius: '31px',
        }}
      >
        <Flex css={{ position: 'absolute', marginTop: 0, height: '100%', gap: '10px', zIndex: '1' }}>
          <ConnectWallet>
            <Button
              css={{
                position: 'relative',
                height: '100%',
                borderRadius: '40px',
                width: '200px',
                padding: '0px 20px',
                lineHeight: '48px',
                fontSize: '18px',
                fontWeight: '600',
                opacity: '0.8',
                backgroundColor: '#1799DE',
                color: '#fff',
                cursor: 'pointer',
                ':hover': {
                  border: '2px solid rgb(157 83 182)',
                  color: 'rgb(157 83 182)',
                },
              }}
            >
              {label}
            </Button>
          </ConnectWallet>
          <Badge
            css={{
              width: 'fit-content',
              height: 'fit-content',
              alignSelf: 'center',
              backgroundColor: 'rgba(160, 160, 160, 0.32)',
              borderRadius: '4px',
              color: '#8E8DA0',
              fontWeight: '300',
            }}
          >
            MAX
          </Badge>
        </Flex>
        <Input
          css={{
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
          placeholder={placeholder}
        />
      </Box>
    </ThemeProvider>
  )
}

export default HPButtonInput
