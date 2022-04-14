import React from 'react'
import { Box, Input } from 'theme-ui'
import MintWizardContext from 'contexts/MintWizardContext'

const NftName = () => {

  const { formData, setFormData } = React.useContext(MintWizardContext)

  const handleNameChange = (e) => {
    setFormData({
      ...formData,
      nftName: e.target.value
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
        }
      }}
    >
      <Box
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: '#16103A',
          [`@media screen and (min-width: 500px)`]: {
            fontSize: 24,
          }
        }}
      >
        NFT Name
      </Box>
      <Box
        sx={{
          fontSize: 12,
          fontWeight: 500,
          color: '#DF4886',
          [`@media screen and (min-width: 500px)`]: {
            fontSize: 16
          }
        }}
      >
        Provide a name you want to give your NFT
      </Box>
      <Box mt={24}>
        <Input
          type="text"
          sx={{
            height: 62,
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: 62,
            fontSize: 30,
            paddingLeft: 24,
            paddingRight: 24,
            border: 'none',
            outline: 'none'
          }}
          placeholder="NFT Title ..."
          value={formData.nftName}
          onChange={handleNameChange}
        />
      </Box>
    </Box>
  )
}

export default NftName