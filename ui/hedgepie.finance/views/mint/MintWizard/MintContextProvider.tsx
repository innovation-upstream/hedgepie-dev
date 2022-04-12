import React from 'react'
import MintWizardContext from 'contexts/MintWizardContext'

const mintWizardInitState = {
  forms: [
    'Choose positions & Widgets',
    'Set Performance fee',
    'Optional Art & Name'
  ],
  order: 0
}

const MintContextProvider = ({ children }) => {

  const [wizard, setWizard] = React.useState(mintWizardInitState)
  const [formData, setFormData] = React.useState({
    positions: []
  })
  const [compositionOptions, setCompositionOptions] = React.useState<any>([])

  React.useEffect(() => {
    const getCompositionOptions = () => {
      setCompositionOptions([
        {
          id: 1,
          symbol: 'symbol1',
          value: 1.9,
          description: '(-1,213.95 USD)'
        },
        {
          id: 2,
          symbol: 'symbol2',
          value: 1.8,
          description: '(-2,213.95 USD)'
        },
        {
          id: 3,
          symbol: 'symbol3',
          value: 1.7,
          description: '(-3,213.95 USD)'
        }
      ])
    }
    getCompositionOptions()
  }, [])

  const value = React.useMemo(
    () => ({
      wizard, setWizard,
      formData, setFormData,
      compositionOptions
    }),
    [wizard, formData, compositionOptions]
  )

  return (
    <MintWizardContext.Provider value={value}>
      {children}
    </MintWizardContext.Provider>
  )
}

export default MintContextProvider