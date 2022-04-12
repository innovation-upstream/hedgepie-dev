import React from 'react'
import { Box } from 'theme-ui'
import Label from './Label'
import MintWizardContext from 'contexts/MintWizardContext'

const MintWizardNav = ({ ...props }) => {

  const { wizard } = React.useContext(MintWizardContext)

  return (
    <Box py={40} {...props}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {wizard.forms.map((d, i) =>
          <Label
            key={d}
            index={i}
            label={d}
            active={wizard.order === i}
          />
        )}
      </Box>
    </Box>
  )
}

export default MintWizardNav