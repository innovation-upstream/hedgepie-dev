/** @jsx jsx */
/** @jsxRuntime classic */

import { useState, useEffect } from 'react'
import {
  ThemeProvider,
  jsx,
  Box,
  Flex,
  Button,
  Text,
  Image,
  Input,
  Select,
} from 'theme-ui'

import { theme } from 'themes/theme'

type Props = {}

type Position = {
  posType: string
  posQuantity: number
  posWeight: number
}

const Mint = (props: Props) => {
  const [step, setStep] = useState(1)
  const [positions, setPositions] = useState([] as Position[])
  const [allocated, setAllocated] = useState(0)
  const [performanceFee, setPerformanceFee] = useState(0)
  const [YBNFTName, setYBNFTName] = useState('')
  const [chosenFileName, setChosenFileName] = useState('')
  const [chosenFile, setChosenFile] = useState<any | undefined>()

  const onWeightChange = (event: any) => {
    var newPositions = [...positions]
    newPositions[event.target.dataset.index].posWeight = Number(
      event.target.value,
    )
    setPositions(newPositions)
  }

  const onTypeChange = (event: any) => {
    var newPositions = [...positions]
    newPositions[event.target.dataset.index].posType = event.target.value
    setPositions(newPositions)
  }

  const onQuantityChange = (event: any) => {
    var newPositions = [...positions]
    newPositions[event.target.dataset.index].posQuantity = Number(
      event.target.value,
    )
    setPositions(newPositions)
  }

  // Perform any operations for the state update of positions
  useEffect(() => {
    var totalAllocated = 0
    positions.forEach((position) => {
      totalAllocated = (totalAllocated + position.posWeight) as number
    })
    setAllocated(totalAllocated)
  }, [positions])

  const uploadFile = () => {
    //TODO
    // Perform the functions to upload the artwork
  }

  const mintYBNFT = () => {
    console.log('YB NFT NAME: ' + YBNFTName)
    console.log('YB NFT Artwork: ' + chosenFileName)
    console.log('Performance Fee: ' + performanceFee)
    console.log('Positions: ' + JSON.stringify(positions))
  }

  return (
    <ThemeProvider theme={theme}>
      <Box p={3}>
        <Flex
          css={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Flex
            css={{
              width: 'max-content',
              //   border: '2px solid black',
              boxShadow: '0px 25px 55px rgba(209, 208, 219, 0.4)',
              flexDirection: 'column',
            }}
          >
            {/* Banner */}
            <Flex
              css={{
                height: '4rem',
                alignItems: 'center',
                paddingLeft: '2rem',
                backgroundColor: '#1799DE',
                color: '#fff',
                fontWeight: '600',
                fontFamily: 'Poppins',
                fontSize: '26px',
              }}
            >
              YB NFT Minting
            </Flex>
            {/* Steps */}
            <Flex
              css={{
                flexDirection: 'row',
                gap: '4rem',
                margin: '2rem',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Flex
                css={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <Text css={{ fontFamily: 'Noto Sans' }}>
                  Choose Positions and Weights
                </Text>
                <Button
                  css={{ cursor: 'pointer' }}
                  onClick={() => {
                    setStep(1)
                  }}
                >
                  Step 1
                </Button>
              </Flex>
              <Flex
                css={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <Text css={{ fontFamily: 'Noto Sans' }}>
                  Set Performance Fee
                </Text>
                <Button
                  css={{ cursor: 'pointer' }}
                  onClick={() => {
                    setStep(2)
                  }}
                >
                  Step 2
                </Button>
              </Flex>
              <Flex
                css={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <Text css={{ fontFamily: 'Noto Sans' }}>
                  Optional Art and Name
                </Text>
                <Button
                  css={{ cursor: 'pointer' }}
                  onClick={() => {
                    setStep(3)
                  }}
                >
                  Step 3
                </Button>
              </Flex>
            </Flex>

            {/* Full Content (with the right and left parts) */}
            <Flex css={{ flexDirection: 'row', gap: '2rem' }}>
              {/* Left Content */}
              <Flex
                css={{
                  flexDirection: 'column',
                  gap: '2rem',
                  width: '40rem',
                  height: 'max-content',
                  //   border: '1px solid #D8D8D8',
                  margin: '1rem',
                }}
              >
                {step === 1 && (
                  <Flex
                    css={{
                      flexDirection: 'column',
                      backgroundColor: '#E5F6FF',
                      borderRadius: '6px',
                    }}
                  >
                    {/* Labels */}
                    <Flex
                      css={{
                        flexDirection: 'row',
                        margin: '1rem',
                        gap: '13rem',
                      }}
                    >
                      <Text
                        css={{
                          fontFamily: 'Noto Sans',
                          fontWeight: '700',
                          fontSize: '25px',
                        }}
                      >
                        Composition
                      </Text>
                      <Text
                        css={{
                          fontFamily: 'Noto Sans',
                          fontWeight: '700',
                          fontSize: '25px',
                        }}
                      >
                        Weight
                      </Text>
                    </Flex>
                    {/* Values */}
                    {positions.map((position, index) => (
                      <Flex
                        css={{
                          flexDirection: 'row',
                          margin: '1rem',
                          gap: '2rem',
                        }}
                        key={index}
                      >
                        <Select
                          defaultValue="Hello"
                          css={{ width: '10rem' }}
                          data-index={index}
                          onChange={onTypeChange}
                        >
                          <option>Tako</option>
                          <option>Option 2</option>
                          <option>Option 3</option>
                          <option>Option 4</option>
                        </Select>
                        <Input
                          defaultValue={'Quantity (eg. 1.9)'}
                          data-index={index}
                          onChange={onQuantityChange}
                        />
                        <Input
                          defaultValue={'Weight (%)'}
                          data-index={index}
                          type={'number'}
                          onChange={onWeightChange}
                        />
                      </Flex>
                    ))}
                    <Button
                      css={{
                        marginLeft: '2rem',
                        width: '10rem',
                        cursor: 'pointer',
                        marginBottom: '1rem',
                      }}
                      onClick={() => {
                        setPositions((prevState) => [
                          ...prevState,
                          {
                            posWeight: 0,
                            posQuantity: 0,
                            posType: 'Tako',
                          } as Position,
                        ])
                      }}
                    >
                      Add Position
                    </Button>
                  </Flex>
                )}
                {step === 2 && (
                  <Flex
                    css={{
                      flexDirection: 'column',
                      backgroundColor: '#E5F6FF',
                      paddingBottom: '2rem',
                      borderRadius: '6px',
                    }}
                  >
                    <Text
                      css={{
                        fontFamily: 'Noto Sans',
                        fontWeight: '700',
                        fontSize: '20px',
                        margin: '1rem',
                      }}
                    >
                      Performance Fee
                    </Text>
                    <Text
                      css={{
                        fontFamily: 'Noto Sans',
                        fontWeight: '400',
                        fontSize: '16px',
                        margin: '1rem',
                        color: '#8E8DA0',
                      }}
                    >
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution of letters, as
                      opposed to using 'Content here, content here', making it
                      look like readable English.{' '}
                    </Text>
                    <Input
                      css={{ marginLeft: '1rem', width: '20rem' }}
                      defaultValue={'35%'}
                      onChange={(event) => {
                        setPerformanceFee(Number(event.target.value))
                      }}
                    />
                  </Flex>
                )}
                {step === 3 && (
                  <Flex css={{ flexDirection: 'column', gap: '2rem' }}>
                    <Flex
                      css={{
                        flexDirection: 'column',
                        backgroundColor: '#E5F6FF',
                        paddingBottom: '1rem',
                        borderRadius: '6px',
                      }}
                    >
                      <Text
                        css={{
                          fontFamily: 'Noto Sans',
                          fontWeight: '700',
                          fontSize: '20px',
                          margin: '1rem',
                        }}
                      >
                        Upload Artwork
                      </Text>
                      <Text
                        css={{
                          fontFamily: 'Noto Sans',
                          fontWeight: '400',
                          fontSize: '16px',
                          margin: '1rem',
                          color: '#8E8DA0',
                        }}
                      >
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or-less normal distribution of
                        letters, as opposed to using 'Content here, content
                        here', making it look like readable English.{' '}
                      </Text>
                      <Input
                        css={{
                          marginLeft: '1rem',
                          width: '20rem',
                          marginBottom: '1rem',
                        }}
                        type="file"
                        onChange={(e) => {
                          if (e?.target?.files?.length) {
                            setChosenFileName(e.target.files[0].name)
                            setChosenFile(e.target.files[0])
                          }
                        }}
                      />
                      <Button
                        css={{
                          marginLeft: '1rem',
                          width: '20rem',
                          cursor: 'pointer',
                        }}
                        onClick={uploadFile}
                      >
                        UPLOAD
                      </Button>
                    </Flex>
                    <Flex
                      css={{
                        flexDirection: 'column',
                        backgroundColor: '#E5F6FF',
                        paddingBottom: '1rem',
                        borderRadius: '6px',
                      }}
                    >
                      <Text
                        css={{
                          fontFamily: 'Noto Sans',
                          fontWeight: '700',
                          fontSize: '20px',
                          margin: '1rem',
                        }}
                      >
                        NFT Name
                      </Text>

                      <Input
                        css={{ marginLeft: '1rem', width: '20rem' }}
                        defaultValue={'Provide a preferred NFT Title..'}
                        onChange={(event) => {
                          setYBNFTName(event.target.value)
                        }}
                      />
                    </Flex>
                  </Flex>
                )}
                {step != 3 && (
                  <Button
                    css={{ margin: '1rem', cursor: 'pointer' }}
                    onClick={() => {
                      if (step != 3) setStep(step + 1)
                    }}
                  >
                    Next Step
                  </Button>
                )}
                {step === 3 && (
                  <Button
                    css={{ margin: '1rem', cursor: 'pointer' }}
                    onClick={mintYBNFT}
                  >
                    MINT YB NFT
                  </Button>
                )}
              </Flex>
              {/* Right Content */}
              <Flex
                css={{
                  flexDirection: 'column',
                  gap: '2rem',
                  width: '20rem',
                  height: 'max-content',
                  border: '1px solid #D8D8D8',
                  margin: '1rem',
                }}
              >
                <Flex
                  css={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                  }}
                >
                  <Text
                    css={{
                      marginTop: '1rem',
                      fontWeight: '700',
                      fontFamily: 'Noto Sans',
                      fontSize: '20px',
                    }}
                  >
                    YB NFT Summary
                  </Text>
                  <Image
                    src={'images/artwork-dummy.png'}
                    css={{ margin: '0.5rem' }}
                  />
                  <Flex
                    css={{ flexDirection: 'column', alignItems: 'self-start' }}
                  >
                    <Flex css={{ gap: '1rem' }}>
                      <Text
                        css={{
                          fontWeight: '700',
                          fontFamily: 'Noto Sans',
                          fontSize: '16px',
                        }}
                      >
                        {allocated}%
                      </Text>
                      <Text
                        css={{
                          fontWeight: '700',
                          fontFamily: 'Noto Sans',
                          fontSize: '16px',
                          color: '#DF4886',
                        }}
                      >
                        Allocated
                      </Text>
                    </Flex>
                    <Flex css={{ gap: '1rem' }}>
                      <Text
                        css={{
                          fontWeight: '700',
                          fontFamily: 'Noto Sans',
                          fontSize: '16px',
                        }}
                      >
                        {100 - allocated}%
                      </Text>
                      <Text
                        css={{
                          fontWeight: '700',
                          fontFamily: 'Noto Sans',
                          fontSize: '16px',
                          color: '#DF4886',
                        }}
                      >
                        Unallocated
                      </Text>
                    </Flex>
                    <Flex css={{ gap: '1rem' }}>
                      <Text
                        css={{
                          fontWeight: '700',
                          fontFamily: 'Noto Sans',
                          fontSize: '16px',
                        }}
                      >
                        Artwork
                      </Text>
                      {chosenFileName ? (
                        <Text
                          css={{
                            fontWeight: '700',
                            fontFamily: 'Noto Sans',
                            fontSize: '16px',
                            color: '#DF4886',
                          }}
                        >
                          {chosenFileName}
                        </Text>
                      ) : (
                        <Text
                          css={{
                            fontWeight: '700',
                            fontFamily: 'Noto Sans',
                            fontSize: '16px',
                            color: '#DF4886',
                          }}
                        >
                          Not Set
                        </Text>
                      )}
                    </Flex>
                    <Flex css={{ gap: '1rem' }}>
                      <Text
                        css={{
                          fontWeight: '700',
                          fontFamily: 'Noto Sans',
                          fontSize: '16px',
                        }}
                      >
                        YB NFT Name
                      </Text>
                      {YBNFTName ? (
                        <Text
                          css={{
                            fontWeight: '700',
                            fontFamily: 'Noto Sans',
                            fontSize: '16px',
                            color: '#DF4886',
                          }}
                        >
                          {YBNFTName}
                        </Text>
                      ) : (
                        <Text
                          css={{
                            fontWeight: '700',
                            fontFamily: 'Noto Sans',
                            fontSize: '16px',
                            color: '#DF4886',
                          }}
                        >
                          Not Set
                        </Text>
                      )}
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </ThemeProvider>
  )
}

export default Mint
