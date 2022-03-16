/** @jsx jsx */
/** @jsxRuntime classic */

import { ThemeProvider, jsx, Box, Flex, Text } from 'theme-ui'

import { theme } from 'themes/theme'

import styles from './TitleMast.module.css'

type Props = { title: string }

const TitleMast = (props: Props) => {
  const { title } = props
  return (
    <ThemeProvider theme={theme}>
      <Box p={4} className={styles.mast_bg}>
        <Flex className={styles.mast_wrapper}>
          <Text css={{ fontFamily: 'Noto Sans', fontWeight: 'bold', fontSize: '40px' }}>{title}</Text>
        </Flex>
      </Box>
    </ThemeProvider>
  )
}

export default TitleMast
