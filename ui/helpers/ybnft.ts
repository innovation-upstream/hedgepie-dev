import { ethers } from 'ethers'
import { addresses } from '../constants/address'
import { JsonRpcSigner, StaticJsonRpcProvider } from '@ethersproject/providers'

import { abi as YBNFTAbi } from '../abi/HedgepieYBNFT.json'

export const createToken = async (
  networkID: number,
  provider: StaticJsonRpcProvider | JsonRpcSigner,
  percents: number,
  tokens: string,
  stakeAddresses: string,
) => {
  const ybnftContract = new ethers.Contract(addresses[networkID].YBNFT_ADDRESS as string, YBNFTAbi, provider)

  try {
    const tx = await ybnftContract.createToken(percents, tokens, stakeAddresses)

    if (tx) {
      await tx.wait()
    }
  } catch (err) {
    // console.log(err.data ? err.data.message : err.message);
    return false
  }

  return true
}

// need to approve token transfer first from the hedgepie.ts
export const depositOnNft = async (
  networkID: number,
  provider: StaticJsonRpcProvider | JsonRpcSigner,
  tokenId: number,
  amunt: number,
  tokenAddress: string,
) => {
  const ybnftContract = new ethers.Contract(addresses[networkID].YBNFT_ADDRESS as string, YBNFTAbi, provider)

  try {
    const tx = await ybnftContract.deposit(tokenId, amunt, tokenAddress)

    if (tx) {
      await tx.wait()
    }
  } catch (err) {
    // console.log(err.data ? err.data.message : err.message);
    return false
  }

  return true
}

export const checkNft = async (networkID: number, provider: StaticJsonRpcProvider | JsonRpcSigner, tokenId: number) => {
  const ybnftContract = new ethers.Contract(addresses[networkID].YBNFT_ADDRESS as string, YBNFTAbi, provider)

  return await ybnftContract.chkToken(tokenId)
}
