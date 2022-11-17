describe('Login test', () => {

  it('Should sign in and be redirected to home page', () => {
    //access to the application with cy.visit
    // use env variable for code reusbaility
    cy.visit(Cypress.env('appURL'))
    // look for the link login and click it to accesss to the login page
    cy.get('[data-cy=login-button]').click()
    .then(()=>{
      // check that we are redirecetd to the login page
      cy.url().then(url=>{
        cy.url().should('contain', 'login');

     })
    })
    // select the email input and write our user-access-mail
    cy.get('[data-cy=login-email-input]').type(Cypress.env('userEmail'))
      // select the user input and write our user-access-password
    cy.get('[data-cy=login-password-input]').type(Cypress.env('userPassword'))
     // click the login form button
    cy.get('[data-cy=login-button]').click({multiple:true});
     // assert that the navbar change from login to logout
    cy.get('[data-cy=logout-link]').should('exist')
    // assert that we are redirected to the home page
    cy.url().then(url=>{
      cy.url().should('contain', 'home');
   })
  })
})
