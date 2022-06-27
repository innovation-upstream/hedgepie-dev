import React, { useEffect, useState, useContext } from 'react'
import Select from 'react-select'
import MintWizardContext from 'contexts/MintWizardContext'
import CustomOption from './CustomOption'
import CustomValue from './CustomValue'
import { Box } from 'theme-ui'

const CompositionSelect = ({ value, onProtocolSelect, onPoolSelect }) => {
  const { strategies, formData } = useContext(MintWizardContext)
  const [availableProtocols, setAvailableProtocols] = useState<any>([])
  const [protocol, setProtocol] = useState<any>({ name: 'Protocol' })
  const [pool, setPool] = useState<any>({ name: 'Pool' })

  useEffect(() => {
    var protos = [] as any[]
    for (let key in strategies) {
      let pools = [] as any[]
      let icon = ''
      for (let p in strategies[key]) {
        if (p === 'icon') icon = strategies[key][p]
        else pools.push({ name: p, address: strategies[key][p] })
      }
      protos.push({ name: key, pools: pools, icon: icon })
    }
    setAvailableProtocols(protos)
  }, [strategies])

  const handleProtocolSelect = (option) => {
    console.log(JSON.stringify(option))
    if (option !== protocol) {
      setPool({ name: 'Pool' })
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
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.6rem', marginRight: '3rem' }}>
      <Select
        instanceId={`composition-${1}`}
        classNamePrefix="select"
        name="color"
        isSearchable={false}
        options={availableProtocols}
        placeholder=""
        value={value.composition ? value.composition : 'Select Protocol'}
        onChange={handleProtocolSelect}
        components={{
          Option: CustomOption,
          ValueContainer: CustomValue,
        }}
        styles={{
          control: () => ({
            height: 60,
            width: 212,
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
      {/* <Box
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
      /> */}
      <Select
        instanceId={`composition-${1}`}
        classNamePrefix="select"
        name="color"
        isSearchable={false}
        options={protocol ? protocol.pools : []}
        placeholder=""
        value={value.pool ? value.pool : { name: 'Pool' }}
        onChange={handlePoolSelect}
        components={{
          Option: CustomOption,
          ValueContainer: CustomValue,
        }}
        styles={{
          control: () => ({
            height: 60,
            width: 140,
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
