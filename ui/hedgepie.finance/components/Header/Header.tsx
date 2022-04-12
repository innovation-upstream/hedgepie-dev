import React from 'react'
import Link from 'next/link'
import { Box, Image, Link as ThemeLink, Button, ThemeUICSSObject } from 'theme-ui'
import { ArrowRight, Menu as MenuIcon } from 'react-feather'
import { Menu, MenuItem, MenuDivider } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import { ConnectWallet } from 'components/ConnectWallet'
import { styles } from './styles'

type Props = {
  overlay?: boolean
  dark?: boolean
}

const MobileMenuLink = ({ href, children }) => (
  <Link href={href} passHref>
    <ThemeLink sx={styles.mobile_menu_link as ThemeUICSSObject}>{children}</ThemeLink>
  </Link>
)

const Header = ({ overlay = false, dark = true }: Props) => {
  return (
    <Box
      px={3}
      sx={{
        position: overlay ? 'absolute' : 'relative',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: dark ? '#16103A' : 'transparent',
        color: dark ? '#FFF' : '#000',
      }}
    >
      <Box sx={styles.header_inner_container as ThemeUICSSObject}>
        <Link href="/" passHref>
          <ThemeLink mr={4}>
            <Image
              src="/images/logo.png"
              sx={{
                height: 70,
              }}
            />
          </ThemeLink>
        </Link>
        <Box sx={{ flex: 1 }} />
        <Box sx={styles.navbar_container as ThemeUICSSObject}>
          <Link href="/vault" passHref>
            <ThemeLink mr={4}>Vault</ThemeLink>
          </Link>
          <Link href="/nft-leaderboard" passHref>
            <ThemeLink mr={4}>Leaderboard</ThemeLink>
          </Link>
          <Link href="/mint" passHref>
            <ThemeLink mr={4}>Mint</ThemeLink>
          </Link>
          <Box sx={styles.connect_wallet_btn_container as ThemeUICSSObject}>
            <ConnectWallet isHeaderBtn />
          </Box>
        </Box>
        <Menu
          menuButton={
            <Box sx={styles.mobile_menu_btn as ThemeUICSSObject}>
              <MenuIcon />
            </Box>
          }
          align="end"
          transition
          arrow
        >
          <MobileMenuLink href="/vault">Vault</MobileMenuLink>
          <MobileMenuLink href="/nft-leaderboard">Leaderboard</MobileMenuLink>
          <MobileMenuLink href="/mint">Mint</MobileMenuLink>
          <MenuDivider />
          <Box sx={styles.mobile_menu_connect_wallet as ThemeUICSSObject}>
            <Box mr={2}>Connect Wallet</Box>
            <ArrowRight />
          </Box>
        </Menu>
      </Box>
    </Box>
  )
}

export default Header
