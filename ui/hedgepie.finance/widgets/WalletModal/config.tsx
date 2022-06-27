import Metamask from './icons/Metamask'
import MathWallet from './icons/MathWallet'
import TokenPocket from './icons/TokenPocket'
import TrustWallet from './icons/TrustWallet'
import WalletConnect from './icons/WalletConnect'
import CoinbaseWallet from './icons/CoinbaseWallet'
import BinanceChain from './icons/BinanceChain'
import SafePalWallet from './icons/SafePalWallet'
import { Config, ConnectorNames } from './types'

const connectors: Config[] = [
  {
    title: 'Metamask',
    icon: 'images/wallet-logos/metamask.png',
    connectorId: ConnectorNames.Injected,
    bgColor: '#E6F6FF',
  },
  {
    title: 'Wallet Connect',
    icon: 'images/wallet-logos/wallet-connect.png',
    connectorId: ConnectorNames.WalletConnect,
    bgColor: '#FFF7E6',
  },
  // {
  //   title: 'Trust Wallet',
  //   icon: 'images/wallet-logos/trust-wallet.png',
  //   connectorId: ConnectorNames.Injected,
  //   bgColor: '#FFE6F0',
  // },
  // {
  //   title: 'More',
  //   icon: 'images/wallet-logos/more.png',
  //   connectorId: ConnectorNames.Injected,
  //   bgColor: '#E6F6FF',
  // },
  // {
  //   title: 'Coinbase',
  //   icon: CoinbaseWallet,
  //   connectorId: ConnectorNames.Coinbase,
  //   bgColor: '#E6F6FF',
  // },
  // {
  //   title: 'Math Wallet',
  //   icon: MathWallet,
  //   connectorId: ConnectorNames.Injected,
  //   bgColor: '#E6F6FF',
  // },
  // {
  //   title: 'Token Pocket',
  //   icon: TokenPocket,
  //   connectorId: ConnectorNames.Injected,
  //   bgColor: '#E6F6FF',
  // },
  // {
  //   title: 'Binance Chain Wallet',
  //   icon: BinanceChain,
  //   connectorId: ConnectorNames.BSC,
  //   bgColor: '#E6F6FF',
  // },
  // {
  //   title: 'SafePal Wallet',
  //   icon: SafePalWallet,
  //   connectorId: ConnectorNames.Injected,
  //   bgColor: '#E6F6FF',
  // },
]

export default connectors
export const connectorLocalStorageKey = 'connectorId'
