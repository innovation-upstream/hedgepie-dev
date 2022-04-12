import React from 'react'
import { Box, Image } from 'theme-ui'

const CustomOption = ({ data, setValue }) => {

  return (
    <Box
      sx={{
        height: 40,
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#eee'
        }
      }}
      onClick={() => setValue(data)}
    >
      <Image
        src={`/images/${data.symbol}.png`}
        sx={{
          width: 30,
          height: 30
        }}
      />
      <Box
        sx={{
          ml: 2,
          color: '#0A3F5C',
          fontWeight: 700
        }}
      >
        {data.value}
      </Box>
      <Box
        sx={{
          ml: 2,
          color: '#8E8DA0',
          fontSize: 12
        }}
      >
        {data.description}
      </Box>
    </Box>
  )
}

export default CustomOption