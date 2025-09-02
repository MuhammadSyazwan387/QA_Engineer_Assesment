const viewports = [
  [1920, 1080],
  [1366, 768],
  [1280, 720]
];

describe('Cross-Browser and Viewport Tests - ParaBank', () => {
  viewports.forEach((size) => {
    it(`should login correctly on ${size[0]}x${size[1]}`, () => {
      cy.viewport(size[0], size[1]);
      cy.visit('https://parabank.parasoft.com/parabank/index.htm');

      cy.get('input[name="username"]').type('john');   // replace with valid user
      cy.get('input[name="password"]').type('demo');
      cy.get('input[value="Log In"]').click();

      cy.contains('Accounts Overview').should('be.visible');
    });
  });
});
