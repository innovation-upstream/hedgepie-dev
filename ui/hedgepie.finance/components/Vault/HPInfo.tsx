import React from 'react'
import { ThemeProvider, Box, Text, ThemeUICSSObject } from 'theme-ui'
import { theme } from 'themes/theme'

import { styles } from './styles'

type Props = { label: string; value?: string }

const HPInfo = (props: Props) => {
  const { label, value } = props
  return (
    <ThemeProvider theme={theme}>
      <Box sx={styles.info_container as ThemeUICSSObject}>
        <Text sx={styles.info_label as ThemeUICSSObject}>{label}</Text>
        <Text sx={styles.info_value as ThemeUICSSObject}>{value}</Text>
      </Box>
    </ThemeProvider>
  )
}

export default HPInfo
