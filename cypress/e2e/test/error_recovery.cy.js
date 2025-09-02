// cypress/e2e/error_recovery.cy.js

describe('Error Recovery & Self-Healing Tests - ParaBank', () => {
  
  beforeEach(() => {
    // Visit login page before each test
    cy.visit('https://parabank.parasoft.com/parabank/index.htm', {
      failOnStatusCode: false // Prevent fail on 5xx/4xx
    });
  });

  it('should handle unexpected popup dialogs gracefully', () => {
    // Catch any unexpected alert/confirm popup
    cy.on('window:alert', (msg) => {
      cy.log(`Alert handled: ${msg}`);
    });

    cy.on('window:confirm', () => true); // auto-accept confirm dialogs

    // Try login
    cy.get('input[name="username"]').type('john');
    cy.get('input[name="password"]').type('demo');
    cy.get('input[value="Log In"]').click();

    cy.contains('Accounts Overview', { timeout: 10000 }).should('be.visible');
  });

  it('should handle session timeouts by re-login automatically', () => {
    // Function to login if redirected to login page
    const ensureLoggedIn = () => {
      cy.url().then((url) => {
        if (url.includes('login.htm')) {
          cy.log('Session expired, re-logging in...');
          cy.get('input[name="username"]').type('john');
          cy.get('input[name="password"]').type('demo');
          cy.get('input[value="Log In"]').click();
        }
      });
    };

    // First login
    ensureLoggedIn();

    // Navigate to an internal page (may trigger timeout)
    cy.visit('https://parabank.parasoft.com/parabank/overview.htm');
    ensureLoggedIn();

    cy.contains('Accounts Overview').should('be.visible');
  });

  it('should retry failed operations intelligently (network hiccups)', () => {
    // Custom command-like retry mechanism
    const submitWithRetry = (retries = 3) => {
      cy.get('input[name="username"]').clear().type('john');
      cy.get('input[name="password"]').clear().type('demo');
      cy.get('input[value="Log In"]').click();

      cy.contains('Accounts Overview', { timeout: 5000 }).then(
        () => cy.log('Login successful'),
        (err) => {
          if (retries > 0) {
            cy.log(`Retrying login... attempts left: ${retries}`);
            submitWithRetry(retries - 1);
          } else {
            throw err;
          }
        }
      );
    };

    submitWithRetry();
  });

  it('should clean up test data after failures', () => {
    // Example: Create a dummy account, then delete after test
    cy.get('input[name="username"]').type('john');
    cy.get('input[name="password"]').type('demo');
    cy.get('input[value="Log In"]').click();

    cy.contains('Open New Account').click();

    // Handle potential loading issues
    cy.get('select#type', { timeout: 10000 }).select('SAVINGS');
    cy.contains ('Open New Account').click();

    // Verify account creation or recover
    cy.contains('Account Opened!', { timeout: 10000 }).then(() => {
      cy.log('Account successfully created, cleaning up...');
      
      // Simulate cleanup (navigate back & delete if possible)
      cy.contains('Accounts Overview').click();
      // NOTE: ParaBank demo doesn’t allow deletion, but in real app:
      // cy.request('DELETE', `/api/accounts/${accountId}`);
    });
  });
});
