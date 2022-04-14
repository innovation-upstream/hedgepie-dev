import React from 'react'
import { Box, Button } from 'theme-ui'
import MintWizardContext from 'contexts/MintWizardContext'
import UploadArtwork from './UploadArtwork'
import NftName from './NftName'
import YbNftSummaryArt from './YbNftSummaryArt'

const FormArtName = () => {

  const { formData } = React.useContext(MintWizardContext)

  const handleMint = () => {
    console.log('form data')
    console.log(formData)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '34px',
        marginTop: 40,
        [`@media screen and (min-width: 1200px)`]: {
          flexDirection: 'row',
        }
      }}
    >
      <Box
        sx={{
          flex: 1
        }}
      >
        <Box>
          <UploadArtwork />
        </Box>
        <Box mt={3}>
          <NftName />
        </Box>
        <Box mt={24}>
          <Button
            variant="primary"
            sx={{
              height: 64,
              width: '100%',
              border: '1px solid #1799DE',
              borderRadius: 40,
              padding: 0,
              cursor: 'pointer',
              transition: 'all .2s'
            }}
            onClick={handleMint}
          >
            MINT YB NFT
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          maxWidth: 334,
          flexShrink: 0
        }}
      >
        <YbNftSummaryArt />
      </Box>
    </Box>
  )
}

export default FormArtName