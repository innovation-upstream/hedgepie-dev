describe('Vault Page', () => {
  beforeEach(function () {
    cy.visit('http://localhost:3000/vault')
  })

  it('can find title - "Farms"', () => {
    cy.contains('Farms')
  })

  it('stake/withdraw switch', () => {
    cy.contains('Stake').click()
    cy.contains('Harvest')
    cy.contains('Compound')

    cy.contains('Withdraw').click()
    cy.contains('Harvest').should('not.exist')
    cy.contains('Compound').should('not.exist')
  })

  it('wallet connect', () => {
    cy.get('.desktop-action').contains('button', 'Connect Wallet').click()
    cy.contains('Metamask')
    cy.contains('Wallet Connect')
    // cy.contains('Trust Wallet')
    // cy.contains('More')
  })
})
