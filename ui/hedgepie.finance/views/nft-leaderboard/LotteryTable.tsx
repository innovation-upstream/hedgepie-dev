import React from 'react'
import { Box, Button, Image, ThemeUICSSObject } from 'theme-ui'
import { ChevronDown } from 'react-feather'

import { styles } from './styles'
import { TokenInfo } from './LeaderBoard'
import { useRouter } from 'next/router'

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const LotteryTable = ({ data, onSort, sortKey }: any) => {
  const router = useRouter()
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
            <th style={{ width: 100 }}>Name</th>
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
          {data.map((d: TokenInfo) => (
            <tr key={d.tokenId}>
              <td>
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                  <Image src={d.imageURL} sx={{ width: 60 }} />
                </Box>
              </td>
              <td>
                <Box sx={{ color: '#DF4886' }}>{d.name}</Box>
              </td>
              <td>
                {/* <Box sx={{ color: '#DF4886' }}>$numberWithCommas(d.tvl)</Box> */}
                <Box sx={{ color: '#DF4886' }}>{'$100,000 USD'}</Box>
              </td>
              {/* <td>{numberWithCommas(d.staked)} TAKO</td> */}
              {/* <td>{numberWithCommas(d.participants)}</td> */}
              <td>{'$100,000 BNB'}</td>
              <td>{'24'}</td>
              <td>
                {/* <Box sx={{ color: '#EFA906' }}>d.daily%</Box> */}
                <Box sx={{ color: '#EFA906' }}>10%</Box>
              </td>
              {/* <td>d.apy%</td> */}
              <td>112%</td>
              {/* <td>$numberWithCommas(d.profit)</td> */}
              <td>$430,000 USD</td>
              <td>
                <Button
                  variant="info"
                  sx={styles.lottery_table_details_btn as ThemeUICSSObject}
                  onClick={() => router.push('/view-contents?tokenId=' + d.tokenId)}
                >
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
