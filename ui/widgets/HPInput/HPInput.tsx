/** @jsx jsx */
/** @jsxRuntime classic */

import { ThemeProvider, jsx, Box, Label, Input } from 'theme-ui'

import { theme } from 'themes/theme'

type Props = { label: string; placeholder?: string }

const HPInput = (props: Props) => {
  const { label, placeholder } = props
  return (
    <ThemeProvider theme={theme}>
      <Box
        css={{
          position: 'relative',
          width: '100%',
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
            padding: '0px 20px',
            lineHeight: '48px',
            fontSize: '18px',
            top: -4,
            fontWeight: '700',
            color: '#16103A',
            opacity: '0.8',
          }}
        >
          {label}
        </Label>
        <Input
          css={{
            position: 'relative',
            height: '56px',
            borderRadius: '30px',
            minWidth: '30rem',
            boxShadow: 'none',
            border: 'none',
            outline: 0,
            fontSize: '16px',
            paddingRight: '1rem',
            textAlign: 'right',
            fontWeight: '600',
            color: '#8E8DA0',
          }}
          maxLength={6}
          placeholder={placeholder}
        />
      </Box>
    </ThemeProvider>
  )
}

export default HPInput
