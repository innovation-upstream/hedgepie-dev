import React from 'react'
import Select from 'react-select'
import MintWizardContext from 'contexts/MintWizardContext'
import CustomOption from './CustomOption'
import CustomValue from './CustomValue'

const CompositionSelect = ({ value, onSelect }) => {

  const { compositionOptions } = React.useContext(MintWizardContext)

  const handleSelect = (option) => {
    onSelect(option)
  }

  return (
    <Select
      instanceId={`composition-${1}`}
      classNamePrefix="select"
      name="color"
      isSearchable={false}
      options={compositionOptions}
      placeholder=""
      value={value}
      onChange={handleSelect}
      components={{
        Option: CustomOption,
        ValueContainer: CustomValue
      }}
      styles={{
        control: () => ({
          height: 62,
          borderRadius: 62,
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          paddingRight: 16
        }),
        indicatorSeparator: () => ({
          display: 'none'
        })
      }}
    />
  )
}

export default CompositionSelect