describe('Connect Wallet', () => {
  beforeEach(function () {
    cy.visit('http://localhost:3000/')
  })

  it('connect wallet', () => {
    cy.get('.header').contains('Connect Wallet').click()
    cy.contains('Metamask')
    cy.contains('Wallet Connect')
    // cy.contains('Trust Wallet')
    // cy.contains('More')
  })
})
