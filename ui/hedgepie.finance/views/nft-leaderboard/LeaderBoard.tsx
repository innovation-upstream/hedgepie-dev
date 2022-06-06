import React, { useEffect, useState } from 'react'
import { Box, ThemeUICSSObject, Spinner } from 'theme-ui'
import LotterySearch from './LotterySearch'
import LotteryTable from './LotteryTable'
import LotteryLoad from './LotteryLoad'

import { useYBNFTMint } from 'hooks/useYBNFTMint'

import { styles } from './styles'
import toast from 'utils/toast'

export interface TokenInfo {
  name?: string
  imageURL?: string
  description?: string
  tokenId?: number
}

const LeaderBoard = () => {
  const [lotteries, setLotteries] = React.useState([] as TokenInfo[])
  const [searchKey, setSearchKey] = React.useState('')
  const [sortKey, setSortKey] = React.useState('')
  const { getMaxTokenId, getTokenUri } = useYBNFTMint()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLotteries([])
    const fetchLeaderboardData = async () => {
      setLoading(true)
      const maxTokenId = await getMaxTokenId()
      let tokens = [] as TokenInfo[]
      for (let i = 1; i <= maxTokenId; i++) {
        const tokenUri = await getTokenUri(i)
        // Is the link is invalid, just proceed
        if (!tokenUri.includes('.ipfs.')) {
          continue
        }
        const metadataFile = await fetch(tokenUri)
        console.log('metadataFile' + JSON.stringify(metadataFile))
        if (metadataFile == null) {
          continue
        }
        const metadata = await metadataFile.json()
        const leaderboardItem = {
          tokenId: i,
          name: metadata.name,
          imageURL: metadata.imageURL,
          description: metadata.description,
        }
        tokens.push(leaderboardItem)
        setLotteries(tokens)
        console.log('Lotteries' + i + ' ' + lotteries)
      }
      setLotteries(tokens)
      console.log('setting loading false')
      setLoading(false)
    }
    fetchLeaderboardData()
  }, [])

  const handleSearch = (key: string) => {
    setSearchKey(key)
  }

  const handleLoad = (data: any) => {
    setLotteries([...lotteries, ...data])
  }

  const handleSort = (key: string) => {
    setSortKey(key === sortKey ? '' : key)
  }

  const filtered = lotteries.filter((d) => {
    return (
      (d.description && d.description.toLowerCase().includes(searchKey.toLowerCase())) ||
      (d.name && d.name.toLowerCase().includes(searchKey.toLowerCase()))
    )
  })

  const sorted = filtered.sort((a: any, b: any) => {
    if (sortKey !== '') {
      return a[sortKey] > b[sortKey] ? 1 : -1
    }
    return 0
  })

  return (
    <Box sx={styles.leaderboard_container as ThemeUICSSObject}>
      <Box sx={styles.leaderboard_inner_container as ThemeUICSSObject}>
        <LotterySearch onSearch={handleSearch} />
        <LotteryTable data={sorted} onSort={handleSort} sortKey={sortKey} />
        {loading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem' }}>
            <Spinner />
          </Box>
        ) : (
          ''
        )}
        {/* <LotteryLoad onLoad={handleLoad} /> */}
      </Box>
    </Box>
  )
}

export default LeaderBoard
