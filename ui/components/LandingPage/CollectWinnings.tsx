import React from 'react'
import { Box, Flex, Image, Text } from 'theme-ui'
import { HPConnectWalletButton } from 'widgets/HPConnectWalletButton'

type Props = {}

const CollectWinnings = (props: Props) => {
  return (
    <Box p={3} css={{ border: '1px solid black', paddingTop: '4rem', paddingBottom: '6rem' }}>
      <Flex css={{ paddingLeft: '10rem', paddingRight: '10rem', alignItems: 'center' }}>
        <Flex css={{ flexDirection: 'column' }}>
          <Flex
            css={{
              flexDirection: 'column',
              fontSize: '45px',
              fontFamily: 'Noto Sans',
              fontWeight: '800',
              lineHeight: '150%',
            }}
          >
            <Text>Collect Winnings</Text>
          </Flex>
          <Text
            css={{
              color: '#8E8DA0',
              fontFamily: 'Noto Sans',
              fontWeight: 'normal',
              fontSize: '16px',
              lineHeight: '27px',
            }}
          >
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using `Content here, content here`, making it look like readable English. Many
            desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a
            search for `lorem ipsum` will uncover many web sites
          </Text>
          <div style={{ marginTop: '30px' }}>
            <HPConnectWalletButton />
          </div>
        </Flex>
        <Flex css={{ alignItems: 'center', justifyContent: 'center', width: '150rem' }}>
          <Image src="images/piece.svg" />
        </Flex>
      </Flex>
    </Box>
  )
}

export default CollectWinnings
