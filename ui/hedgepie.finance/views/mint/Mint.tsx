import React from 'react'
import { Box, Image } from 'theme-ui'
import MintWizard from './MintWizard'

const Mint = () => {

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: '100%',
          position: 'absolute',
          top: -99,
          left: 0,
          [`@media screen and (min-width: 700px)`]: {
            top: -149,
          },
          [`@media screen and (min-width: 992px)`]: {
            top: -197,
          }
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            margin: '0 auto'
          }}
        >
          <Image
            src="/images/hedgehog-head.png"
            sx={{
              width: 200,
              [`@media screen and (min-width: 700px)`]: {
                width: 300,
              },
              [`@media screen and (min-width: 992px)`]: {
                width: 'auto'
              }
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          position: 'relative',
          padding: '0 16px',
          paddingTop: 80,
          paddingBottom: 40,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            margin: '0 auto',
            maxWidth: 1200,
          }}
        >
          <MintWizard />
        </Box>
      </Box>
      <Box
        sx={{
          position: 'relative',
          height: 200,
          width: '100%',
          [`@media screen and (min-width: 1200px)`]: {
            height: 300
          }
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            margin: '0 auto',
            position: 'relative'
          }}
        >
          <Image
            src="/images/pie-eaten.png"
            sx={{
              position: 'absolute',
              width: 200,
              top: -40,
              right: 0,
              [`@media screen and (min-width: 600px)`]: {
                width: 300,
                right: -40
              },
              [`@media screen and (min-width: 1200px)`]: {
                width: 400,
                right: -200
              }
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Mint
