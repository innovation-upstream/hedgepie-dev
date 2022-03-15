import React from 'react'
import { HPConnectWalletButton } from 'widgets/HPConnectWalletButton'
import { Flex, NavLink } from 'theme-ui'
import { useRouter } from 'next/router'

import themeStyles from './themeStyles'

type Props = {}

const NavBar = (props: Props) => {
  const router = useRouter()
  return (
    <Flex as="nav" sx={themeStyles.nav_wrapper} css={{ alignItems: 'center' }}>
      <NavLink
        onClick={() => {
          router.push('/vault')
        }}
        sx={themeStyles.nav}
      >
        Vaults
      </NavLink>
      <NavLink
        onClick={() => {
          router.push('/finished-lotteries')
        }}
        sx={themeStyles.nav}
      >
        Leaderboard
      </NavLink>
      <NavLink
        onClick={() => {
          router.push('/details')
        }}
        sx={themeStyles.nav}
      >
        Lottery
      </NavLink>
      <NavLink
        onClick={() => {
          router.push('/mint')
        }}
        sx={themeStyles.nav}
      >
        Mint
      </NavLink>
      <HPConnectWalletButton />
    </Flex>
  )
}

export default NavBar
