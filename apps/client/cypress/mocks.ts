export const API_URL = 'http://localhost:3000/api/v1';

export const mockAthleteInput = {
  name: 'Vitruve',
  age: 20,
  team: 'Team 1',
};

export const mockAthleteData = {
  id: '6bd44ff7-5b78-48ce-9771-b1701aa5d3e3',
  name: 'ivan',
  age: 16,
  team: 'team',
  createdAt: '2024-10-02T11:22:22.519Z',
  updatedAt: '2024-10-02T11:22:22.519Z',
};

export const mockUpdateInput = {
  name: 'John',
  age: 20,
  team: 'Team 2',
};

export const mockUpdatedAthlete = {
  id: '6bd44ff7-5b78-48ce-9771-b1701aa5d3e3',
  name: 'John',
  age: 20,
  team: 'Team 2',
  createdAt: '2024-10-02T11:22:22.519Z',
  updatedAt: '2024-10-02T11:22:22.519Z',
};

export const mockAthleteMetricInput = {
  athleteId: '6bd44ff7-5b78-48ce-9771-b1701aa5d3e3',
  metricType: 'SPEED',
  value: 10,
  unit: 'KILOMETERS_PER_HOUR',
};

export const mocktAthleteMetric = {
  id: '3d70d14c-6241-4078-9ac0-b7365b8a771d',
  athleteId: '6bd44ff7-5b78-48ce-9771-b1701aa5d3e3',
  metricType: 'SPEED',
  value: 10,
  unit: 'KILOMETERS_PER_HOUR',
  createdAt: '2024-10-02T12:32:36.573Z',
  updatedAt: '2024-10-02T12:32:36.573Z',
};
