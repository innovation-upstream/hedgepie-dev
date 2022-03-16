import React from 'react'
import { Box, Button, Card, Flex, Text, Image } from 'theme-ui'

type Props = {}

const FinishedRounds = (props: Props) => {
  return (
    <Box p={3} css={{ border: '1px solid black', paddingTop: '4rem', paddingBottom: '6rem' }}>
      <Flex css={{ alignItems: 'center', justifyContent: 'center' }}>
        <Card
          css={{
            backgroundColor: '#FFFFFF',
            width: '70rem',
            borderRadius: '50px',
            border: '1px solid blue',
          }}
        >
          <Box p={4}>
            <Flex
              css={{
                alignItems: 'flex-start',
                width: '100%',
                flexDirection: 'column',
                gap: '30px',
              }}
            >
              <Text
                css={{
                  fontFamily: 'Noto Sans',
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  fontSize: '42px',
                  lineHeight: '100%',
                  color: '#16103A',
                  marginLeft: '50px',
                }}
              >
                Finished Rounds
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
                  marginTop: '-20px',
                }}
              >
                VIEW PAST SUCCESS
              </Text>
              <Flex css={{ marginLeft: '50px', gap: '5rem' }}>
                <Card
                  css={{
                    backgroundColor: 'rgba(22, 16, 58, 1)',
                    border: '1px solid #0A3F5C',
                    borderRadius: '25px',
                    padding: '20px',
                    width: 'fit-content',
                  }}
                >
                  <Box p={3}>
                    <Flex css={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                      <Text
                        css={{
                          fontFamily: 'Noto Sans',
                          fontStyle: 'normal',
                          fontWeight: 600,
                          fontSize: '16px',
                          lineHeight: '150%',
                          color: '#FFFFFF',
                        }}
                      >
                        PREVIOUS ROUNDS
                      </Text>
                      <Button
                        css={{
                          marginLeft: 'auto',
                          borderRadius: '40px',
                          padding: '0px 20px',
                          width: '150px',
                          lineHeight: '48px',
                          fontSize: '16px',
                          fontWeight: '600',
                          backgroundColor: 'rgba(22, 16, 58, 1)',
                          cursor: 'pointer',
                          border: '2px solid rgba(23, 153, 222, 1)',
                          color: 'rgba(23, 153, 222, 1)',
                          boxShadow: '0px 20px 40px 0px rgba(23, 153, 222, 0.2)',
                        }}
                      >
                        View All
                      </Button>
                    </Flex>
                  </Box>
                  <Flex css={{ gap: '10px', flexDirection: 'column' }}>
                    <Card
                      css={{
                        backgroundColor: '#ffffff',
                        height: 'fit-content',
                        borderRadius: '2rem',
                        padding: '10px',
                      }}
                    >
                      <Flex
                        css={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '20px',
                        }}
                      >
                        <Text
                          css={{
                            fontFamily: 'Noto Sans',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            fontSize: '15px',
                            lineHeight: '150%',
                            color: '#16103A',
                            marginLeft: '20px',
                          }}
                        >
                          Drawn September 9, 2021 @ 11.00 AM PST
                        </Text>
                        <div
                          style={{
                            width: '35px',
                            height: '35px',
                            border: '2px solid rgba(239, 169, 6, 1)',
                            borderRadius: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Image src="images/chevronRight.png" />
                        </div>
                      </Flex>
                    </Card>
                    <Card
                      css={{
                        backgroundColor: '#ffffff',
                        height: 'fit-content',
                        borderRadius: '2rem',
                        padding: '10px',
                      }}
                    >
                      <Flex
                        css={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '20px',
                        }}
                      >
                        <Text
                          css={{
                            fontFamily: 'Noto Sans',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            fontSize: '15px',
                            lineHeight: '150%',
                            color: '#16103A',
                            marginLeft: '20px',
                          }}
                        >
                          Drawn September 9, 2021 @ 11.00 AM PST
                        </Text>
                        <div
                          style={{
                            width: '35px',
                            height: '35px',
                            border: '2px solid rgba(239, 169, 6, 1)',
                            borderRadius: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Image src="images/chevronRight.png" />
                        </div>
                      </Flex>
                    </Card>
                    <Card
                      css={{
                        backgroundColor: '#ffffff',
                        height: 'fit-content',
                        borderRadius: '2rem',
                        padding: '10px',
                      }}
                    >
                      <Flex
                        css={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '20px',
                        }}
                      >
                        <Text
                          css={{
                            fontFamily: 'Noto Sans',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            fontSize: '15px',
                            lineHeight: '150%',
                            color: '#16103A',
                            marginLeft: '20px',
                          }}
                        >
                          Drawn September 9, 2021 @ 11.00 AM PST
                        </Text>
                        <div
                          style={{
                            width: '35px',
                            height: '35px',
                            border: '2px solid rgba(239, 169, 6, 1)',
                            borderRadius: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Image src="images/chevronRight.png" />
                        </div>
                      </Flex>
                    </Card>
                    <Card
                      css={{
                        backgroundColor: '#ffffff',
                        height: 'fit-content',
                        borderRadius: '2rem',
                        padding: '10px',
                      }}
                    >
                      <Flex
                        css={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '20px',
                        }}
                      >
                        <Text
                          css={{
                            fontFamily: 'Noto Sans',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            fontSize: '15px',
                            lineHeight: '150%',
                            color: '#16103A',
                            marginLeft: '20px',
                          }}
                        >
                          Drawn September 9, 2021 @ 11.00 AM PST
                        </Text>
                        <div
                          style={{
                            width: '35px',
                            height: '35px',
                            border: '2px solid rgba(239, 169, 6, 1)',
                            borderRadius: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Image src="images/chevronRight.png" />
                        </div>
                      </Flex>
                    </Card>
                    <Card
                      css={{
                        backgroundColor: '#ffffff',
                        height: 'fit-content',
                        borderRadius: '2rem',
                        padding: '10px',
                      }}
                    >
                      <Flex
                        css={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '20px',
                        }}
                      >
                        <Text
                          css={{
                            fontFamily: 'Noto Sans',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            fontSize: '15px',
                            lineHeight: '150%',
                            color: '#16103A',
                            marginLeft: '20px',
                          }}
                        >
                          Drawn September 9, 2021 @ 11.00 AM PST
                        </Text>
                        <div
                          style={{
                            width: '35px',
                            height: '35px',
                            border: '2px solid rgba(239, 169, 6, 1)',
                            borderRadius: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Image src="images/chevronRight.png" />
                        </div>
                      </Flex>
                    </Card>
                  </Flex>
                </Card>
                <Card
                  css={{
                    backgroundColor: '#DF4886',
                    border: '1px solid #EBE1DF',
                    borderRadius: '25px',
                  }}
                >
                  <Flex css={{ backgroundColor: '#DF4886', width: '30rem', borderRadius: '25px' }}>
                    <div
                      style={{
                        width: 'fit-content',
                        color: '#DF4886',
                        backgroundColor: '#FCDB8F',
                        borderBottomRightRadius: '25px',
                        fontFamily: 'Poppins',
                        fontStyle: 'normal',
                        fontWeight: 600,
                        fontSize: '31px',
                        lineHeight: '46px',
                        borderTopLeftRadius: '25px',
                        padding: '10px',
                        marginLeft: '-1px',
                      }}
                    >
                      #265
                    </div>
                    <Flex css={{ alignItems: 'center', justifyContent: 'center', width: '20rem' }}>
                      <Text
                        css={{
                          fontFamily: 'Poppins',
                          fontStyle: 'normal',
                          fontWeight: 600,
                          fontSize: '18px',
                          lineHeight: '46px',
                          color: '#FFFFFF',
                        }}
                      >
                        Recent Winning Rounds
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex
                    css={{
                      marginTop: '40px',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '30px',
                    }}
                  >
                    <Flex
                      css={{
                        flexDirection: 'row',
                        gap: '30px',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Flex css={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                        <Image css={{ width: '60px', height: '60px' }} src="images/winning.png" />
                        <Text css={{ color: '#fff', fontWeight: '600' }}>WINNING TICKET:</Text>
                      </Flex>
                      <Flex
                        css={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '12rem',
                          height: 'fit-content',
                          backgroundColor: '#ffffff',
                          borderRadius: '30px',
                        }}
                      >
                        <Text
                          css={{
                            color: '#DF4886',
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            fontSize: '24px',
                            lineHeight: '46px',
                          }}
                        >
                          #123456
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex css={{ flexDirection: 'row', alignItems: 'center', gap: '30px' }}>
                      <Flex css={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                        <Image css={{ width: '75px', height: '70px' }} src="images/bitcoin.png" />
                        <Text css={{ color: '#fff', fontWeight: '600' }}>YB NFT VALUE:</Text>
                      </Flex>
                      <Flex
                        css={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '12rem',
                          height: 'fit-content',
                          backgroundColor: '#ffffff',
                          borderRadius: '30px',
                        }}
                      >
                        <Text
                          css={{
                            color: '#DF4886',
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            fontSize: '24px',
                            lineHeight: '46px',
                          }}
                        >
                          $17,325
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex css={{ flexDirection: 'row', alignItems: 'center', gap: '30px' }}>
                      <Flex css={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                        <Image css={{ width: '60px', height: '70px' }} src="images/woman.png" />
                        <Text css={{ color: '#fff', fontWeight: '600' }}>TOTAL PLAYERS:</Text>
                      </Flex>
                      <Flex
                        css={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '12rem',
                          height: 'fit-content',
                          backgroundColor: '#ffffff',
                          borderRadius: '30px',
                        }}
                      >
                        <Text
                          css={{
                            color: '#DF4886',
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            fontSize: '24px',
                            lineHeight: '46px',
                          }}
                        >
                          1234
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
              </Flex>
            </Flex>
          </Box>
        </Card>
      </Flex>
    </Box>
  )
}

export default FinishedRounds
