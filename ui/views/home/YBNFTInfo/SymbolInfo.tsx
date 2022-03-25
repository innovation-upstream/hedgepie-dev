import React from 'react'
import { Box, Flex, Image } from 'theme-ui'

const StrategyComposition = ({ symbolSrc, title, description, ...props }) => {
  return (
    <Box
      sx={{
        width: 220,
        height: 112,
        backgroundColor: '#E5F6FF',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      {...props}
    >
      <Box
        sx={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          overflow: 'hidden'
        }}
      >
        <Image
          src={symbolSrc}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />
      </Box>
      <Box ml={2}>
        <Box
          sx={{
            color: '#0A3F5C',
            fontWeight: 900,
            fontSize: 30
          }}
        >
          {title}
        </Box>
        <Box
          sx={{
            color: '#8E8DA0',
            fontWeight: 700
          }}
        >
          {description}
        </Box>
      </Box>
    </Box>
  )
}

export default StrategyComposition