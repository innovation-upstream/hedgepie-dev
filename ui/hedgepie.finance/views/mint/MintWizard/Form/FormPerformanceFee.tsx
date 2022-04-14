import React from 'react'
import { Box, Button } from 'theme-ui'
import MintWizardContext from 'contexts/MintWizardContext'
import PerformanceFee from './PerformanceFee'
import YbNftSummaryChart from './YbNftSummaryChart'

const FormPerformanceFee = () => {

  const { wizard, setWizard } = React.useContext(MintWizardContext)

  const handleNext = () => {
    setWizard({
      ...wizard,
      order: 2
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '34px',
        marginTop: 40,
        [`@media screen and (min-width: 1200px)`]: {
          flexDirection: 'row',
        }
      }}
    >
      <Box sx={{ flex: 1 }}>
        <PerformanceFee />
        <Box mt={24}>
          <Button
            variant="primary"
            sx={{
              height: 64,
              width: '100%',
              border: '1px solid #1799DE',
              borderRadius: 40,
              padding: 0,
              cursor: 'pointer',
              transition: 'all .2s'
            }}
            onClick={handleNext}
          >
            NEXT STEP
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          maxWidth: 334,
          flexShrink: 0
        }}
      >
        <YbNftSummaryChart />
      </Box>
    </Box>
  )
}

export default FormPerformanceFee