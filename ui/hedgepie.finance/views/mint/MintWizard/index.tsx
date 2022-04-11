import MintContextProvider from './MintContextProvider'
import MintWizardContainer from './MintWizardContainer'

const MintWizard = () => {
  return (
    <MintContextProvider>
      <MintWizardContainer />
    </MintContextProvider>
  )
}

export default MintWizard
