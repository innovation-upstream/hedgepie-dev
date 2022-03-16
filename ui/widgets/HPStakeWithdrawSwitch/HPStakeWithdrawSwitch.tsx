/** @jsx jsx */
/** @jsxRuntime classic */

import { ThemeProvider, jsx, Flex, Text, Switch } from 'theme-ui'

import { theme } from 'themes/theme'

type Props = {}

const HPStakeWithdrawSwitch = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Flex
        css={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: '1rem',
          marginLeft: '3rem',
        }}
      >
        <Text
          css={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#16103A',
            opacity: '0.8',
          }}
        >
          STAKE
        </Text>
        <div css={{ padding: '0rem 2rem 0rem 2rem' }}>
          <Switch
            css={{
              backgroundColor: 'rgba(200,179,207,1)',
            }}
            sx={{
              backgroundColor: 'gray',
              'input:checked ~ &': {
                backgroundColor: 'rgba(0,212,255,1)',
              },
            }}
          />
        </div>
        <Text
          css={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#16103A',
            opacity: '0.8',
          }}
        >
          WITHDRAW
        </Text>
      </Flex>
    </ThemeProvider>
  )
}

export default HPStakeWithdrawSwitch
