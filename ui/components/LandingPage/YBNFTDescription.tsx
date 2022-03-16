import React from 'react'
import { Box, Button, Flex, Image, Text } from 'theme-ui'
import { HPConnectWalletButton } from 'widgets/HPConnectWalletButton'

type Props = { drawTime?: number }

const YBNFTDescription = (props: Props) => {
  return (
    <Box p={3} css={{ border: '1px solid black', paddingTop: '4rem', paddingBottom: '6rem' }}>
      <Flex
        css={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Flex
          css={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            border: '1px solid blue',
            width: '70rem',
          }}
        >
          <Flex css={{ alignItems: 'center', justifyContent: 'center', padding: '40px', gap: '30px' }}>
            <Flex css={{ flexDirection: 'column', gap: '10px' }}>
              <Image src="images/nft.png" />
              <Flex
                css={{
                  border: '2px solid #EFA906',
                  borderRadius: '8px',
                  flexDirection: 'column',
                  backgroundColor: '#FFFBF4',
                  padding: '20px',
                }}
              >
                <Text css={{ fontWeight: '700', fontSize: '20px' }}>YOUR STAKE</Text>
                <Text css={{ fontWeight: '700', fontSize: '30px', color: '#EFA906' }}>0</Text>
                <Text css={{ color: '#8E8DA0', fontSize: '16px' }}>Oh-oh, you better do something about this.</Text>
              </Flex>
            </Flex>
            <Flex css={{ width: '40rem', flexDirection: 'column' }}>
              <Flex css={{ flexDirection: 'column' }}>
                <Flex>
                  <Flex css={{ flexDirection: 'column' }}>
                    <Text css={{ color: '#DF4886', fontSize: '20px', fontWeight: '500' }}>Series Name</Text>
                    <Text css={{ color: '#16103A', fontWeight: '700', fontSize: '28px' }}>
                      Yield Bearing NFT Name #7090
                    </Text>
                  </Flex>
                  <Flex
                    css={{
                      flexDirection: 'row',
                      gap: '10px',
                      alignItems: 'center',
                      marginLeft: 'auto',
                    }}
                  >
                    <Text css={{ fontSize: '20px', fontWeight: '700', color: '#ABABAB' }}>OWNER</Text>
                    <Image src="images/owner.png" css={{ width: '80px', height: '80px' }} />
                  </Flex>
                </Flex>
                <Flex css={{ flexDirection: 'row', gap: '20px' }}>
                  <Flex
                    css={{
                      border: '2px solid #D8D8D8',
                      borderRadius: '30px',
                      padding: '0 10px 0 10px',
                    }}
                  >
                    <Text css={{ color: '#8E8DA0', fontWeight: '600' }}>TLV:</Text>
                    <Text css={{ color: '#0A3F5C' }}>$5,000</Text>
                  </Flex>
                  <Flex
                    css={{
                      border: '1px solid #D8D8D8',
                      borderRadius: '30px',
                      padding: '0 10px 0 10px',
                    }}
                  >
                    <Text css={{ color: '#8E8DA0', fontWeight: '600' }}>Participants:</Text>
                    <Text css={{ color: '#0A3F5C' }}>487</Text>
                  </Flex>
                </Flex>
                <Flex css={{ flexDirection: 'row', padding: '30px', gap: '30px' }}>
                  <Button
                    css={{
                      width: '240px',
                      height: '50px',
                      borderRadius: '40px',
                      padding: '0px 20px',
                      lineHeight: '48px',
                      fontSize: '16px',
                      fontWeight: '600',
                      backgroundColor: '#1799DE',
                      color: '#fff',
                      cursor: 'pointer',
                      ':hover': {
                        border: '2px solid rgb(157 83 182)',
                        color: 'rgb(157 83 182)',
                      },
                      letterSpacing: '3px',
                    }}
                  >
                    STAKE
                  </Button>
                  <Button
                    css={{
                      width: '240px',
                      height: '50px',
                      borderRadius: '40px',
                      padding: '0px 20px',
                      lineHeight: '48px',
                      fontSize: '16px',
                      fontWeight: '600',
                      backgroundColor: '#fff',
                      color: '#1799DE',
                      cursor: 'pointer',
                      border: '2px solid #1799DE',
                    }}
                  >
                    VIEW CONTENTS
                  </Button>
                </Flex>
              </Flex>
              <Flex
                css={{
                  flexDirection: 'column',
                  border: '1px solid rgba(142, 141, 160, 0.42)',
                  borderRadius: '10px',
                  padding: '20px',
                  gap: '20px',
                }}
              >
                <Text css={{ fontWeight: '700', fontSize: '24px' }}>Strategy Composition</Text>
                <Flex css={{ gap: '15px', flexWrap: 'wrap' }}>
                  <Flex
                    css={{
                      backgroundColor: '#E5F6FF',
                      borderRadius: '8px',
                      width: '160px',
                      height: '75px',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      padding: '2px',
                    }}
                  >
                    <Image src="images/tako.svg" css={{ width: '50px', height: '50px' }} />
                    <Flex css={{ flexDirection: 'column' }}>
                      <Text css={{ fontWeight: '700', fontSize: '22px', color: '#0A3F5C' }}>1.9</Text>
                      <Text css={{ color: '#8E8DA0', fontSize: '14px', fontWeight: '500' }}>(1,213.95 USD)</Text>
                    </Flex>
                  </Flex>
                  <Flex
                    css={{
                      backgroundColor: '#E5F6FF',
                      borderRadius: '8px',
                      width: '160px',
                      height: '75px',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      padding: '2px',
                    }}
                  >
                    <Image src="images/mountain.png" css={{ width: '50px', height: '50px' }} />
                    <Flex css={{ flexDirection: 'column' }}>
                      <Text css={{ fontWeight: '700', fontSize: '22px', color: '#0A3F5C' }}>1.9</Text>
                      <Text css={{ color: '#8E8DA0', fontSize: '14px', fontWeight: '500' }}>(1,213.95 USD)</Text>
                    </Flex>
                  </Flex>
                  <Flex
                    css={{
                      backgroundColor: '#E5F6FF',
                      borderRadius: '8px',
                      width: '160px',
                      height: '75px',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      padding: '2px',
                    }}
                  >
                    <Image src="images/veto.png" css={{ width: '50px', height: '50px' }} />
                    <Flex css={{ flexDirection: 'column' }}>
                      <Text css={{ fontWeight: '700', fontSize: '22px', color: '#0A3F5C' }}>1.9</Text>
                      <Text css={{ color: '#8E8DA0', fontSize: '14px', fontWeight: '500' }}>(1,213.95 USD)</Text>
                    </Flex>
                  </Flex>
                  <Flex
                    css={{
                      backgroundColor: '#E5F6FF',
                      borderRadius: '8px',
                      width: '160px',
                      height: '75px',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      padding: '2px',
                    }}
                  >
                    <Image src="images/tako.svg" css={{ width: '50px', height: '50px' }} />
                    <Flex css={{ flexDirection: 'column' }}>
                      <Text css={{ fontWeight: '700', fontSize: '22px', color: '#0A3F5C' }}>1.9</Text>
                      <Text css={{ color: '#8E8DA0', fontSize: '14px', fontWeight: '500' }}>(1,213.95 USD)</Text>
                    </Flex>
                  </Flex>
                  <Flex
                    css={{
                      backgroundColor: '#E5F6FF',
                      borderRadius: '8px',
                      width: '160px',
                      height: '75px',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      padding: '2px',
                    }}
                  >
                    <Image src="images/tako.svg" css={{ width: '50px', height: '50px' }} />
                    <Flex css={{ flexDirection: 'column' }}>
                      <Text css={{ fontWeight: '700', fontSize: '22px', color: '#0A3F5C' }}>1.9</Text>
                      <Text css={{ color: '#8E8DA0', fontSize: '14px', fontWeight: '500' }}>(1,213.95 USD)</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex css={{ alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <HPConnectWalletButton />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default YBNFTDescription
