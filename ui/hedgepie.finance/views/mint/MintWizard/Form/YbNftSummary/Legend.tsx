import React from 'react'
import { Box } from 'theme-ui'

const Legend = ({ percent, label }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2
      }}
    >
      <Box>
        {percent}%
      </Box>
      <Box>
        {label}
      </Box>
    </Box>
  )
}

export default Legend