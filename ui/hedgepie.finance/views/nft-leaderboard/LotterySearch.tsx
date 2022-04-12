import React from 'react'
import { Box, Input, Button, ThemeUICSSObject } from 'theme-ui'

import { styles } from './styles'

const LotterySearch = ({ onSearch }: any) => {
  const handleChange = (e: any) => {
    onSearch(e.target.value)
  }

  return (
    <Box sx={styles.lottery_search_container as ThemeUICSSObject}>
      <Input
        sx={styles.lottery_search_input as ThemeUICSSObject}
        placeholder="Search by name, symbol, address ..."
        onChange={handleChange}
      />
      <Box sx={styles.lottery_search_finished_rounds as ThemeUICSSObject}>Finished Rounds</Box>
    </Box>
  )
}

export default LotterySearch
