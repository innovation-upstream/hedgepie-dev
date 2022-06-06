import React, { useContext, useEffect, useState } from 'react'
import { Box, Spinner, Text } from 'theme-ui'
import ipfs from 'utils/ipfs'
import { Modal } from '../../../../widgets/Modal'
import { Context } from '../../../../widgets/Modal/ModalContext'

const MintTransactionModal = ({ formData, onDismiss = () => null }) => {
  const { setCloseOnOverlayClick } = useContext(Context)
  useEffect(() => {
    console.log('formData' + JSON.stringify(formData))
  }, [formData])

  const steps = ['Uploading NFT Image to IPFS', 'Uploading Metadata to IPFS', 'Minting YBNFT', 'Staking Initial Amount']
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState({})

  useEffect(() => {
    if (currentStep == 4) {
      setCloseOnOverlayClick(true)
      return
    }
    if (currentStep > 3) return
    const mintYBNFT = async () => {
      const temp = { ...loading }
      temp[currentStep] = true
      setLoading(temp)
      setTimeout(() => {
        const temp = { ...loading }
        temp[currentStep] = false
        setLoading(temp)
        setCurrentStep(currentStep + 1)
      }, 1500)
    }
    mintYBNFT()
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
