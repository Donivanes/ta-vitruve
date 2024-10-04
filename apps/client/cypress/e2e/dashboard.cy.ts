import { API_URL, mockAthleteData, mockAthleteInput } from '../mocks';

describe('dashboard page', () => {
  beforeEach(() => {
    cy.intercept('GET', `${API_URL}/athletes?page=1&take=10`, {
      fixture: 'athletes-page-1.json',
    }).as('athletesPage1');
    cy.visit('/dashboard');
    cy.wait('@athletesPage1');
  });

  it('should display the dashboard page and 10 users on the table', () => {
    cy.get('[data-cy=sidebar]').should('exist');
    cy.get('[data-cy=athletes-table]').should('exist');
    cy.get('[data-cy=athletes-table-row]').should('have.length', 10);
  });

  it('should paginate to page 2', () => {
    cy.intercept('GET', `${API_URL}/athletes?page=2&take=10`, {
      fixture: 'athletes-page-2.json',
    }).as('athletesPage2');
    cy.get('[data-cy=prev-page]').should('be.disabled');
    cy.get('[data-cy=next-page]').click();
    cy.wait('@athletesPage2');
    cy.get('[data-cy=athletes-table-row]').should('have.length', 10);
    cy.get('[data-cy=prev-page]').should('not.be.disabled');
  });

  it('should create a new athelete', () => {
    cy.intercept('POST', `${API_URL}/athletes`, {
      fixture: 'athlete-created.json',
    }).as('createAthlete');
    cy.get('[data-cy=create-athlete-button]').click();
    cy.get('[data-cy=create-athlete-form]').should('exist');
    cy.get('[data-cy=athlete-input-name]').type(mockAthleteInput.name);
    cy.get('[data-cy=athlete-input-age]')
      .clear()
      .type(mockAthleteInput.age.toString());
    cy.get('[data-cy=athlete-input-team]').type(mockAthleteInput.team);
    cy.get('[data-cy=athlete-submit-button]').click();
    cy.wait('@createAthlete').should(({ request, response }) => {
      expect(request.body).to.deep.equal(mockAthleteInput);
      expect(response.body).to.deep.equal(mockAthleteData);
    });
  });
});
