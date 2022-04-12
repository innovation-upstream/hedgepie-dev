import React from 'react'
import { Box, Image, Button } from 'theme-ui'
import CompositionSelect from './CompositionSelect'

const Position = ({ data, onUpdate, onDelete }) => {

  const handleSelect = (option) => {
    onUpdate(option)
    // onChangePoolIdx(option.value)
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
        }
      }}
    >
      <Box sx={{ flex: '1 1 0' }}>
        <CompositionSelect
          value={data.composition}
          onSelect={handleSelect}
        />
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
            }
          }}
        >
          <Box
            sx={{
              flex: 1,
              fontSize: 20,
              fontWeight: 700,
              color: '#0A3F5C',
              [`@media screen and (min-width: 500px)`]: {
                fontSize: 30,
              }
            }}
          >
            {data.weight}%
          </Box>
          <Button variant="icon">
            <Image src="/images/icon-trash.png" />
          </Button>
          <Button
            variant="icon"
            onClick={onDelete}
          >
            <Image src="/images/icon-lock.png" />
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
            display: 'block'
          }
        }}
      />
    </Box >
  )
}

export default Position;