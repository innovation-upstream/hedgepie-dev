import React from 'react'
import { Box } from 'theme-ui'
import { MintWizardContext } from '../MintContextProvider'

type Props = {
  index: number
  label: string
  active?: boolean
}

const Label = ({ index, label, active }: Props) => {

  const { wizard, setWizard } = React.useContext(MintWizardContext)

  const handleNavigate = () => {
    if (wizard.order !== index) {
      setWizard({
        ...wizard,
        order: index
      })
    }
  }

  return (
    <Box
    >
      {index > 0 &&
        <Box
          sx={{
            marginLeft: 20,
            height: 15,
            width: '1px',
            backgroundColor: '#1799DE',
          }}
        />
      }
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            border: '1px solid #1799DE',
            color: active ? '#000' : '#CCC',
            borderRadius: '50%',
            fontWeight: 900,
            userSelect: 'none',
            cursor: 'pointer',
            transition: 'all .2s',
            flexShrink: 0,
            '&:hover': {
              backgroundColor: '#1799DE11'
            },
            '&:active': {
              backgroundColor: '#1799DE33'
            },
          }}
          onClick={handleNavigate}
        >
          {index + 1}
        </Box>
        <Box
          sx={{
            marginLeft: 3,
            color: active ? '#000' : '#ccc',
            fontSize: 12,
            [`@media screen and (min-width: 400px)`]: {
              fontSize: 16,
            }
          }}
        >
          {label}
        </Box>
      </Box>
    </Box>
  )
}

export default Label