import React from 'react'
import { Box, Image, ThemeUICSSObject } from 'theme-ui'

type Props = { title: string }

import { styles } from './styles'

const TitleMast = (props: Props) => {
  const { title } = props
  return (
    <Box sx={styles.title_mast_container as ThemeUICSSObject}>
      <Image src="/images/leaderboard-header.png" sx={styles.title_mast_image as ThemeUICSSObject} />
      <Box sx={styles.title_text as ThemeUICSSObject}>{title}</Box>
    </Box>
  )
}

export default TitleMast
