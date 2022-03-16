import React from 'react'
import { useRouter } from 'next/router'
import { Box, Flex, Image, NavLink } from 'theme-ui'

import NavBar from './NavBar'

type Props = {}

const Header = (props: Props) => {
  const router = useRouter()

  return (
    <Box bg="header">
      <Flex className="header_wrapper">
        <NavLink
          onClick={() => {
            router.push('/')
          }}
        >
          <Image src="./images/logo.png" className="logo" />
        </NavLink>
        <NavBar />
      </Flex>
    </Box>
  )
}

export default Header
