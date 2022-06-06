import { useCallback, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { useMasterchefContract } from 'hooks/useContract'
import { fetchVaultGlobalDataAsync, fetchVaultPoolDataAsync, fetchVaultUserDataAsync } from 'state/actions'
import { approveToken, stakeOnMasterChef, unstakeOnMasterChef } from 'utils/callHelpers'

export const useVault = () => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchefContract()

  const handleApprove = useCallback(
    async (tokenContract) => {
      if (!tokenContract.options.address) return
      const txHash = await approveToken(tokenContract, masterChefContract, account)
      dispatch(fetchVaultUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract],
  )

  const handleStake = useCallback(
    async (pid, amount) => {
      const txHash = await stakeOnMasterChef(masterChefContract, pid, amount, account)
      dispatch(fetchVaultUserDataAsync(account))
      dispatch(fetchVaultGlobalDataAsync())
      dispatch(fetchVaultPoolDataAsync())
      console.info(txHash)
    },
    [account, dispatch, masterChefContract],
  )

  const handleUnStake = useCallback(
    async (pid, amount) => {
      const txHash = await unstakeOnMasterChef(masterChefContract, pid, amount, account)
      dispatch(fetchVaultUserDataAsync(account))
      dispatch(fetchVaultGlobalDataAsync())
      dispatch(fetchVaultPoolDataAsync())
      console.info(txHash)
    },
    [account, dispatch, masterChefContract],
  )

  const handleClaim = useCallback(
    async (pid) => {
      const txHash = await unstakeOnMasterChef(masterChefContract, pid, 0, account)
      dispatch(fetchVaultUserDataAsync(account))
      dispatch(fetchVaultGlobalDataAsync())
      dispatch(fetchVaultPoolDataAsync())
      console.info(txHash)
    },
    [account, dispatch, masterChefContract],
  )

  return { onApprove: handleApprove, onStake: handleStake, onUnstake: handleUnStake, onClaim: handleClaim }
}
