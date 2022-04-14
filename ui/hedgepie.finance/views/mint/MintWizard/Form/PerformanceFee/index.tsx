import React from 'react'
import { Box, Input } from 'theme-ui'
import MintWizardContext from 'contexts/MintWizardContext'

const PerformanceFee = () => {

  const { formData, setFormData } = React.useContext(MintWizardContext)

  const handleChange = (e) => {
    if (e.target.value === '' || (parseInt(e.target.value) > 0 && parseInt(e.target.value) < 100)) {
      setFormData({
        ...formData,
        performanceFee: parseInt(e.target.value)
      })
    }
  }

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: '#E5F6FF',
        borderRadius: 8,
        [`@media screen and (min-width: 500px)`]: {
          padding: 24,
        }
      }}
    >
      <Box
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: '#16103A',
          [`@media screen and (min-width: 500px)`]: {
            fontSize: 24,
          }
        }}
      >
        Performance Fee
      </Box>
      <Box
        sx={{
          fontSize: 12,
          fontWeight: 500,
          color: '#DF4886',
          [`@media screen and (min-width: 500px)`]: {
            fontSize: 16
          }
        }}
      >
        Creator earnings
      </Box>
      <Box
        sx={{
          fontSize: 12,
          mt: 22,
          color: '#8E8DA0',
          [`@media screen and (min-width: 500px)`]: {
            fontSize: 16
          }
        }}
      >
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
      </Box>
      <Box mt={36}>
        <Box
          sx={{
            width: '100%',
            maxWidth: 120,
            height: 62,
            paddingLeft: 24,
            paddingRight: 24,
            color: '#0A3F5C',
            fontSize: 30,
            fontWeight: 700,
            backgroundColor: '#fff',
            borderRadius: 62,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Input
            sx={{
              border: 'none',
              outline: 'none',
              padding: 0,
              textAlign: 'right',
              pr: 2
            }}
            type="number"
            min={1}
            max={99}
            value={formData.performanceFee}
            onChange={handleChange}
          />
          %
        </Box>
      </Box>
    </Box>
  )
}

export default PerformanceFee