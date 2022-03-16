import React from 'react'
import { Box, Flex, Image, Text } from 'theme-ui'
import { HPConnectWalletButton } from 'widgets/HPConnectWalletButton'

type Props = {}

const Banner = (props: Props) => {
  return (
    <Box p={3} className="banner-box">
      <Flex className="banner-container">
        <Flex className="banner-flex">
          <Flex className="banner-text">
            <Text>Stake.</Text>
            <Text>Earn. Win.</Text>
          </Flex>
          <Text className="banner-desc">Stake to earn rewards while entering for a chance to win the Jackpot!</Text>
          <HPConnectWalletButton />
        </Flex>
        <Flex className="banner-imge" css={{ width: '600px' }}>
          <Image src="images/pie.png" />
        </Flex>
      </Flex>
    </Box>
  )
}

export default Banner
