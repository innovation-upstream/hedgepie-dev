import React from 'react'

import { theme } from 'themes/theme'

import { Box, Flex, Text, ThemeProvider, Image } from 'theme-ui'

type Props = {}

const Footer = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Box p={4} bg="header" css={{ clear: 'both', position: 'relative', bottom: 0, width: '100%' }}>
        <Flex css={{ paddingLeft: '100px', paddingRight: '100px' }}>
          <Flex css={{ flexDirection: 'column', gap: '40px', width: '400px' }}>
            <Image src="images/logo.png" css={{ width: '50px', height: '50px' }} />
            <Text css={{ color: '#8E8DA0' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus molestie eu purus vel massa tristique diam
              cursus. Ut nunc consectetur penatib.
            </Text>
            <Flex css={{ flexDirection: 'row', gap: '10px' }}>
              <Flex
                css={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#fff',
                  borderRadius: '30px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image src="images/fb.png" />
              </Flex>
              <Flex
                css={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#fff',
                  borderRadius: '30px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image src="images/twitter.png" />
              </Flex>
              <Flex
                css={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#fff',
                  borderRadius: '30px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image src="images/linkedin.png" />
              </Flex>
            </Flex>
            <Text css={{ color: '#8E8DA0' }}>© 2022 HedgePie</Text>
          </Flex>
          <Flex css={{ marginLeft: 'auto', flexDirection: 'column', gap: '40px' }}>
            <Text css={{ fontWeight: '600', fontSize: '20px', color: '#fff' }}>HedgePie</Text>
            <Flex css={{ flexDirection: 'column', color: '#8E8DA0', gap: '10px' }}>
              <Text>Vault</Text>
              <Text>Leaderboard</Text>
              <Text>Finished Lotteries</Text>
              <Text>Current Lottery</Text>
              <Text>Mint</Text>
            </Flex>
            <Flex css={{ flexDirection: 'row', gap: '30px', color: '#8E8DA0' }}>
              <Text>Privacy policy</Text>
              <Text>Terms & Conditions</Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </ThemeProvider>
  )
}

export default Footer
