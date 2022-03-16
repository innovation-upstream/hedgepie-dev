import type { Theme } from 'theme-ui'

export const theme: Theme = {
  fonts: {
    body: 'system-ui, sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: 'Menlo, monospace',
    noto: 'Noto Sans',
  },
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#33e',
    details: '#1799DE',
    header: '#16103A',
    header_title: '#fff',
    header_navlink: '#ffffff',
    wallet_button_text: '#1799DE',
    wallet_button_border: '#1799DE',
  },
  images: {
    logo: {
      width: 48,
      height: 48,
    },
  },
  links: {
    nav: {
      px: 1,
      py: 10,
      letterSpacing: '0.2em',
      fontWeight: 'none',
      fontFamily: 'Noto Sans',
      ':hover': { color: '#1799DE' },
      cursor: 'pointer',
    },
  },
  buttons: {
    primary: {},
    connect_wallet: {},
    info: {
      color: '#1799DE',
      bg: 'transparent',
      '&:hover': {
        bg: '#1799DE11',
      },
      '&:active': {
        bg: 'transparent',
      },
    }
  }
}
