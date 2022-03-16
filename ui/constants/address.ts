interface IAddresses {
  [key: number]: { [key: string]: string }
}

export const addresses: IAddresses = {
  56: {
    // mainnet
  },
  97: {
    // testnet
    YBNFT_ADDRESS: '',
    VAULT_ADDRESS: '0xF6c1Ea7Ee990D1Ecdec051652F88b5c6cB7a4EfD',
    MOCLUP_ADDRESS: '0xb71C87Ec8d132Cb6aCe4977fDdF07aad98F73d78',
  },
  31337: {
    // Ganache
    YBNFT_ADDRESS: '0x2CE2C1357d1c0452a4dD7a8761309d053dfF23B7',
    LOTTERY_ADDRESS: '0x968D5dEdaCe1fbEe27CFc37f9Cb78de63532Fa04',
    TOKEN_ADDRESS: '0x95bD6e8D48702335582777E2e5270E85A907D657',
  },
}
