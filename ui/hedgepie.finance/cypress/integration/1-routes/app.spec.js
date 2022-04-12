describe('Navigation to Mint Page', () => {
  it('should navigate to the mint page', () => {
    cy.visit('http://localhost:3000/mint')
    cy.url().should('include', '/mint')
  })
})

describe('Navigation to Vault Page', () => {
  it('should navigate to the vault page', () => {
    cy.visit('http://localhost:3000/vault')
    cy.url().should('include', '/vault')
  })
})

describe('Navigation to NFT Leaderboard Page', () => {
  it('should navigate to the nft leaderboard page', () => {
    cy.visit('http://localhost:3000/nft-leaderboard')
    cy.url().should('include', '/nft-leaderboard')
  })
})
