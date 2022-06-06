import React, { useState } from 'react'
import { Box, Button, Spinner, Text } from 'theme-ui'
import MintWizardContext from 'contexts/MintWizardContext'
import { useWeb3React } from '@web3-react/core'
import ipfs from 'utils/ipfs'
import toast from 'utils/toast'
import { useYBNFTMint } from 'hooks/useYBNFTMint'

const SubmitMint = () => {
  const { formData } = React.useContext(MintWizardContext)
  const { account } = useWeb3React()
  const { onYBNFTMint } = useYBNFTMint()
  const [disabled, setDisabled] = useState(false)

  const [promptMessage, setPromptMessage] = useState('')

  const validateMintEntries = () => {
    console.log(JSON.stringify(formData) + ' ' + account)

    const duplicatesInPositions = (positions) => {
      let positionNames = [] as string[]
      positions.forEach((position) => {
        if (positionNames.includes(position.name)) {
          return true
        } else {
          positionNames.push(position.name)
        }
      })
      return false
    }

    const ifTotalNotHundred = (positions) => {
      let total = 0
      for (let position of positions) {
        total = total + parseFloat(position.weight)
      }
      if (total !== 100) {
        return true
      }
      return false
    }

    if (!account) {
      toast('Please connect your wallet to mint a YB NFT', 'warning')
      return
    }

    let isValid = true
    if (formData) {
      if (formData.nftName === '') {
        toast('NFT Name cannot be empty', 'warning')
        isValid = false
      }

      // Optional Image Upload
      // if (!formData.artWorkFile) {
      //   toast('Please upload an Image for the YBNFT', 'warning')
      //   isValid = false
      // }

      // Optional Description
      // if (!formData.description) {
      //   toast('Please provide a Description for the YBNFT', 'warning')
      //   isValid = false
      // }
      if (!formData.positions) {
        toast('Please add Positions for Minting the YBNFT', 'warning')
        isValid = false
      } else {
        if (!formData.positions.length) {
          toast('Please add Positions for Minting the YBNFT', 'warning')
          isValid = false
        } else {
          if (duplicatesInPositions(formData.positions)) {
            toast('Only one position of each strategy allowed', 'warning')
            isValid = false
          } else if (ifTotalNotHundred(formData.positions)) {
            toast('Total Weight of strategies should be 100%', 'warning')
            isValid = false
          }
        }
      }
    }
    return isValid
  }

  const getIPFSUrlForMetadata = async () => {
    const imgCID = await ipfs.uploadImageToIPFS(formData.artWorkFile, formData.nftName)
    const nftMetadata = {
      name: formData.nftName,
      description: formData.description,
      imageURL: 'https://' + imgCID + '.ipfs.dweb.link' + '/' + formData.artWorkFile.name,
    }
    const metadataCID = await ipfs.uploadMetadataToIPFS(nftMetadata, formData.nftName)

    console.log('IMAGE IPFS LINK: ' + 'https://' + imgCID + '.ipfs.dweb.link')
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
        adapterAddrs.push(position?.composition?.address)
        // TODO : Get the Token Addresses through the adapters in the contract and set them here
        position?.composition?.name === 'PKS-STAKE-GAL-ADAPTER'
          ? tokenAddrs.push('0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82')
          : tokenAddrs.push('0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56')
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

  const handleMint = async () => {
    setDisabled(true)
    setPromptMessage('Validating the Entries')
    if (!validateMintEntries()) {
      setPromptMessage('')
      setDisabled(false)
      return
    }

    setPromptMessage('Uploading Image and YBNFT Metadata to IPFS')
    const ipfsUrl = await getIPFSUrlForMetadata()

    console.log('IPFS URL : ' + ipfsUrl)

    //TODO : Set the metadata CID with the contract and minted nft address and store
    // Create the needed Format of Positions
    console.log('formData' + JSON.stringify(formData))
    setPromptMessage('Minting YBNFT on BSC ...')
    await mintYBNFT(formData, ipfsUrl)
    toast(`YBNFT ${formData.nftName} Successfully Minted !! `)
    setPromptMessage('')
    setDisabled(false)
  }

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
    >
      <Button
        variant="primary"
        sx={{
          height: 64,
          width: '100%',
          border: '1px solid #1799DE',
          borderRadius: 40,
          padding: 0,
          cursor: 'pointer',
          transition: 'all .2s',
          opacity: disabled ? 0.7 : 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.3rem',
        }}
        onClick={handleMint}
        disabled={disabled}
      >
        {promptMessage ? promptMessage : 'MINT'} {disabled ? <Spinner sx={{ height: '2rem' }} /> : ''}
      </Button>
      {/* <Text sx={{ fontSize: 18, color: '#8E8DA0' }}>{promptMessage}</Text> */}
    </Box>
  )
}

export default SubmitMint
