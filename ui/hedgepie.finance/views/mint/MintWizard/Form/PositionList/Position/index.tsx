import React from 'react'
import { Box, Image, Button, Input, ThemeUICSSObject } from 'theme-ui'
import CompositionSelect from './CompositionSelect'

const Position = ({ data, onUpdate, onDelete, onLock, allocated }) => {
  const handleSelect = (composition) => {
    onUpdate({
      ...data,
      composition,
    })
  }

  const handleChangeWeight = (e) => {
    let newValue = parseInt(e.target.value, 10) || 0
    if (newValue < 100) {
      onUpdate({
        ...data,
        weight: newValue.toString(),
      })
    }
  }

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
          gap: 24,
        },
      }}
    >
      <Box sx={{ flex: '1 1 0' }}>
        <CompositionSelect value={data.composition} onSelect={handleSelect} />
      </Box>
      <Box
        sx={{
          flex: '1 1 0',
        }}
      >
        <Box
          sx={{
            height: 62,
            borderRadius: 62,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fff',
            paddingLeft: 16,
            paddingRight: 16,
            [`@media screen and (min-width: 900px)`]: {
              paddingLeft: 32,
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
            {data.locked ? (
              <Box
                sx={{
                  width: 50,
                  height: 44,
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
                  width: 50,
                }}
                type="number"
                min={0}
                max={99}
                value={data.weight}
                onChange={handleChangeWeight}
              />
            )}

            <Box sx={{ height: 44 }}>%</Box>
          </Box>
          <Button
            sx={{
              width: 44,
              height: 26,
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
      <Box
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
      />
    </Box>
  )
}

export default Position
