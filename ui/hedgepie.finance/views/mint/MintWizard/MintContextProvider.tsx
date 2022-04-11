import React from 'react'

export const mintWizardInitState = {
  forms: [
    'Choose positions & Widgets',
    'Set Performance fee',
    'Optional Art & Name'
  ],
  order: 0,
  data: {},
}

export const MintWizardContext = React.createContext<any>(mintWizardInitState)

const MintContextProvider = ({ children }) => {

  const [wizard, setWizard] = React.useState(mintWizardInitState)

  const value = React.useMemo(
    () => ({ wizard, setWizard }),
    [wizard]
  )

  return (
    <MintWizardContext.Provider value={value}>
      {children}
    </MintWizardContext.Provider>
  )
}

export default MintContextProvider