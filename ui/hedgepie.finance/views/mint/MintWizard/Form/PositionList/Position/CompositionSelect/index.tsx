import React, { useEffect } from 'react'
import Select from 'react-select'
import MintWizardContext from 'contexts/MintWizardContext'
import CustomOption from './CustomOption'
import CustomValue from './CustomValue'

const CompositionSelect = ({ value, onSelect }) => {
  const { strategies } = React.useContext(MintWizardContext)

  const handleSelect = (option) => {
    onSelect(option)
  }

  useEffect(() => {
    console.log('val' + JSON.stringify(value))
    console.log(onSelect)
  }, [value, onSelect])

  return (
    <Select
      instanceId={`composition-${1}`}
      classNamePrefix="select"
      name="color"
      isSearchable={false}
      options={strategies}
      placeholder=""
      value={value}
      onChange={handleSelect}
      components={{
        Option: CustomOption,
        ValueContainer: CustomValue,
      }}
      styles={{
        control: () => ({
          height: 62,
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
  )
}

export default CompositionSelect
