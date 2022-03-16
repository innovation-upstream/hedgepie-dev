import React from 'react'
import { Box, Card, Flex, Image, Text } from 'theme-ui'

type Props = {}

const Steps = (props: Props) => {
  return (
    <Box p={3} css={{ border: '2px solid black', paddingTop: '4rem', paddingBottom: '6rem' }}>
      <Flex css={{ alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
        <Card
          css={{
            width: '20rem',
            backgroundColor: '#F6FAFD',
            borderRadius: '60px',
            boxShadow: '0px 15px 0px #1782DE',
            padding: '2rem',
          }}
        >
          <Flex css={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Flex
              css={{
                alignItems: 'center',
                justifyContent: 'center',
                // border: "2px solid #1799DE",
                width: '5rem',
                height: '5rem',
                borderRadius: '60px',
              }}
            >
              {/* <Text
                css={{
                  color: "#16103A",
                  fontFamily: "Noto Sans",
                  fontStyle: "normal",
                  fontWeight: "800",
                  fontSize: "60px",
                  lineHeight: "82px",
                  textAlign: "center"
                }}
              >
                1
              </Text> */}
              <Image src="images/step1.svg" />
            </Flex>
            <Text
              css={{
                color: '#1782DE',
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: '30px',
                lineHeight: '45px',
                textAlign: 'center',
              }}
            >
              Earn Up to XX% APY
            </Text>
            <Text
              css={{
                fontFamily: 'Noto Sans',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '16px',
                lineHeight: '28px',
                textAlign: 'center',
                color: '#16103A',
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat turpis mauris nunc sit placerat
              ullamcorper v
            </Text>
          </Flex>
        </Card>
        <Card
          css={{
            width: '22rem',
            backgroundColor: '#F6FAFD',
            borderRadius: '60px',
            boxShadow: '0px 15px 0px #FCDB8F',
            padding: '2rem',
          }}
        >
          <Flex css={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Flex
              css={{
                alignItems: 'center',
                justifyContent: 'center',
                // border: "2px solid #EFA906",
                width: '5rem',
                height: '5rem',
                borderRadius: '60px',
              }}
            >
              {/* <Text
                css={{
                  color: "#16103A",
                  fontFamily: "Noto Sans",
                  fontStyle: "normal",
                  fontWeight: "800",
                  fontSize: "60px",
                  lineHeight: "82px",
                  textAlign: "center"
                }}
              >
                2
              </Text> */}
              <Image src="images/step2.svg" />
            </Flex>
            <Text
              css={{
                color: '#EFA906',
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: '30px',
                lineHeight: '45px',
                textAlign: 'center',
              }}
            >
              Create Your Own Fund
            </Text>
            <Text
              css={{
                fontFamily: 'Noto Sans',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '16px',
                lineHeight: '28px',
                textAlign: 'center',
                color: '#16103A',
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat turpis mauris nunc sit placerat
              ullamcorper v
            </Text>
          </Flex>
        </Card>
        <Card
          css={{
            width: '20rem',
            backgroundColor: '#F6FAFD',
            borderRadius: '60px',
            boxShadow: '0px 15px 0px #DF4886',
            padding: '2rem',
          }}
        >
          <Flex css={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Flex
              css={{
                alignItems: 'center',
                justifyContent: 'center',
                // border: "2px solid #DF4886",
                width: '5rem',
                height: '5rem',
                borderRadius: '60px',
              }}
            >
              {/* <Text
                css={{
                  color: "#16103A",
                  fontFamily: "Noto Sans",
                  fontStyle: "normal",
                  fontWeight: "800",
                  fontSize: "60px",
                  lineHeight: "82px",
                  textAlign: "center"
                }}
              >
                3
              </Text> */}
              <Image src="images/step3.svg" />
            </Flex>
            <Text
              css={{
                color: '#DF4886',
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: '30px',
                lineHeight: '45px',
                textAlign: 'center',
              }}
            >
              Enter the Lottery
            </Text>
            <Text
              css={{
                fontFamily: 'Noto Sans',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '16px',
                lineHeight: '28px',
                textAlign: 'center',
                color: '#16103A',
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat turpis mauris nunc sit placerat
              ullamcorper v consectetur adipiscing elit. Donec volutpat turpis mauris nunc sit
            </Text>
          </Flex>
        </Card>
      </Flex>
    </Box>
  )
}

export default Steps
