/** @jsx jsx */
/** @jsxRuntime classic */

import { ThemeProvider, jsx, Flex, Image, Select, Box, Label } from 'theme-ui'

import { theme } from 'themes/theme'

type Props = {}

const HPInstrumentSelect = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Flex p={2} css={{ gap: '1rem', width: '100%' }}>
        <Image src="./images/tako.svg" css={{ width: '70px' }} />
        <Box
          css={{
            position: 'relative',
            width: '100%',
            height: '60px',
            overflow: 'hidden',
            marginBottom: '10px',
            backgroundColor: '#fff',
            borderRadius: '31px',
          }}
        >
          <Label
            css={{
              position: 'absolute',
              marginTop: 6,
              width: '2rem',
              padding: '0px 20px',
              lineHeight: '48px',
              fontSize: '18px',
              top: -4,
              fontWeight: '700',
              color: '#16103A',
              opacity: '0.8',
            }}
          >
            INSTRUMENT
          </Label>

          <Select
            css={{
              borderRadius: '10rem',
              outline: 'none',
              border: 0,
              minHeight: '3rem',
              textAlign: 'right',
              paddingInlineEnd: '24px',
              marginInline: '5px',
              flex: 1,
              width: '24rem',
              fontSize: '16px',
              fontWeight: '600',
              color: '#8E8DA0',
              marginBottom: '2px',
              appearance: 'none',
              WebkitAppearance: 'none',
              marginTop: '2px',
            }}
            mb={3}
          >
            <option>TakoDefi</option>
            <option>Lorum</option>
            <option>Instrument 3</option>
            <option>Instrument 4</option>
          </Select>
        </Box>
      </Flex>
    </ThemeProvider>
  )
}

export default HPInstrumentSelect
