describe('Home page', () => {
  it('Should navigate to the account verification form', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/');

    // Find a link with an href attribute containing "account-verification" and click it
    cy.get('a[href*="account-verification"]').click();

    // The new url should include "/account-verification"
    cy.url().should('include', '/account-verification');
  });
});

describe('Account verification form', () => {
  beforeEach(() => {
    // Setup cypress server to route API responses and to change the behavior of network requests
    cy.server();
    cy.route('/api/**').as('api');
    cy.route('https://au-api.basiq.io/**').as('basiqApi');
  });

  it('Completes step 0 - SignUp', () => {
    // Start from the /account-verification page
    cy.visit('http://localhost:3000/account-verification');

    cy.get('[data-cy=current-step]').contains('1');
    cy.get('#email').should('be.visible').type('test@gmail.com');
    cy.get('button[type="submit"]').click();
    cy.wait('@api');
  });

  it('Completes step 1 - PreConsent', () => {
    cy.get('[data-cy=current-step]').contains('2');

    cy.get('[data-cy="learn-more').click();
    cy.get('h3').contains('Security you can trust');

    cy.get('[data-cy="securely-connect-my-account').click();

    cy.get('[data-cy=current-step]').contains('3');
  });

  it('Completes step 2 - InstitutionPicker', () => {});
  it('Completes step 2 - InstitutionLogin', () => {});
  it('Completes step 4 - SelectAccount');
  it('Completes step 5 - Summary');
});
