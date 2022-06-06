import React from 'react'
import { Box, Image, Textarea } from 'theme-ui'
import MintWizardContext from 'contexts/MintWizardContext'
import SummaryLegend from '../SummaryLegend'

const YbNftSummaryArt = () => {
  const { formData, setFormData } = React.useContext(MintWizardContext)

  const setDescription = (e) => {
    setFormData({
      ...formData,
      description: e.target.value,
    })
  }

  return (
    <Box
      sx={{
        border: '1px solid #D8D8D8',
        borderRadius: 8,
      }}
    >
      <Box
        sx={{
          padding: '14px 14px',
          [`@media screen and (min-width: 400px)`]: {
            padding: '24px 34px',
          },
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            color: '#16103A',
            fontSize: 16,
            fontWeight: 700,
            [`@media screen and (min-width: 400px)`]: {
              fontSize: 24,
            },
          }}
        >
          {formData.nftName ? formData.nftName : 'YBNFT'}
        </Box>
        <Box mt={22}>
          <Box
            sx={{
              position: 'relative',
              paddingBottom: '100%',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor: '#E9E9E9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {formData.artWorkUrl ? (
                <Image className="artwork-set" src={formData.artWorkUrl} />
              ) : (
                <Image className="artwork-empty" src="/images/icon-art.png" />
              )}
            </Box>
          </Box>
        </Box>
        <Box mt={18}>
          <SummaryLegend />
        </Box>
      </Box>
      <Box
        sx={{
          fontSize: 14,
          padding: '10px 10px',
          borderTop: '1px solid #D8D8D8',
          [`@media screen and (min-width: 400px)`]: {
            fontSize: 16,
          },
        }}
      >
        <Textarea
          sx={{
            width: '100%',
            height: 100,
            fontFamily: 'Noto Sans',
            border: '1px solid #e9e9e9',
            color: '#0A3F5C',
            ':focus': {
              outline: 'none !important',
            },
          }}
          cols={40}
          rows={5}
          onChange={setDescription}
          placeholder="Provide a description for your Yield Bearing NFT..."
          value={formData.description}
        />
      </Box>
    </Box>
  )
}

export default YbNftSummaryArt
