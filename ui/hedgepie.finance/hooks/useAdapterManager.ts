import { useAdapterManagerContract, useApeSwapLPAdapterContract, useAutoFarmLPAdapterContract } from 'hooks/useContract'
import { fetchAdapters, fetchTokenAddress } from 'utils/callHelpers'

export const useAdapterManager = () => {
  const adapterManagerContract = useAdapterManagerContract()
  const apeSwapLPAdapterContract = useApeSwapLPAdapterContract()
  const autoFarmLPAdapterContract = useAutoFarmLPAdapterContract()

  const getAdapters = async () => {
    const adapters = await fetchAdapters(adapterManagerContract)
    return adapters
  }

  const getContract = (protocol, pool) => {
    if (protocol == 'ApeSwap') {
      return apeSwapLPAdapterContract
    } else if (protocol == 'AutoFarm') {
      return autoFarmLPAdapterContract
    }
  }

  const getTokenAddress = async (protocol, pool) => {
    const tokenAddress = await fetchTokenAddress(getContract(protocol, pool))
    console.log(tokenAddress)
    return tokenAddress
  }

  return { getAdapters: getAdapters, getTokenAddress: getTokenAddress }
}
