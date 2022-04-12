import React from 'react'
import { Box } from 'theme-ui'
import MintWizardNav from './MintWizardNav'
import MintWizardNavVertical from './MintWizardNavVertical'
import FormPosition from './Form/FormPosition'

const MintWizard = () => {

  return (
    <Box
      sx={{
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 60,
          padding: '0 16px',
          fontSize: 16,
          backgroundColor: '#1799DE',
          color: '#fff',
          [`@media screen and (min-width: 800px)`]: {
            height: 120,
            fontSize: 32,
            padding: '0 46px',
          }
        }}
      >
        YB NFT Minting
      </Box>
      <Box
        sx={{
          padding: 20,
          [`@media screen and (min-width: 800px)`]: {
            padding: 40,
          }
        }}
      >
        <MintWizardNav
          sx={{
            display: 'none',
            [`@media screen and (min-width: 800px)`]: {
              display: 'block'
            }
          }}
        />
        <MintWizardNavVertical
          sx={{
            display: 'block',
            [`@media screen and (min-width: 800px)`]: {
              display: 'none'
            }
          }}
        />
        <FormPosition />
      </Box>
    </Box>
  )
}

export default MintWizard