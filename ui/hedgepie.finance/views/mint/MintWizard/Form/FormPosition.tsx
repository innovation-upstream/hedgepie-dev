import React from 'react'
import { Box, Button } from 'theme-ui'
import PositionList from './PositionList'
import YbNftSummary from './YbNftSummary'

const FormPosition = () => {

  const handleClick = () => {

  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '34px',
        marginTop: 40,
        [`@media screen and (min-width: 1200px)`]: {
          flexDirection: 'row',
        }
      }}
    >
      <Box
        sx={{
          flex: 1
        }}
      >
        <PositionList />
        <Box mt={24}>
          <Button
            variant="primary"
            sx={{
              height: 64,
              width: '100%',
              border: '1px solid #1799DE',
              borderRadius: 40,
              padding: 0,
              cursor: 'pointer',
              transition: 'all .2s'
            }}
            onClick={handleClick}
          >
            NEXT STEP
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          maxWidth: 334,
          flexShrink: 0
        }}
      >
        <YbNftSummary
          allocated={75}
          unallocated={25}
        />
      </Box>
    </Box>
  )
}

export default FormPosition