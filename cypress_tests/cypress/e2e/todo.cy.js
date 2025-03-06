describe('Todo List App Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '/learn.json', { statusCode: 200, body: {} }).as('stubLearn');
    cy.intercept('GET', '/api', { statusCode: 200, body: [] }).as('stubApi');
    cy.visit('https://todolist.james.am/#/'); // Open the app before each test
  });

  it('TodoList header is displayed', () => {
    cy.get('.header')
      .should('contain.text', 'To Do List')
      .and('be.visible'); // Checks if it's displayed on the screen
  });
  
  it('Double-click to Edit info is displayed', () => {
    cy.get('.info')
    .should('contain.text', 'Double-click to edit a toodo');
  });

  it('Input field has the correct placeholder', () => {
    cy.get('.new-todo') // Select the input field
    .should('have.attr', 'placeholder', "What need's to be done?");
  });

  after(() => {
    cy.clearCookies(); // Cleanup
  });

});