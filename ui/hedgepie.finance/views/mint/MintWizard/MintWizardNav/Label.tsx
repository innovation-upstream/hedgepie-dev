import React from 'react'
import { Box } from 'theme-ui'
import MintWizardContext from 'contexts/MintWizardContext'

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
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 50
      }}
    >
      {index > 0 &&
        <Box
          sx={{
            height: '1px',
            width: 160,
            backgroundColor: '#1799DE',
          }}
        />
      }
      <Box
        sx={{
          position: 'relative'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 74,
            height: 74,
            border: '1px solid #1799DE',
            color: active ? '#000' : '#CCC',
            borderRadius: '50%',
            fontSize: 36,
            fontWeight: 900,
            userSelect: 'none',
            cursor: 'pointer',
            transition: 'all .2s',
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
            position: 'absolute',
            top: -50,
            left: 30,
            display: 'flex',
            justifyContent: 'center',
            width: 0,
            whiteSpace: 'nowrap',
            color: active ? '#000' : '#ccc'
          }}
        >
          {label}
        </Box>
      </Box>
    </Box>
  )
}

export default Label