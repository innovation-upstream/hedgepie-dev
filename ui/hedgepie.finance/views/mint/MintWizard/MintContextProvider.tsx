import React from 'react'
import MintWizardContext from 'contexts/MintWizardContext'
import { useAdapterManager } from 'hooks/useAdapterManager'

interface AdapterOption {
  icon?: string
  name?: string
  type?: string
  address?: string
}

const MintContextProvider = ({ children }) => {
  const { getAdapters } = useAdapterManager()
  const [wizard, setWizard] = React.useState({
    forms: ['Choose positions & Widgets', 'Set Performance fee', 'Optional Art & Name'],
    order: 0,
  })
  const [formData, setFormData] = React.useState({
    positions: [],
    performanceFee: 10,
    artWorkFile: null,
    artWorkUrl: '',
    nftName: '',
    allocated: 0,
  })
  const [strategies, setStrategies] = React.useState<any>([])

  React.useEffect(() => {
    const getCompositionOptions = async () => {
      try {
        const adapters = await getAdapters()
        console.log('adapter' + JSON.stringify(adapters))
        var adapterOptions = [] as AdapterOption[]
        adapters.map((adapter) => {
          console.log(adapter)
          adapterOptions.push({ icon: '', name: adapter.name, type: '', address: adapter.addr })
        })

        setStrategies(adapterOptions)
      } catch (err) {
        console.log('err' + JSON.stringify(err))
      }
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
    [wizard, formData, strategies],
  )

  return <MintWizardContext.Provider value={value}>{children}</MintWizardContext.Provider>
}

export default MintContextProvider
