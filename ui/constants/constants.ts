import ethereum from '../assets/bnb.svg'

interface INativeCurrency {
  name: string
  symbol: string
  decimals?: number
}

interface INetwork {
  chainName: string
  chainId: number
  nativeCurrency: INativeCurrency
  rpcUrls: string[]
  blockExplorerUrls: string[]
  image: SVGImageElement
  imageAltText: string
  uri: () => string
}

export const NETWORKS: { [key: number]: INetwork } = {
  56: {
    chainName: 'BSC mainnet',
    chainId: 56,
    nativeCurrency: {
      name: 'BSC mainnet',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: [''],
    blockExplorerUrls: ['https://bscscan.com/#/'],
    image: ethereum,
    imageAltText: 'BSC Logo',
    uri: () => 'https://speedy-nodes-nyc.moralis.io/1c8d8856c017266c637672dd/bsc/mainnet',
  },
  97: {
    chainName: 'BSC Testnet',
    chainId: 97,
    nativeCurrency: {
      name: 'BSC Testnet',
      symbol: 'TBNB',
      decimals: 18,
    },
    rpcUrls: [''],
    blockExplorerUrls: ['https://testnet.bscscan.com//#/'],
    image: ethereum,
    imageAltText: 'BSC Logo',
    uri: () => 'https://speedy-nodes-nyc.moralis.io/1c8d8856c017266c637672dd/bsc/testnet',
  },
  1337: {
    chainName: 'Ganache network',
    chainId: 1337,
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['http://localhost:7545'],
    blockExplorerUrls: ['http://localhost:7545'],
    image: ethereum,
    imageAltText: 'Ganache Logo',
    uri: () => '',
  },
}
