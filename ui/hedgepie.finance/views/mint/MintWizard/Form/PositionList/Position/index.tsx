import MintWizardContext from 'contexts/MintWizardContext'
import React, { useEffect, useContext, useState } from 'react'
import { Box, Image, Button, Input, ThemeUICSSObject, Text } from 'theme-ui'
import CompositionSelect from './CompositionSelect'

const Position = ({ data, onUpdate, onDelete, onLock, allocated }) => {
  const { formData } = useContext(MintWizardContext)
  const [bnbValue, setBNBValue] = useState<any>()
  // const [usdValue, setUSDValue] = useState<any>()

  const handleProtocolSelect = (composition) => {
    onUpdate({
      ...data,
      composition,
    })
  }

  const handlePoolSelect = (pool) => {
    onUpdate({
      ...data,
      pool,
    })
  }

  const handleChangeWeight = (e) => {
    let newValue = parseInt(e.target.value, 10) || 0
    if (newValue <= 100) {
      onUpdate({
        ...data,
        weight: newValue.toString(),
      })
    }
  }

  useEffect(() => {
    console.log(data)
    let value = (data.weight * formData.initialStake) / 100
    value > 0 && setBNBValue(value.toFixed(3))
    value == 0 && setBNBValue('')
  }, [data])

  // useEffect(() => {
  //   console.log('bnbValue' + bnbValue)
  //   bnbValue && setUSDValue((Number(bnbValue) * bnbPrice).toString())
  // }, [bnbValue])

  const handleLock = () => {
    onLock()
  }

  const onMaxClick = () => {
    const otherWeights = allocated - data.weight
    const newValue = 100 - otherWeights
    onUpdate({ ...data, weight: newValue.toString() })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        position: 'relative',
        [`@media screen and (min-width: 900px)`]: {
          flexDirection: 'row',
          gap: 0,
        },
      }}
    >
      <Box sx={{ flex: '1 1 0' }}>
        <CompositionSelect value={data} onProtocolSelect={handleProtocolSelect} onPoolSelect={handlePoolSelect} />
      </Box>
      <Box
        sx={{
          flex: '1 1 0',
        }}
      >
        <Box
          sx={{
            height: 62,
            width: 'max-content',
            borderRadius: 62,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fff',
            // paddingLeft: 16,
            marginLeft: 15,
            paddingRight: 16,
            [`@media screen and (min-width: 900px)`]: {
              paddingLeft: 10,
            },
          }}
        >
          <Box
            as="label"
            sx={{
              flex: 1,
              fontSize: 20,
              fontWeight: 700,
              color: data.locked ? '#ccc' : '#0A3F5C',
              display: 'flex',
              alignItems: 'center',
              userSelect: 'none',
              [`@media screen and (min-width: 500px)`]: {
                fontSize: 30,
              },
            }}
          >
            <Box sx={{ width: 150 }}>
              <Box sx={{ display: 'flex' }}>
                {data.locked ? (
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      textAlign: 'right',
                      pr: 2,
                      fontWeight: 500,
                    }}
                  >
                    {data.weight}
                  </Box>
                ) : (
                  <Input
                    className="weight-input"
                    sx={{
                      border: 'none',
                      outline: 'none',
                      padding: 0,
                      textAlign: 'right',
                      pr: 2,
                      width: 65,
                    }}
                    type="number"
                    min={0}
                    max={100}
                    value={data.weight}
                    onChange={handleChangeWeight}
                  />
                )}
                <Box sx={{ height: 44 }}>%</Box>
              </Box>
              {bnbValue ? (
                <Box
                  sx={{
                    marginLeft: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignContent: 'center',
                    gap: '0.3rem',
                  }}
                >
                  <Text sx={{ fontSize: 15, fontWeight: 400 }}>{bnbValue ? bnbValue + ' BNB' : ''}</Text>
                  {/* <Text sx={{ fontSize: 14, fontWeight: 400 }}>{usdValue ? usdValue : ''}</Text> */}
                </Box>
              ) : (
                <Box
                  sx={{
                    marginLeft: 20,
                    height: 15,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignContent: 'center',
                    gap: '0.3rem',
                  }}
                ></Box>
              )}
            </Box>
          </Box>
          <Button
            sx={{
              width: 40,
              height: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(160, 160, 160, 0.32)',
              borderRadius: '4px',
              color: '#8E8DA0',
              flexShrink: 0,
              margin: '0 8px 0 32px',
              [`@media screen and (min-width: 600px)`]: {
                margin: '0 8px',
              },
              ':hover': {
                cursor: 'pointer',
                backgroundColor: '#ccc',
              },
            }}
            onClick={onMaxClick}
          >
            MAX
          </Button>
          <Button variant="icon" className="position-lock" onClick={handleLock}>
            <Image src="/images/icon-lock.png" />
          </Button>
          <Button variant="icon" className="position-delete" onClick={onDelete}>
            <Image src="/images/icon-trash.png" />
          </Button>
        </Box>
      </Box>
      {/* <Box
        sx={{
          display: 'none',
          position: 'absolute',
          top: 30,
          left: 'calc(50% - 12px)',
          height: 2,
          width: 24,
          backgroundColor: '#fff',
          [`@media screen and (min-width: 900px)`]: {
            display: 'block',
          },
        }}
      /> */}
    </Box>
  )
}

export default Position
