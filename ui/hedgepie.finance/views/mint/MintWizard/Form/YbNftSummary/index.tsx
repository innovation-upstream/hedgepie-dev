import React from 'react'
import { Box } from 'theme-ui'
import * as d3 from 'd3'
import Legend from './Legend'

const YbNftSummary = ({ allocated, unallocated }) => {
  return (
    <Box
      sx={{
        border: '1px solid #D8D8D8',
        borderRadius: 8
      }}
    >
      <Box
        sx={{
          padding: '24px 34px'
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            color: '#16103A',
            fontSize: 24
          }}
        >
          YB NFT Summary
        </Box>
        <Box
          sx={{
            marginTop: 22
          }}
        >
          Chart
        </Box>
        <Box
          sx={{
            marginTop: 18
          }}
        >
          {(allocated === 100 || allocated === 0) ?
            <Legend
              percent={allocated}
              label="Allocated"
            />
            :
            <>
              <Legend
                percent={allocated}
                label="Allocated"
              />
              <Legend
                percent={unallocated}
                label="Unallocated"
              />
            </>
          }
        </Box>
      </Box>
      <Box
        sx={{
          padding: '20px 34px'
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptas, a, suscipit delectus ipsa harum voluptatibus eius hic quae et aliquam obcaecati aliquid modi assumenda ex mollitia unde, ut porro?
      </Box>
    </Box>
  )
}

export default YbNftSummary