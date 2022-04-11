import React from 'react'
import Link from 'next/link'
import { theme } from 'themes/theme'
import { Box, Flex, Text, ThemeProvider, Image, Link as ThemeLink, Divider } from 'theme-ui'
import SocialButton from './SocialButton'

type Props = {}

const Footer = (props: Props) => {
  return (
    <Box
      sx={{
        bg: 'header',
        color: '#fff',
        backgroundImage: 'url(/images/foot-mask.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        position: 'relative'
      }}
    >
      <Box
        py={90}
        px={[16, 60]}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: ['column', 'row']
        }}
      >
        <Box mr={4}>
          <Image src="images/logo.png" />
          <Box
            sx={{
              maxWidth: 420,
              marginTop: 30,
              color: '#8E8DA0',
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus molestie eu purus vel massa tristique diam
            cursus. Ut nunc consectetur penatib.
          </Box>
          <Box
            sx={{
              marginTop: 50,
              display: 'flex',
              '& > *': {
                marginRight: 30,
              },
            }}
          >
            <SocialButton>
              <Image src="images/fb.png" />
            </SocialButton>
            <SocialButton>
              <Image src="images/twitter.png" />
            </SocialButton>
            <SocialButton>
              <Image src="images/linkedin.png" />
            </SocialButton>
          </Box>
        </Box>
        <Box
          mt={[5, 0]}
          sx={{
            width: 200,
          }}
        >
          <Box sx={{}}>HedgePie</Box>
          <Box
            mt={54}
            sx={{
              color: '#8E8DA0',
              '& > *': {
                display: 'block',
                marginBottom: 10,
              },
            }}
          >
            <Link href="/vault" passHref>
              <ThemeLink>Vault</ThemeLink>
            </Link>
            <Link href="/nft-leaderboard" passHref>
              <ThemeLink>Leaderboard</ThemeLink>
            </Link>
            <Link href="/details" passHref>
              <ThemeLink>Finished Lotteries</ThemeLink>
            </Link>
            <Link href="/" passHref>
              <ThemeLink>Current Lottery</ThemeLink>
            </Link>
            <Link href="/mint" passHref>
              <ThemeLink>Mint</ThemeLink>
            </Link>
          </Box>
        </Box>
      </Box>
      <Divider
        sx={{
          backgroundColor: '#C6D6E2',
          opacity: 0.2,
        }}
      />
      <Box
        py={30}
        px={[16, 60]}
        sx={{
          display: 'flex',
          flexDirection: ['column', 'row'],
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#8E8DA0',
        }}
      >
        <Box>&copy; 2022 HedgePie</Box>
        <Flex
          mt={[4, 0]}
          sx={{
            flexDirection: ['column', 'row'],
            gap: [12, 24]
          }}
        >
          <Link href="/" passHref>
            <ThemeLink>Privacy policy</ThemeLink>
          </Link>
          <Link href="/" passHref>
            <ThemeLink>Terms &amp; Conditions</ThemeLink>
          </Link>
        </Flex>
      </Box>
    </Box>
  )
}

export default Footer
