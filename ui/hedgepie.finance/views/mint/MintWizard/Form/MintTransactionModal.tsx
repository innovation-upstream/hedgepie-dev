import React, { useContext, useEffect, useState } from 'react'
import { Box, Spinner, Text } from 'theme-ui'
import ipfs from 'utils/ipfs'
import toast from 'utils/toast'
import { Modal } from '../../../../widgets/Modal'
import { Context } from '../../../../widgets/Modal/ModalContext'
import { useYBNFTMint } from 'hooks/useYBNFTMint'
import { useInvestor } from 'hooks/useInvestor'
import { getBalanceInWei } from 'utils/formatBalance'

const MintTransactionModal = ({ formData, onDismiss = () => null }) => {
  const { onYBNFTMint, getMaxTokenId } = useYBNFTMint()
  const { onYBNFTDeposit } = useInvestor()
  const { setCloseOnOverlayClick } = useContext(Context)
  useEffect(() => {
    console.log('formData' + JSON.stringify(formData))
  }, [formData])

  const steps = ['Uploading NFT Image and Metadata to IPFS', 'Minting YBNFT', 'Staking Initial Amount']
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState({})
  const [cid, setCID] = useState<any>()

  const getIPFSUrlForMetadata = async () => {
    let imgCID = '' as string | undefined
    if (formData.artWorkFile) {
      imgCID = await ipfs.uploadImageToIPFS(formData.artWorkFile, formData.nftName)
    }
    const nftMetadata = {
      name: formData.nftName,
      description: formData.description,
      imageURL: imgCID ? 'https://' + imgCID + '.ipfs.dweb.link' + '/' + formData.artWorkFile.name : '',
    }
    const metadataCID = await ipfs.uploadMetadataToIPFS(nftMetadata, formData.nftName)

    console.log('IMAGE IPFS LINK: ' + (imgCID ? 'https://' + imgCID + '.ipfs.dweb.link' : ''))
    console.log('METADATA IPFS LINK: ' + 'https://' + metadataCID + '.ipfs.dweb.link')

    toast('IMAGE CID : ' + imgCID)
    toast('METADATA CID : ' + metadataCID)

    return metadataCID
  }

  const mintYBNFT = async (formData, ipfsUrl) => {
    var allocations = [] as number[]
    var tokenAddrs = [] as string[]
    var adapterAddrs = [] as string[]
    if (formData?.positions?.length) {
      let positions = formData.positions
      for (let position of positions) {
        allocations.push(position.weight * 100)
        adapterAddrs.push(position?.pool?.address?.addr)
        tokenAddrs.push(position?.pool?.address?.token)
      }
    }
    var performanceFee = formData.performanceFee * 100

    console.log(
      'MINTING YBNFT with PARAMS : ' +
        JSON.stringify(allocations) +
        ' ' +
        JSON.stringify(tokenAddrs) +
        ' ' +
        JSON.stringify(adapterAddrs) +
        ' ' +
        performanceFee +
        ' ' +
        ipfsUrl,
    )
    try {
      const txHash = await onYBNFTMint(allocations, tokenAddrs, adapterAddrs, performanceFee, ipfsUrl)
      return txHash
    } catch (err) {
      toast('Transaction Error while minting YBNFT', 'warning')
      console.log(JSON.stringify(err))
    }
  }

  const stakeInitialAmount = async () => {
    console.log(formData)
    if (!formData.initialStake) return false
    let amount = formData.initialStake ? getBalanceInWei(Number.parseFloat(formData.initialStake)) : 0
    if (amount == 0) return
    let txHash
    try {
      txHash = await onYBNFTDeposit(await getMaxTokenId(), amount.toString())
    } catch (err) {
      console.log(err)
      return false
    }
    console.log(txHash)
    return true
  }

  useEffect(() => {
    if (currentStep == 3) {
      setCloseOnOverlayClick(true)
      return
    }
    if (currentStep > 3) return

    const handleMint = async () => {
      const temp = { ...loading }
      temp[currentStep] = true
      setLoading(temp)

      if (currentStep == 0) {
        setCID(await getIPFSUrlForMetadata())
      } else if (currentStep == 1) {
        await mintYBNFT(formData, cid)
      } else if (currentStep == 2) {
        await stakeInitialAmount()
      }
      setLoading({ loading, currentStep: false })
      setCurrentStep(currentStep + 1)
    }
    handleMint()
  }, [currentStep])

  return (
    <Modal title="" onDismiss={onDismiss}>
      <Box
        sx={{
          padding: 3,
          backgroundColor: '#E5F6FF',
          borderRadius: 8,
          [`@media screen and (min-width: 500px)`]: {
            padding: 24,
          },
        }}
      >
        <Box
          sx={{
            fontSize: 16,
            fontWeight: 700,
            color: '#16103A',
            [`@media screen and (min-width: 500px)`]: {
              fontSize: 24,
            },
          }}
        >
          Minting {formData.nftName} !!
        </Box>
        <Box
          sx={{
            fontSize: 12,
            fontWeight: 500,
            color: '#DF4886',
            [`@media screen and (min-width: 500px)`]: {
              fontSize: 16,
            },
          }}
        >
          Actions performed to mint the YBNFT..
        </Box>
        <Box
          mt={24}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.2rem',
          }}
        >
          {steps.map((step, i) => {
            return (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '1rem',
                }}
              >
                {loading[i] ? (
                  <Spinner sx={{ color: '#1799DE', height: '1.2rem', width: '1rem', paddingTop: '0.3rem' }} />
                ) : (
                  <Text sx={{ color: 'green' }}>✓</Text>
                )}
                <Text>{step}</Text>
              </Box>
            )
          })}
        </Box>
      </Box>
    </Modal>
  )
}

export default MintTransactionModal
