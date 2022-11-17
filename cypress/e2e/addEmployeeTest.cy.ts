describe('Login test', () => {

  it('Should Add a new employee', () => {
    // open our web app and suppose we are already connected
    // in future blogs I will explain how to defien custom commands to log in
    cy.visit(Cypress.env('appURL'))
    // Click the addd employee button
    cy.get('[data-cy=add-employee-button]').click()
    // type the employee name
    cy.get('[data-cy=employee-name]').type("testEmployee")
    // select the gender
    cy.get('select').first().should('be.visible').select('Male', {force: true})
      // type the employee department
    cy.get('[data-cy=employee-department]').type("Security")
      // type the employee city
    cy.get('select').last().should('be.visible').select('Tunis', {force: true})
      // click the save button
    cy.get('[data-cy=save-button]').click({multiple:true});
    // assert we are redirected after adding a new employee
    cy.url().then(url=>{
      cy.url().should('not.contain', 'add-employee');
   })
  })
})
