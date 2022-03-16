import React from 'react'
import { Box, Button, Card, Flex, Text } from 'theme-ui'

type Props = {}

const Leaderboard = (props: Props) => {
  return (
    <Box p={3} css={{ border: '1px solid black', paddingTop: '4rem', paddingBottom: '6rem' }}>
      <Flex css={{ alignItems: 'center', justifyContent: 'center' }}>
        <Card
          css={{
            backgroundColor: '#F2F9FE',
            background:
              'linear-gradient(132deg, rgba(249,216,230,1) 0%, #F2F9FE 17%, #F2F9FE 87%, rgba(181,228,237,1) 100%)',
            width: '70rem',
            borderRadius: '50px',
          }}
        >
          <Box p={4}>
            <Flex css={{ flexDirection: 'column', width: '100%', gap: '10px' }}>
              <Text
                css={{
                  fontFamily: 'Noto Sans',
                  fontStyle: 'bold',
                  fontWeight: '800',
                  fontSize: '60px',
                  lineHeight: '75px',
                  color: '#16103A',
                  marginLeft: '50px',
                }}
              >
                Hedge Pie Leaderboard.
              </Text>
              <Text
                css={{
                  fontFamily: 'Noto Sans',
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  lineHeight: '10px',
                  color: '#8E8DA0',
                  marginLeft: '50px',
                  letterSpacing: '10px',
                }}
              >
                YOU DESERVE THE BEST
              </Text>
              {/* <div style={{ marginLeft: "auto" }}>
                <HPConnectWalletButton />
              </div> */}
            </Flex>
            <Flex css={{ alignItems: 'center', justifyContent: 'center' }}>
              <table
                style={{
                  borderSpacing: '50px',
                }}
              >
                <tr
                  style={{
                    fontFamily: 'Noto Sans',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: '15px',
                    lineHeight: '150%',
                    color: '#8E8DA0',
                  }}
                >
                  <th>YB-NFT NAME</th>
                  <th>YOUR STAKE</th>
                  <th>TOTAL STAKED</th>
                  <th>TIME LEFT</th>
                  <th></th>
                  <th></th>
                </tr>
                <tr
                  style={{
                    fontFamily: 'Noto Sans',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: '16px',
                    lineHeight: '150%',
                  }}
                >
                  <td style={{ color: '#16103A' }}>NFT NAME</td>
                  <td style={{ color: '#DF4886' }}>$100</td>
                  <td style={{ color: '#EFA906' }}>12</td>
                  <td style={{ color: '#16103A' }}>01:02:14</td>
                  <td>
                    <Button>View Contents</Button>
                  </td>
                  <td>
                    <Button>Stake</Button>
                  </td>
                </tr>
                <tr
                  style={{
                    fontFamily: 'Noto Sans',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: '16px',
                    lineHeight: '150%',
                  }}
                >
                  <td style={{ color: '#16103A' }}>NFT NAME</td>
                  <td style={{ color: '#DF4886' }}>$100</td>
                  <td style={{ color: '#EFA906' }}>12</td>
                  <td style={{ color: '#16103A' }}>01:02:14</td>
                  <td>
                    <Button>View Contents</Button>
                  </td>
                  <td>
                    <Button>Stake</Button>
                  </td>
                </tr>
                <tr
                  style={{
                    fontFamily: 'Noto Sans',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: '16px',
                    lineHeight: '150%',
                  }}
                >
                  <td style={{ color: '#16103A' }}>NFT NAME</td>
                  <td style={{ color: '#DF4886' }}>$100</td>
                  <td style={{ color: '#EFA906' }}>12</td>
                  <td style={{ color: '#16103A' }}>01:02:14</td>
                  <td>
                    <Button>View Contents</Button>
                  </td>
                  <td>
                    <Button>Stake</Button>
                  </td>
                </tr>
                <tr
                  style={{
                    fontFamily: 'Noto Sans',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: '16px',
                    lineHeight: '150%',
                  }}
                >
                  <td style={{ color: '#16103A' }}>NFT NAME</td>
                  <td style={{ color: '#DF4886' }}>$100</td>
                  <td style={{ color: '#EFA906' }}>12</td>
                  <td style={{ color: '#16103A' }}>01:02:14</td>
                  <td>
                    <Button>View Contents</Button>
                  </td>
                  <td>
                    <Button>Stake</Button>
                  </td>
                </tr>
                <tr
                  style={{
                    fontFamily: 'Noto Sans',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: '16px',
                    lineHeight: '150%',
                  }}
                >
                  <td style={{ color: '#16103A' }}>NFT NAME</td>
                  <td style={{ color: '#DF4886' }}>$100</td>
                  <td style={{ color: '#EFA906' }}>12</td>
                  <td style={{ color: '#16103A' }}>01:02:14</td>
                  <td>
                    <Button>View Contents</Button>
                  </td>
                  <td>
                    <Button>Stake</Button>
                  </td>
                </tr>
              </table>
            </Flex>
          </Box>
        </Card>
      </Flex>
    </Box>
  )
}

export default Leaderboard
