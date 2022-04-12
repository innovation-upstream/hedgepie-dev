import React from 'react'
import { Box, Button, Image, ThemeUICSSObject } from 'theme-ui'
import { ChevronDown } from 'react-feather'

import { styles } from './styles'

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const LotteryTable = ({ data, onSort, sortKey }: any) => {
  const handleSort = (sortType: string) => {
    onSort(sortType)
  }

  return (
    <Box sx={styles.lottery_table as ThemeUICSSObject}>
      <table
        style={{
          width: '100%',
          borderSpacing: 0,
        }}
      >
        <thead>
          <tr>
            <th style={{ width: 100 }}>HedgePies</th>
            <th>
              <Box sx={styles.lottery_table_sortable as ThemeUICSSObject} onClick={() => handleSort('tvl')}>
                <Box
                  sx={{
                    fontWeight: sortKey === 'tvl' ? 500 : 400,
                  }}
                >
                  TVL
                </Box>
                <ChevronDown size={16} />
              </Box>
            </th>
            <th>TOTAL STAKED</th>
            <th># OF PARTICIPANTS</th>
            <th>DAILY</th>
            <th>
              <Box sx={styles.lottery_table_sortable as ThemeUICSSObject} onClick={() => handleSort('apy')}>
                <Box
                  sx={{
                    fontWeight: sortKey === 'apy' ? 500 : 400,
                  }}
                >
                  APY
                </Box>
                <ChevronDown size={16} />
              </Box>
            </th>
            <th>
              <Box sx={styles.lottery_table_sortable as ThemeUICSSObject} onClick={() => handleSort('profit')}>
                <Box
                  sx={{
                    fontWeight: sortKey === 'profit' ? 500 : 400,
                  }}
                >
                  TOTAL PROFIT
                </Box>
                <ChevronDown size={16} />
              </Box>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((d: any) => (
            <tr key={d.address}>
              <td>
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                  <Image src={d.pie} sx={{ width: 60 }} />
                </Box>
              </td>
              <td>
                <Box sx={{ color: '#DF4886' }}>${numberWithCommas(d.tvl)}</Box>
              </td>
              <td>{numberWithCommas(d.staked)} TAKO</td>
              <td>{numberWithCommas(d.participants)}</td>
              <td>
                <Box sx={{ color: '#EFA906' }}>{d.daily}%</Box>
              </td>
              <td>{d.apy}%</td>
              <td>${numberWithCommas(d.profit)}</td>
              <td>
                <Button variant="info" sx={styles.lottery_table_details_btn as ThemeUICSSObject}>
                  DETAILS
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  )
}

export default LotteryTable
