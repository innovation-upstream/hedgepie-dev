import React from 'react'
import MintWizardContext from 'contexts/MintWizardContext'

const MintContextProvider = ({ children }) => {

  const [wizard, setWizard] = React.useState({
    forms: [
      'Choose positions & Widgets',
      'Set Performance fee',
      'Optional Art & Name'
    ],
    order: 0
  })
  const [formData, setFormData] = React.useState({
    positions: [],
    performanceFee: 35,
    artWorkFile: null,
    artWorkUrl: '',
    nftName: '',
    allocated: 0
  })
  const [strategies, setStrategies] = React.useState<any>([])

  React.useEffect(() => {
    const getCompositionOptions = () => {
      setStrategies([
        {
          icon: '/images/token-xvs.png',
          name: 'Venus (XVS)',
          type: 'venus',
        },
        {
          icon: '/images/token-cake.png',
          name: 'Pancakeswap (Cake)',
          type: 'pancakeswap',
        },
      ])
    }
    getCompositionOptions()
  }, [])

  const value = React.useMemo(
    () => ({
      wizard,
      formData,
      strategies,
      setWizard,
      setFormData,
    }),
    [wizard, formData, strategies]
  )

  return (
    <MintWizardContext.Provider value={value}>
      {children}
    </MintWizardContext.Provider>
  )
}

export default MintContextProvider