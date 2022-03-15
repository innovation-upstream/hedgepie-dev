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

import { FiUnlock, FiLock } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'

type Props = {}

type Position = {
  posType: string
  posQuantity: number
  posWeight: number
}

const FinalMint = (props: Props) => {
  const [step, setStep] = useState(1)
  const [positions, setPositions] = useState([] as Position[])
  const [locked, setLocked] = useState([] as boolean[])
  const [allocated, setAllocated] = useState(0)
  const [performanceFee, setPerformanceFee] = useState(0)
  const [YBNFTName, setYBNFTName] = useState('')
  const [chosenFileName, setChosenFileName] = useState('')
  const [chosenFile, setChosenFile] = useState<any | undefined>()

  useEffect(() => {
    console.log(JSON.stringify(locked))
  }, [locked])

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
              // border: '2px solid black',
              boxShadow: '0px 25px 55px rgba(209, 208, 219, 0.4)',
              flexDirection: 'column',
            }}
          >
            {/* Banner */}
            <Flex
              css={{
                height: '5rem',
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
                // gap: '4rem',
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
                <Text
                  css={{
                    fontFamily: 'Noto Sans',
                    fontWeight: '600',
                    fontSize: '16px',
                    color: step === 1 ? '#16103A' : '#8E8DA0',
                  }}
                >
                  Choose Positions and Weights
                </Text>
                <Button
                  css={{
                    cursor: 'pointer',
                    fontFamily: 'Noto Sans',
                    fontWeight: '800',
                    fontSize: '36px',
                    color: step === 1 ? '#16103A' : '#8E8DA0',
                    backgroundColor: '#fff',
                    border: '2px solid #1799DE',
                    borderRadius: '72px',
                    width: '72px',
                    height: '72px',
                  }}
                  onClick={() => {
                    setStep(1)
                  }}
                >
                  1
                </Button>
              </Flex>
              <div
                style={{
                  width: '250px',
                  height: '2px',
                  backgroundColor: '#1799DE',
                  marginTop: '38px',
                  marginLeft: '-78px',
                }}
              ></div>
              <Flex
                css={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1rem',
                  marginLeft: '-100px',
                }}
              >
                <Text
                  css={{
                    fontFamily: 'Noto Sans',
                    fontWeight: '600',
                    fontSize: '16px',
                    color: step === 2 ? '#16103A' : '#8E8DA0',
                  }}
                >
                  Set Performance Fee
                </Text>
                <Button
                  css={{
                    cursor: 'pointer',
                    fontFamily: 'Noto Sans',
                    fontWeight: '800',
                    fontSize: '36px',
                    color: step === 2 ? '#16103A' : '#8E8DA0',
                    backgroundColor: '#fff',
                    border: '2px solid #1799DE',
                    borderRadius: '72px',
                    width: '72px',
                    height: '72px',
                  }}
                  onClick={() => {
                    setStep(2)
                  }}
                >
                  2
                </Button>
              </Flex>
              <div
                style={{
                  width: '250px',
                  height: '2px',
                  backgroundColor: '#1799DE',
                  marginTop: '38px',
                  marginLeft: '-42px',
                }}
              ></div>
              <Flex
                css={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1rem',
                  marginLeft: '-100px',
                }}
              >
                <Text
                  css={{
                    fontFamily: 'Noto Sans',
                    fontWeight: '600',
                    fontSize: '16px',
                    color: step === 3 ? '#16103A' : '#8E8DA0',
                  }}
                >
                  Optional Art and Name
                </Text>
                <Button
                  css={{
                    cursor: 'pointer',
                    fontFamily: 'Noto Sans',
                    fontWeight: '800',
                    fontSize: '36px',
                    color: step === 3 ? '#16103A' : '#8E8DA0',
                    backgroundColor: '#fff',
                    border: '2px solid #1799DE',
                    borderRadius: '72px',
                    width: '72px',
                    height: '72px',
                  }}
                  onClick={() => {
                    setStep(3)
                  }}
                >
                  3
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
                      <Flex css={{ flexDirection: 'column', gap: '0.2rem' }}>
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
                            fontWeight: '600',
                            fontSize: '16px',
                            color: '#DF4886',
                          }}
                        >
                          Stake Positions
                        </Text>
                      </Flex>
                      <Flex css={{ flexDirection: 'column', gap: '0.2rem' }}>
                        <Text
                          css={{
                            fontFamily: 'Noto Sans',
                            fontWeight: '700',
                            fontSize: '25px',
                          }}
                        >
                          Weight
                        </Text>
                        <Text
                          css={{
                            fontFamily: 'Noto Sans',
                            fontWeight: '600',
                            fontSize: '16px',
                            color: '#DF4886',
                          }}
                        >
                          Percentage Allocation
                        </Text>
                      </Flex>
                    </Flex>
                    {/* Values */}
                    {positions.map((position, index) => (
                      <Flex
                        css={{
                          flexDirection: 'row',
                          margin: '0rem 1rem',
                          gap: '1rem',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        key={index}
                      >
                        <Select
                          defaultValue="Type"
                          data-index={index}
                          onChange={onTypeChange}
                          css={{
                            borderRadius: '10rem',
                            outline: 'none',
                            border: 0,
                            height: '50px',
                            paddingInlineEnd: '24px',
                            // marginInline: '5px',
                            flex: 1,
                            width: '11rem',
                            fontSize: '20px',
                            fontWeight: '600',
                            color: '#8E8DA0',
                            marginBottom: '2px',
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            marginTop: '5px',
                            paddingLeft: '10px',
                          }}
                          disabled={locked[index]}
                        >
                          <option>Tako</option>
                          <option>Option 2</option>
                          <option>Option 3</option>
                          <option>Option 4</option>
                        </Select>
                        <Input
                          defaultValue={'1.9'}
                          data-index={index}
                          onChange={onQuantityChange}
                          css={{
                            position: 'relative',
                            height: '50px',
                            borderRadius: '30px',
                            width: '14rem',
                            boxShadow: 'none',
                            border: 'none',
                            outline: 0,
                            paddingLeft: '1rem',
                            color: '#0A3F5C',
                            backgroundColor: '#fff',
                            fontSize: '24px',
                            fontWeight: '700',
                            opacity: locked[index] ? 0.5 : 1,
                          }}
                          disabled={locked[index]}
                        />

                        <Input
                          defaultValue={25}
                          data-index={index}
                          type={'number'}
                          onChange={onWeightChange}
                          css={{
                            position: 'relative',
                            height: '50px',
                            borderRadius: '30px',
                            width: '14rem',
                            boxShadow: 'none',
                            border: 'none',
                            outline: 0,
                            paddingLeft: '1rem',
                            color: '#0A3F5C',
                            backgroundColor: '#fff',
                            fontSize: '24px',
                            fontWeight: '700',
                            opacity: locked[index] ? 0.5 : 1,
                          }}
                          disabled={locked[index]}
                        />

                        {locked[index] ? (
                          <FiLock
                            style={{
                              width: '30px',
                              height: '30px',
                              cursor: 'pointer',
                            }}
                            onClick={() => {
                              var toSet = [...locked]
                              toSet[index] = false
                              setLocked(toSet)
                            }}
                          />
                        ) : (
                          <FiUnlock
                            style={{
                              width: '30px',
                              height: '30px',
                              cursor: 'pointer',
                            }}
                            onClick={() => {
                              var toSet = [...locked]
                              toSet[index] = true
                              setLocked(toSet)
                            }}
                          />
                        )}
                        <RiDeleteBinLine
                          style={{
                            width: '30px',
                            height: '30px',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            var toSet = [...positions]
                            toSet.splice(index, 1)
                            setPositions(toSet)
                          }}
                        />
                      </Flex>
                    ))}
                    <Button
                      css={{
                        margin: '0px 20px',
                        width: '14rem',
                        height: '3rem',
                        cursor: 'pointer',
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        backgroundColor: '#E5F6FF',
                        color: '#1799DE',
                        border: '2px solid #1799DE',
                        borderRadius: '30px',
                        fontFamily: 'Noto Sans',
                        fontWeight: '600',
                        fontSize: '16px',
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
                        setLocked((prevState) => [...prevState, false])
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
                      gap: '1rem',
                    }}
                  >
                    <Flex css={{ flexDirection: 'column', padding: '1rem' }}>
                      <Text
                        css={{
                          fontFamily: 'Noto Sans',
                          fontWeight: '700',
                          fontSize: '25px',
                        }}
                      >
                        Performance Fee
                      </Text>
                      <Text
                        css={{
                          fontFamily: 'Noto Sans',
                          fontWeight: '600',
                          fontSize: '16px',
                          color: '#DF4886',
                        }}
                      >
                        Creator Earnings
                      </Text>
                    </Flex>
                    <Text
                      css={{
                        fontFamily: 'Noto Sans',
                        fontWeight: '400',
                        fontSize: '16px',
                        margin: '0rem 1rem',
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
                      onChange={(event) => {
                        setPerformanceFee(Number(event.target.value))
                      }}
                      css={{
                        margin: '0rem 1rem',
                        position: 'relative',
                        height: '56px',
                        borderRadius: '30px',
                        width: '20rem',
                        boxShadow: 'none',
                        border: 'none',
                        outline: 0,
                        paddingLeft: '1rem',
                        color: '#0A3F5C',
                        backgroundColor: '#fff',
                        fontSize: '30px',
                        fontWeight: '700',
                      }}
                      maxLength={6}
                      placeholder={'15%'}
                    />
                  </Flex>
                )}
                {step === 3 && (
                  <Flex css={{ flexDirection: 'column', gap: '2rem' }}>
                    <Flex
                      css={{
                        flexDirection: 'column',
                        backgroundColor: '#E5F6FF',
                        padding: '1rem',
                        borderRadius: '6px',
                        gap: '0.5rem',
                      }}
                    >
                      <Flex css={{ flexDirection: 'column' }}>
                        <Text
                          css={{
                            fontFamily: 'Noto Sans',
                            fontWeight: '700',
                            fontSize: '25px',
                          }}
                        >
                          Upload Artwork
                        </Text>
                        <Text
                          css={{
                            fontFamily: 'Noto Sans',
                            fontWeight: '600',
                            fontSize: '16px',
                            color: '#DF4886',
                          }}
                        >
                          Associate an Illustration or File
                        </Text>
                      </Flex>
                      <Text
                        css={{
                          fontFamily: 'Noto Sans',
                          fontWeight: '400',
                          fontSize: '16px',
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
                          width: '20rem',
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
                          cursor: 'pointer',
                          backgroundColor: '#16103A',
                          color: '#fff',
                          fontSize: '16px',
                          fontWeight: '600',
                          height: '3rem',
                          borderRadius: '30px',
                          width: '15rem',
                          letterSpacing: '0.2rem',
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
                        padding: '1rem',
                        borderRadius: '6px',
                      }}
                    >
                      <Flex css={{ flexDirection: 'column' }}>
                        <Text
                          css={{
                            fontFamily: 'Noto Sans',
                            fontWeight: '700',
                            fontSize: '25px',
                          }}
                        >
                          NFT Name
                        </Text>
                        <Text
                          css={{
                            fontFamily: 'Noto Sans',
                            fontWeight: '600',
                            fontSize: '16px',
                            color: '#DF4886',
                          }}
                        >
                          Provide a name you want to give your NFT
                        </Text>
                      </Flex>

                      <Input
                        onChange={(event) => {
                          setYBNFTName(event.target.value)
                        }}
                        css={{
                          marginTop: '1rem',
                          position: 'relative',
                          height: '45px',
                          borderRadius: '30px',
                          width: '30rem',
                          boxShadow: 'none',
                          border: 'none',
                          outline: 0,
                          paddingLeft: '1rem',
                          color: '#0A3F5C',
                          backgroundColor: '#fff',
                          fontSize: '30px',
                          fontWeight: '700',
                        }}
                        placeholder={'NFT Title..'}
                      />
                    </Flex>
                  </Flex>
                )}
                {step != 3 && (
                  <Button
                    css={{
                      // margin: '1rem',
                      cursor: 'pointer',
                      backgroundColor: '#1799DE',
                      color: '#fff',
                      fontSize: '16px',
                      fontWeight: '600',
                      height: '3rem',
                      borderRadius: '30px',
                    }}
                    onClick={() => {
                      if (step != 3) setStep(step + 1)
                    }}
                  >
                    NEXT STEP
                  </Button>
                )}
                {step === 3 && (
                  <Button
                    css={{
                      // margin: '1rem',
                      cursor: 'pointer',
                      backgroundColor: '#1799DE',
                      color: '#fff',
                      fontSize: '16px',
                      fontWeight: '600',
                      height: '3rem',
                      borderRadius: '30px',
                    }}
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
                  width: '22rem',
                  height: 'max-content',
                  border: '1px solid #D8D8D8',
                  margin: '1rem',
                }}
              >
                <Flex
                  css={{
                    flexDirection: 'column',
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    padding: '2rem',
                    gap: '2rem',
                  }}
                >
                  <Text
                    css={{
                      fontWeight: '700',
                      fontFamily: 'Noto Sans',
                      fontSize: '20px',
                    }}
                  >
                    YB NFT Summary
                  </Text>
                  {/* <Image
                    src={'images/artwork-dummy.png'}
                    css={{ margin: '0.5rem' }}
                  /> */}
                  {/* Pie Chart */}
                  <div
                    style={{
                      width: '280px',
                      height: '280px',
                      backgroundColor: '#FCDB8F',
                      borderRadius: '280px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '260px',
                        height: '260px',
                        backgroundColor: '#A11D2B',
                        borderRadius: '260px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <div
                        style={{
                          width: '240px',
                          height: '240px',
                          borderRadius: '50%',
                          background: `conic-gradient(#A11D2B 0.00% ${allocated}%,#C92144 ${allocated}%)`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <Flex
                    css={{
                      flexDirection: 'column',
                      gap: '0.2rem',
                    }}
                  >
                    <Flex css={{ gap: '0.5rem' }}>
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
                    <Flex css={{ gap: '0.5rem' }}>
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
                    <Flex css={{ gap: '0.5rem' }}>
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
                    <Flex css={{ gap: '0.5rem' }}>
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

export default FinalMint
