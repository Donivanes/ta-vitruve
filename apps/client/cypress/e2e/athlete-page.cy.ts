import {
  API_URL,
  mockAthleteData,
  mockAthleteMetricInput,
  mocktAthleteMetric,
  mockUpdatedAthlete,
  mockUpdateInput,
} from '../mocks';

describe('athlete page', () => {
  beforeEach(() => {
    cy.intercept('GET', `${API_URL}/athletes/${mockAthleteData.id}`, {
      fixture: 'athlete-created.json',
    }).as('athleteCreated');
    cy.intercept('GET', `${API_URL}/athletes/${mockAthleteData.id}/metrics`, {
      fixture: 'athlete-metrics.json',
    }).as('athleteMetrics');
    cy.visit(`athlete/${mockAthleteData.id}`);
    cy.wait('@athleteCreated');
    cy.wait('@athleteMetrics');
  });

  it('should edit an athelete', () => {
    cy.intercept('PATCH', `${API_URL}/athletes/${mockAthleteData.id}`, {
      fixture: 'athlete-updated.json',
    }).as('athleteUpdated');
    cy.get('[data-cy=edit-athlete-button]').click({ force: true });
    cy.get('[data-cy=edit-athlete-form]').should('exist');
    cy.get('[data-cy=athlete-input-name]').clear().type(mockUpdateInput.name);
    cy.get('[data-cy=athlete-input-age]')
      .clear()
      .type(mockUpdateInput.age.toString());
    cy.get('[data-cy=athlete-input-team]').clear().type(mockUpdateInput.team);
    cy.get('[data-cy=athlete-submit-button]').click();
    cy.wait('@athleteUpdated').should(({ request, response }) => {
      expect(request.body).to.deep.equal(mockUpdateInput);
      expect(response.body).to.deep.equal(mockUpdatedAthlete);
    });
  });

  it('should delete an athlete', () => {
    cy.intercept('DELETE', `${API_URL}/athletes/${mockAthleteData.id}`, {
      fixture: 'athlete-delete.json',
    }).as('deleteAthlete');
    cy.get('[data-cy=delete-athlete-button]').click({ force: true });
    cy.get('[data-cy=delete-confirmation]').should('exist');
    cy.get('[data-cy=delete-athlete-confirmation-button]').click();
    cy.wait('@deleteAthlete').should(({ response }) => {
      expect(response.body).to.deep.equal({
        message:
          'Athlete and associated performance metrics deleted successfully',
      });
    });
    cy.url().should('include', '/dashboard');
  });

  it('should create athlete metric', () => {
    cy.intercept('POST', `${API_URL}/athletes/${mockAthleteData.id}/metrics`, {
      fixture: 'athlete-metric-created.json',
    }).as('createAthleteMetric');
    cy.get('[data-cy=add-metric-button]').click({ force: true });
    cy.get('[data-cy=performance-metric-create-form]').should('exist');
    cy.get('[data-cy=performance-metric-input-metricType]').select('SPEED');
    cy.get('[data-cy=performance-metric-input-value]').type('10');
    cy.get('[data-cy=performance-metric-input-unit]').select(
      'KILOMETERS_PER_HOUR'
    );
    cy.get('[data-cy=performance-metric-create-button]').click();
    cy.wait('@createAthleteMetric').should(({ request, response }) => {
      expect(request.body).to.deep.equal(mockAthleteMetricInput);
      expect(response.body).to.deep.equal(mocktAthleteMetric);
    });
  });
});
