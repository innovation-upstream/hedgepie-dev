import React from 'react'
import { Box, Image, Button } from 'theme-ui'
import { ArrowRight } from 'react-feather'

const CollectWinnings = () => {
  return (
    <Box
      sx={{
        marginTop: 60,
        marginBottom: 150
      }}
    >
      <Box
        sx={{
          margin: '0 auto',
          width: 1200,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            '& > *': {
              flex: 1
            }
          }}
        >
          <Box>
            <Image src="/images/piebear.png" />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Box
              sx={{
                color: '#16103A',
                fontSize: 50,
                fontWeight: 700
              }}
            >
              Choose your path.
            </Box>
            <Box
              sx={{
                color: '#8E8DA0',
                marginTop: 16
              }}
            >
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites
            </Box>
            <Box sx={{ marginTop: 50 }}>
              <Button
                variant="primary"
                sx={{
                  borderRadius: 40,
                  height: 64,
                  padding: '0 24px',
                  cursor: 'pointer',
                  transition: 'all .2s',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Box mr={2}>
                  Connect Wallet
                </Box>
                <ArrowRight />
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            '& > *': {
              flex: 1
            }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Box
              sx={{
                color: '#16103A',
                fontSize: 50,
                fontWeight: 700
              }}
            >
              Collect Winnings.
            </Box>
            <Box
              sx={{
                color: '#8E8DA0',
                marginTop: 16
              }}
            >
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites
            </Box>
            <Box sx={{ marginTop: 50 }}>
              <Button
                variant="info"
                sx={{
                  borderRadius: 40,
                  height: 64,
                  padding: '0 24px',
                  cursor: 'pointer',
                  transition: 'all .2s',
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #1799DE',
                }}
              >
                <Box mr={2}>
                  Connect Winning
                </Box>
                <ArrowRight />
              </Button>
            </Box>
          </Box>
          <Box sx={{ position: 'relative' }}>
            <Image src="/images/cake-ring.png" />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Image src="/images/logo-large.png" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default CollectWinnings