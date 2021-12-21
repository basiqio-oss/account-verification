import fixtures from '../fixtures/example.json';

describe('Index page', () => {
  it('Should navigate to the account verification form', () => {
    cy.visit('http://localhost:3000/');
    cy.get('a[href*="account-verification"]').click();
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
    cy.wait('@api');
  });

  it('Completes step 2 - InstitutionPicker', () => {
    cy.get('[data-cy=current-step]').contains('3');
    cy.get(`[data-cy=${fixtures.institutionId}]`).click();
  });

  it('Completes step 2 - InstitutionLogin', () => {
    cy.get('[data-cy=current-step]').contains('4');
    cy.get('#loginId').should('be.visible').type(fixtures.loginId);
    cy.get('#password').should('be.visible').type(fixtures.password);
    cy.get('button[type="submit"]').click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);

    cy.get('[data-cy=continue]').click();
    cy.wait('@api');
  });

  it('Completes step 4 - SelectAccount', () => {
    cy.get('[data-cy=current-step]').contains('5');
    cy.get(`[data-cy="${fixtures.accountNumber}"]`).click();
    cy.get('button[type="submit"]').click();
  });

  it('Completes step 5 - Summary', () => {
    cy.get('h1').contains("You're all set!");

    cy.get('[data-cy="done"]').click();

    cy.url().should('eql', 'http://localhost:3000/');

    cy.get('[data-cy="view-verified-account"]').should('be.visible');
  });
});
