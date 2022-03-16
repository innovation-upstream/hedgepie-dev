import { ethers } from 'ethers'
import { addresses } from '../constants/address'
import { JsonRpcSigner, StaticJsonRpcProvider } from '@ethersproject/providers'

import { abi as HedgepieAbi } from '../abi/HedgepieToken.json'

export const approveTransfer = async (
  networkID: number,
  provider: StaticJsonRpcProvider | JsonRpcSigner,
  toAddress: string,
  amount: string,
) => {
  const tokenContract = new ethers.Contract(addresses[networkID].TOKEN_ADDRESS as string, HedgepieAbi, provider)

  try {
    const tx = await tokenContract.approve(toAddress, amount)

    if (tx) {
      await tx.wait()
    }
  } catch (err: unknown) {
    // console.log(err.data ? err.data.message : err.message);
    return false
  }

  return true
}
