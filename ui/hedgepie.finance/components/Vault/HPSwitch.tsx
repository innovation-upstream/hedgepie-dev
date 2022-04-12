import React from 'react'
import { ThemeProvider, jsx, Flex, Text, Switch, ThemeUICSSObject } from 'theme-ui'
import { theme } from 'themes/theme'

import { styles } from './styles'

type Props = {
  value: string
  onSwitch: () => void
}

const HPSwitch = (props: Props) => {
  const { value, onSwitch } = props

  return (
    <ThemeProvider theme={theme}>
      <Flex sx={styles.switch_container as ThemeUICSSObject}>
        <Text sx={styles.switch_deposit_text as ThemeUICSSObject}>DEPOSIT</Text>
        <Flex sx={styles.button_input_flex_container as ThemeUICSSObject}>
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
            value={value}
            onClick={onSwitch}
          />
        </Flex>
        <Text sx={styles.switch_withdraw_text as ThemeUICSSObject}>WITHDRAW</Text>
      </Flex>
    </ThemeProvider>
  )
}

export default HPSwitch
