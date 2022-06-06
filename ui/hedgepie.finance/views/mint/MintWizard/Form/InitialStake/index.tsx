import React, { useContext, useState } from 'react'
import { Box, Input } from 'theme-ui'
import MintWizardContext from 'contexts/MintWizardContext'

const InitialStake = () => {
  const { formData, setFormData, bnbPrice } = useContext(MintWizardContext)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      initialStake: e.target.value,
      valueInUSD: Number(Number(Number(e.target.value) * bnbPrice).toFixed(4)),
    })
  }

  return (
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
        Initial Stake
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
        An Initial Stake on the minted YBNFT
      </Box>
      <Box
        sx={{
          fontSize: 12,
          mt: 22,
          color: '#8E8DA0',
          [`@media screen and (min-width: 500px)`]: {
            fontSize: 16,
          },
        }}
      >
        {/* TODO : Update this description */}
        As an owner, when you create an Yield Bearing NFT, you can stake BNB into it.
      </Box>
      <Box mt={36} sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Box
          sx={{
            width: '100%',
            maxWidth: 250,
            height: 62,
            paddingLeft: 24,
            paddingRight: 24,
            color: '#0A3F5C',
            fontSize: 30,
            fontWeight: 700,
            backgroundColor: '#fff',
            borderRadius: 62,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Input
            className="performance-input"
            sx={{
              border: 'none',
              outline: 'none',
              padding: 0,
              textAlign: 'right',
              pr: 2,
            }}
            type="number"
            min={0}
            value={formData.initialStake}
            onChange={handleChange}
          />
          BNB
        </Box>
        <Box sx={{ color: '#0A3F5C', fontSize: 24, fontWeight: 400 }}>${formData.valueInUSD} USD</Box>
      </Box>
    </Box>
  )
}

export default InitialStake
