import React from 'react'
import { Box, Image } from 'theme-ui'
import MintWizardContext from 'contexts/MintWizardContext'
import Legend from './Legend'

const YbNftSummaryArt = () => {

  const { formData } = React.useContext(MintWizardContext)

  return (
    <Box
      sx={{
        border: '1px solid #D8D8D8',
        borderRadius: 8
      }}
    >
      <Box
        sx={{
          padding: '14px 14px',
          [`@media screen and (min-width: 400px)`]: {
            padding: '24px 34px',
          }
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
            }
          }}
        >
          YB NFT Summary
        </Box>
        <Box mt={22}>
          <Box
            sx={{
              position: 'relative',
              paddingBottom: '100%'
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
                justifyContent: 'center'
              }}
            >
              {formData.artWorkUrl ?
                <Image src={formData.artWorkUrl} />
                :
                <Image src="/images/icon-art.png" />
              }
            </Box>
          </Box>
        </Box>
        <Box mt={18}>
          <Legend />
        </Box>
      </Box>
      <Box
        sx={{
          fontSize: 14,
          padding: '20px 34px',
          borderTop: '1px solid #D8D8D8',
          [`@media screen and (min-width: 400px)`]: {
            fontSize: 16
          }
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptas, a, suscipit delectus ipsa harum voluptatibus eius hic quae et aliquam obcaecati aliquid modi assumenda ex mollitia unde, ut porro?
      </Box>
    </Box>
  )
}

export default YbNftSummaryArt