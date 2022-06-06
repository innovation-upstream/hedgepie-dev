import React, { useEffect, useState, useContext } from 'react'
import Select from 'react-select'
import MintWizardContext from 'contexts/MintWizardContext'
import CustomOption from './CustomOption'
import CustomValue from './CustomValue'
import { Box } from 'theme-ui'

const CompositionSelect = ({ value, onProtocolSelect, onPoolSelect }) => {
  const { strategies, formData } = useContext(MintWizardContext)
  const [protocol, setProtocol] = useState<any>({ name: 'Select Protocol..' })
  const [pool, setPool] = useState<any>({ name: 'Select Pool..' })

  const handleProtocolSelect = (option) => {
    console.log(JSON.stringify(option))
    if (option !== protocol) {
      setPool({ name: 'Select Pool..' })
    }
    setProtocol(option)
    console.log('formData' + JSON.stringify(formData))
    onProtocolSelect(option)
  }

  const handlePoolSelect = (option) => {
    console.log('pool' + option)
    setPool(option)

    console.log('formData' + JSON.stringify(formData))
    onPoolSelect(option)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
      <Select
        instanceId={`composition-${1}`}
        classNamePrefix="select"
        name="color"
        isSearchable={false}
        options={strategies}
        placeholder=""
        value={protocol ? protocol : 'Select Protocol'}
        onChange={handleProtocolSelect}
        components={{
          Option: CustomOption,
          ValueContainer: CustomValue,
        }}
        styles={{
          control: () => ({
            height: 62,
            width: 200,
            borderRadius: 62,
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            paddingRight: 16,
          }),
          indicatorSeparator: () => ({
            display: 'none',
          }),
        }}
      />
      <Box
        sx={{
          display: 'none',
          position: 'absolute',
          top: 30,
          left: 'calc(25% - 14px)',
          height: 2,
          width: 40,
          backgroundColor: '#fff',
          [`@media screen and (min-width: 900px)`]: {
            display: 'block',
          },
        }}
      />
      <Select
        instanceId={`composition-${1}`}
        classNamePrefix="select"
        name="color"
        isSearchable={false}
        options={protocol ? protocol.pools : []}
        placeholder=""
        value={pool ? pool : { name: 'Select Pool..' }}
        onChange={handlePoolSelect}
        components={{
          Option: CustomOption,
          ValueContainer: CustomValue,
        }}
        styles={{
          control: () => ({
            height: 62,
            width: 200,
            borderRadius: 62,
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            paddingRight: 16,
          }),
          indicatorSeparator: () => ({
            display: 'none',
          }),
        }}
      />
    </Box>
  )
}

export default CompositionSelect
