import React from 'react'
import { Box } from 'theme-ui'
import PieChart from './PieChart'
import Legend from './Legend'

const YbNftSummaryChart = () => {
  return (
    <Box
      sx={{
        border: '1px solid #D8D8D8',
        borderRadius: 8
      }}
    >
      <Box
        sx={{
          padding: '14px 14px',
          [`@media screen and (min-width: 400px)`]: {
            padding: '24px 34px',
          }
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            color: '#16103A',
            fontSize: 16,
            fontWeight: 700,
            [`@media screen and (min-width: 400px)`]: {
              fontSize: 24,
            }
          }}
        >
          YB NFT Summary
        </Box>
        <Box
          sx={{
            marginTop: 22
          }}
        >
          <PieChart />
        </Box>
        <Box
          sx={{
            marginTop: 18
          }}
        >
          <Legend />
        </Box>
      </Box>
      <Box
        sx={{
          fontSize: 14,
          padding: '10px 14px',
          borderTop: '1px solid #D8D8D8',
          [`@media screen and (min-width: 400px)`]: {
            padding: '20px 34px',
            fontSize: 16
          }
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptas, a, suscipit delectus ipsa harum voluptatibus eius hic quae et aliquam obcaecati aliquid modi assumenda ex mollitia unde, ut porro?
      </Box>
    </Box>
  )
}

export default YbNftSummaryChart