import React, { useState } from 'react'
import { Box, Button, Spinner, Text } from 'theme-ui'
import MintWizardContext from 'contexts/MintWizardContext'
import { useWeb3React } from '@web3-react/core'
import ipfs from 'utils/ipfs'
import toast from 'utils/toast'
import { useYBNFTMint } from 'hooks/useYBNFTMint'
import { useModal } from 'widgets/Modal'
import MintTransactionModal from './MintTransactionModal'
import { useAdapterManager } from 'hooks/useAdapterManager'

const SubmitMint = () => {
  const { formData, strategies } = React.useContext(MintWizardContext)
  const { account } = useWeb3React()
  const { onYBNFTMint } = useYBNFTMint()
  const [disabled, setDisabled] = useState(false)
  const [onMintTransactionModal] = useModal(<MintTransactionModal formData={formData} />, false)
  const { getTokenAddress } = useAdapterManager()

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

  const handleMint = async () => {
    // console.log(formData)
    setDisabled(true)
    setPromptMessage('Validating the Entries')
    if (!validateMintEntries()) {
      setPromptMessage('')
      setDisabled(false)
      return
    }

    // setPromptMessage('Uploading Image and YBNFT Metadata to IPFS')
    // const ipfsUrl = await getIPFSUrlForMetadata()
    // console.log('IPFS URL : ' + ipfsUrl)
    // // Create the needed Format of Positions
    // console.log('formData' + JSON.stringify(formData))
    // setPromptMessage('Minting YBNFT on BSC ...')
    // await mintYBNFT(formData, ipfsUrl)

    // setPromptMessage('')
    // setDisabled(false)

    onMintTransactionModal()
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
