import React, { ReactNode } from 'react'
import Head from 'next/head'

import { theme } from 'themes/theme'

import { ThemeProvider } from 'theme-ui'

import { Header } from 'components/Header'
import { TitleMast } from 'components/TitleMast'
import { Footer } from 'components/Footer'

type Props = { title?: string; children?: ReactNode }

const HedgePieFinance = (props: Props) => {
  const { title, children } = props
  return (
    <ThemeProvider theme={theme}>
      <Header />
      {title && <TitleMast title={title} />}
      <Head>
        <title>Hedge Pie</title>
        <meta name="description" content="Hedge Pie Finance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
      <Footer />
    </ThemeProvider>
  )
}

export default HedgePieFinance
