import React from 'react'
import { Box, Image, Button, ThemeUICSSObject } from 'theme-ui'
import { ArrowRight } from 'react-feather'

import { styles } from './styles'

type Props = {}

const Banner = (props: Props) => {
  return (
    <Box px={3} sx={styles.banner_container as ThemeUICSSObject}>
      <Box sx={styles.banner_box as ThemeUICSSObject}>
        <Box sx={styles.banner_contents_container as ThemeUICSSObject}>
          <Image src="/images/homepage-coins.png" sx={styles.banner_coins_image as ThemeUICSSObject} />
          <Image src="/images/pie.png" sx={styles.banner_pie_image as ThemeUICSSObject} />
          <Box sx={{ position: 'relative' }}>
            <Box sx={styles.banner_title as ThemeUICSSObject}>Stake. Earn. Win.</Box>
            <Box sx={styles.banner_text as ThemeUICSSObject}>
              Stake to earn rewards while entering for a chance to win the Jackpot!
            </Box>
            <Box sx={{ marginTop: [30, 70] }}>
              <Button variant="primary" sx={styles.banner_connect_wallet_wrapper as ThemeUICSSObject}>
                <Box mr={2}>Connect Wallet</Box>
                <ArrowRight />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Banner
