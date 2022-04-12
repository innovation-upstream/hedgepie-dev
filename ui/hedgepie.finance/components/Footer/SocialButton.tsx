import React from 'react'

import { Box, Link, ThemeUICSSObject } from 'theme-ui'

import { styles } from './styles'

const SocialButton = ({ href = '#', children, ...props }) => (
  <Link href={href}>
    <Box sx={styles.social_btn as ThemeUICSSObject} {...props}>
      {children}
    </Box>
  </Link>
)

export default SocialButton
