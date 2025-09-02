describe('Dynamic Account-Based Tests', () => {
  it('should create tests dynamically depending on number of accounts', () => {
    cy.login('john', 'demo'); // replace with valid test user

    // Check number of accounts in the table
    cy.get('#accountTable tr').then((rows) => {
      const accountCount = rows.length - 1; // exclude header row

      if (accountCount > 0) {
        // Create a test for each account dynamically
        for (let i = 1; i <= accountCount; i++) {
          it(`should validate account #${i}`, () => {
            cy.get(`#accountTable tr:eq(${i}) a`).click();
            cy.contains('Account Details').should('be.visible');
            cy.go('back');
          });
        }
      } else {
        // If no accounts, test account creation flow
        it('should create a new account', () => {
          cy.contains('Open New Account').click();
          cy.contains('Congratulations').should('be.visible');
        });
      }
    });
  });
});
