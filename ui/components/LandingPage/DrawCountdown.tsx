import React from 'react'
import { Box, Button, Flex, Text } from 'theme-ui'

import Countdown from 'react-countdown'

type Props = { drawTime?: number }

const DrawCountdown = (props: Props) => {
  // const { drawTime } = props

  const Completionist = () => <Button>Check Result</Button>

  const renderer = ({
    hours,
    minutes,
    seconds,
    completed,
  }: {
    hours: number
    minutes: number
    seconds: number
    completed: boolean
  }) => {
    const displayString =
      hours.toString().padStart(2, '0') +
      ':' +
      minutes.toString().padStart(2, '0') +
      ':' +
      seconds.toString().padStart(2, '0')

    if (completed) {
      // Render a completed state
      return <Completionist />
    } else {
      // Render a countdown
      return (
        <Flex
          css={{
            flexDirection: 'column',
            gap: '30px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Flex css={{ gap: '1rem' }}>
            <Text
              css={{
                fontFamily: 'Noto Sans',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: '40px',
                lineHeight: '150%',
                textAlign: 'center',
                color: '#DF4886',
              }}
            >
              {displayString}
            </Text>
            <Text
              css={{
                fontFamily: 'Noto Sans',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: '40px',
                lineHeight: '150%',
                textAlign: 'center',
              }}
            >
              Until Next Draw
            </Text>
          </Flex>
          <Text
            css={{
              fontFamily: 'Noto Sans',
              fontStyle: 'normal',
              fontWeight: 'bold',
              fontSize: '16px',
              lineHeight: '10px',
              color: '#8E8DA0',
              marginLeft: '50px',
              letterSpacing: '10px',
              marginTop: '-20px',
            }}
          >
            THERE&apos;S STILL TIME
          </Text>
        </Flex>
      )
    }
  }

  return (
    <Box p={3} css={{ border: '1px solid black', paddingTop: '4rem', paddingBottom: '6rem' }}>
      <Flex css={{ alignItems: 'center', justifyContent: 'center' }}>
        <Countdown date={Date.now() + 5000000} renderer={renderer} />
      </Flex>
    </Box>
  )
}

export default DrawCountdown
