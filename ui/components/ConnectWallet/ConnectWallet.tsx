import React, { useState, useEffect, ReactNode } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

const providerOptions = {
  // walletconnect: {
  //   package: WalletConnectProvider, // required
  //   options: {
  //     infuraId: '28bcee6173ee4dfdb2ad077b026627c5', // required
  //   },
  // },
}

type Props = { children?: ReactNode; setSigner?: any }

export const ConnectWallet = (props: Props) => {
  const { children, setSigner } = props
  const [instance, setInstance] = useState<any | undefined>()
  const [provider, setProvider] = useState<any | undefined>()
  const [web3Modal, setWeb3Modal] = useState<any | undefined>()

  const getInstance = async () => {
    setInstance(await web3Modal.connect())
  }

  useEffect(() => {
    // console.log("web3Modal:" + JSON.stringify(web3Modal))
    if (web3Modal) getInstance()
  }, [web3Modal])

  const connectWallet = () => {
    console.log('sdddf')
    setWeb3Modal(
      new Web3Modal({
        network: 'mainnet', // optional
        cacheProvider: true, // optional
        providerOptions, // required
      }),
    )
  }

  // useEffect(() => {
  //   console.log("SD")
  //   setWeb3Modal(
  //     new Web3Modal({
  //       network: "mainnet", // optional
  //       cacheProvider: true, // optional
  //       providerOptions // required
  //     })
  //   )
  // }, [])

  useEffect(() => {
    if (instance) {
      setProvider(new ethers.providers.Web3Provider(instance))
    }
  }, [instance])

  useEffect(() => {
    if (provider?.getSigner) {
      setSigner && setSigner(provider.getSigner())
    }
  }, [provider])

  useEffect(() => {
    console.log('sdfsdf')
    if (provider) {
      console.log(provider.getSigner())
      // Subscribe to accounts change
      provider.on('accountsChanged', (accounts: string[]) => {
        console.log('Sdf' + accounts)
      })

      // Subscribe to chainId change
      provider.on('chainChanged', (chainId: number) => {
        console.log(chainId)
      })

      // Subscribe to provider connection
      provider.on('connect', (info: { chainId: number }) => {
        console.log('sdf' + info)
      })

      // Subscribe to provider disconnection
      provider.on('disconnect', (error: { code: number; message: string }) => {
        console.log(error)
      })
    }
  }, [provider])

  return <div onClick={connectWallet}>{children}</div>
}
