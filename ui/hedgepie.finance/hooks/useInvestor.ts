import { useCallback, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useInvestorContract, useWBNBContract } from 'hooks/useContract'
import { depositOnYBNFT, withdrawFromYBNFT, approveToken, fetchAllowance } from 'utils/callHelpers'

export const useInvestor = () => {
  const { account } = useWeb3React()
  const investorContract = useInvestorContract()
  const wBNBContract = useWBNBContract()

  const handleDeposit = useCallback(
    async (ybnftId, token, amount) => {
      const txHash = await depositOnYBNFT(investorContract, account, ybnftId, token, amount)
      console.info(txHash)
    },
    [account, investorContract],
  )

  const handleWithdraw = useCallback(
    async (ybnftId, token) => {
      const txHash = await withdrawFromYBNFT(investorContract, account, ybnftId, token)

      console.info(txHash)
    },
    [account, investorContract],
  )

  const handleApprove = useCallback(async () => {
    const txHash = await approveToken(wBNBContract, investorContract, account)
    console.info(txHash)
  }, [account, investorContract])

  const getAllowance = useCallback(async () => {
    const allowance = await fetchAllowance(wBNBContract, account)
    return allowance
  }, [account, investorContract])

  return {
    onYBNFTDeposit: handleDeposit,
    onYBNFTWithdraw: handleWithdraw,
    onYBNFTInvestorApprove: handleApprove,
    getAllowance: getAllowance,
  }
}
