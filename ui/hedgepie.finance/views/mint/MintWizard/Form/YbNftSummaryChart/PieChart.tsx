import React from 'react'
import { Box } from 'theme-ui'
import * as d3 from 'd3'
import MintWizardContext from 'contexts/MintWizardContext'

const PieChart = () => {

  const { formData } = React.useContext(MintWizardContext)
  const rootRef = React.useRef<any>(null)

  const drawChart = () => {

    // // dimension
    // const width = rootRef.current.clientWidth
    // const radius = width / 2

    // // data
    // const allocated = Math.min(100, formData.allocated)
    // const values = [allocated, 100 - allocated]
    // const indexes = d3.range(values.length)
    // const colors = ['#C92144', '#A11D2B']

    // // arc
    // const arcs = d3.pie().padAngle(0).sort(null).value((i: any) => values[i])(indexes)
    // const arc: any = d3.arc().innerRadius(0).outerRadius(radius)

    // // svg
    // const svg = d3.select(rootRef.current)
    //   .attr('width', width)
    //   .attr('height', width)
    //   .attr('viewBox', [-width / 2, -width / 2, width, width])

    // svg.selectAll('g').remove()

    // svg.append('g')
    //   .selectAll('path')
    //   .attr('stroke-width', 0)
    //   .data(arcs)
    //   .join('path')
    //   .attr('fill', (d: any) => colors[d.data])
    //   .attr('d', arc)
  }

  React.useEffect(() => {
    window.addEventListener('resize', drawChart)
    return () => {
      window.removeEventListener('resize', drawChart)
    }
  }, [])

  React.useEffect(() => {
    drawChart()
  }, [formData.allocated])

  return (
    <Box
      sx={{
        position: 'relative',
        paddingBottom: '100%'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#FCDB8F',
          padding: 14,
          borderRadius: '50%',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: '#A11D2B',
            padding: 14,
            borderRadius: '50%',
          }}
        >
          <Box
            as="svg"
            ref={rootRef}
            sx={{
              width: '100%'
            }}
          >
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default PieChart