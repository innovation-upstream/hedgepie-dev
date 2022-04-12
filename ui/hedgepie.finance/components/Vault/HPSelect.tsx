/** @jsx jsx */
/** @jsxRuntime classic */

import { ThemeProvider, jsx, Flex, Image, Select, Box, Label, ThemeUICSSObject } from 'theme-ui'

import { theme } from 'themes/theme'

import { styles } from './styles'

type Props = {
  items: any[]
  onChangePoolIdx: (idx: string) => void
}

const HPSelect = (props: Props) => {
  const { items, onChangePoolIdx } = props

  const onSelect = (e) => {
    onChangePoolIdx(e.target.value)
  }

  return (
    <ThemeProvider theme={theme}>
      <Flex p={2} css={{ gap: '1rem', width: '100%' }}>
        <Image src="./images/tako.svg" css={{ width: '70px' }} />
        <Box sx={styles.select_container as ThemeUICSSObject}>
          <Label sx={styles.select_label as ThemeUICSSObject}>INSTRUMENT</Label>

          <Select sx={styles.select_select as ThemeUICSSObject} mb={3} onChange={onSelect}>
            {items?.map((item) => {
              return (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              )
            })}
          </Select>
        </Box>
      </Flex>
    </ThemeProvider>
  )
}

export default HPSelect
