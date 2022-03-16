import { ethers } from 'ethers'
import { addresses } from '../constants/address'
import { JsonRpcSigner, StaticJsonRpcProvider } from '@ethersproject/providers'

import { abi as LotteryAbi } from '../abi/HedgepieLottery.json'

export const createLottery = async (
  networkID: number,
  provider: StaticJsonRpcProvider | JsonRpcSigner,
  lotteryName: string,
  tokenId: number,
  startTime: number,
  period: number,
) => {
  const lotteryContract = new ethers.Contract(addresses[networkID].LOTTERY_ADDRESS as string, LotteryAbi, provider)

  try {
    const tx = await lotteryContract.createLottery(lotteryName, tokenId, startTime, period)

    if (tx) {
      await tx.wait()
    }
  } catch (err) {
    // console.log(err.data ? err.data.message : err.message);
    return false
  }

  return true
}
