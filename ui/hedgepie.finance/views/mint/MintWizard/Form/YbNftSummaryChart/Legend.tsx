import React from 'react'
import { Box } from 'theme-ui'
import MintWizardContext from 'contexts/MintWizardContext'

const Legend = () => {

  const { formData } = React.useContext(MintWizardContext)
  const [data, setData] = React.useState<any>([])

  React.useEffect(() => {
    const allocated = Math.min(100, formData.allocated)
    let legendData = [
      {
        title: `${allocated}%`,
        status: 'Allocated'
      }
    ]
    if (allocated > 0 && allocated < 100) {
      legendData.push({
        title: `${100 - allocated}%`,
        status: 'Unallocated'
      })
    }
    setData(legendData)
  }, [formData.allocated])

  return (
    <Box as="table">
      <Box as="tbody">
        {data.map(d =>
          <Box as="tr" key={d.status}>
            <Box
              as="td"
              sx={{
                paddingRight: 12,
                color: '#0A3F5C',
                fontSize: 14,
                fontWeight: 700,
                [`@media screen and (min-width: 400px)`]: {
                  paddingRight: 24,
                  fontSize: 20,
                }
              }}
            >
              {d.title}
            </Box>
            <Box
              as="td"
              sx={{
                color: '#DF4886',
                fontSize: 14,
                fontWeight: 700,
                [`@media screen and (min-width: 400px)`]: {
                  fontSize: 20,
                }
              }}
            >
              {d.status}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Legend