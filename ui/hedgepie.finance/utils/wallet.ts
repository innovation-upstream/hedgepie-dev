// Set of helper functions to facilitate wallet setup

import chainParams from './chainParams'
import toast from './toast'

/**
 * Prompt the user to add Avalanche as a network on Metamask, or switch to Avalanche if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async () => {
  const provider = (window as any).ethereum
  if (provider) {
    const chainId = parseInt(process.env.REACT_APP_CHAIN_ID || '97', 10)
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [chainParams?.[chainId]],
      })
      return true
    } catch (error) {
      console.log('Error' + JSON.stringify(error))
      toast('Trying to connect to a network other than BNB Testnet or BNB Mainnet', 'warning')
      // console.error(error)
      return false
    }
  } else {
    console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
    return false
  }
}

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenImage: string,
) => {
  const tokenAdded = await (window as any).ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: tokenImage,
      },
    },
  })

  return tokenAdded
}
