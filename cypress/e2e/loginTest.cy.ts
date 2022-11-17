describe('Login test', () => {

  it('Should sign in and redirected to home page', () => {
    cy.visit(Cypress.env('appURL'))
    cy.get('[data-cy=login-button]').click()
    .then(()=>{
      cy.url().then(url=>{
        cy.url().should('contain', 'login');

     })
    })
    cy.get('[data-cy=login-email-input]').type(Cypress.env('userEmail'))
    cy.get('[data-cy=login-password-input]').type(Cypress.env('userPassword'))
    cy.get('[data-cy=login-button]').click({multiple:true});
    cy.get('[data-cy=logout-link]').should('exist')
    cy.url().then(url=>{
      cy.url().should('contain', 'home');
   })
  })
})
