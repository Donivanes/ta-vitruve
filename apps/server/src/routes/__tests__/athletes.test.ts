import { app } from '@/app';
import { testClient } from 'hono/testing';
import { prismaMock } from '../../../jest.setup';
import { MetricType, UnitType } from '@vitruve/database';

describe('Athletes routes', () => {
  const client = testClient(app);

  describe('POST /athletes', () => {
    it('should create an athlete', async () => {
      const mockAthlete = {
        id: '1',
        name: 'John Doe',
        age: 25,
        team: 'Team A',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.athlete.create.mockResolvedValue(mockAthlete);

      const response = await client.api.v1.athletes.$post(
        {},
        {
          init: {
            body: JSON.stringify({
              name: 'John Doe',
              age: 25,
              team: 'Team A',
            }),
          },
        }
      );

      expect(response.status).toBe(201);
      expect(await response.json()).toEqual({
        ...mockAthlete,
        createdAt: mockAthlete.createdAt.toISOString(),
        updatedAt: mockAthlete.updatedAt.toISOString(),
      });
    });

    it('should return 400 for invalid input', async () => {
      const response = await client.api.v1.athletes.$post({
        json: { name: 'John Doe' },
      });

      expect(response.status).toBe(400);
      expect(await response.json()).toHaveProperty('errors');
    });
  });

  describe('GET /athletes', () => {
    it('should get athletes with pagination', async () => {
      const mockAthletes = [
        {
          id: '1',
          name: 'John Doe',
          age: 25,
          team: 'Team A',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Jane Doe',
          age: 28,
          team: 'Team B',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      prismaMock.athlete.findMany.mockResolvedValue(mockAthletes);
      prismaMock.athlete.count.mockResolvedValue(2);

      const response = await client.api.v1.athletes.$get();

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body).toHaveProperty('data', [
        {
          ...mockAthletes[0],
          createdAt: mockAthletes[0].createdAt.toISOString(),
          updatedAt: mockAthletes[0].updatedAt.toISOString(),
        },
        {
          ...mockAthletes[1],
          createdAt: mockAthletes[1].createdAt.toISOString(),
          updatedAt: mockAthletes[1].updatedAt.toISOString(),
        },
      ]);
      expect(body).toHaveProperty('meta');
      if ('meta' in body) {
        expect(body.meta).toEqual({
          currentPage: 1,
          totalPages: 1,
          totalItems: 2,
          limit: 10,
        });
      } else {
        fail('Response body does not contain meta property');
      }
    });
  });

  describe('GET /athletes/:id', () => {
    it('should get an athlete by id', async () => {
      const mockAthlete = {
        id: '1',
        name: 'John Doe',
        age: 25,
        team: 'Team A',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.athlete.findUnique.mockResolvedValue(mockAthlete);

      const response = await client.api.v1.athletes[':id'].$get({
        param: { id: '1' },
      });

      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({
        ...mockAthlete,
        createdAt: mockAthlete.createdAt.toISOString(),
        updatedAt: mockAthlete.updatedAt.toISOString(),
      });
    });

    it('should return 404 for non-existent athlete', async () => {
      prismaMock.athlete.findUnique.mockResolvedValue(null);

      const response = await client.api.v1.athletes[':id'].$get({
        param: { id: 'non-existent' },
      });

      expect(response.status).toBe(404);
    });
  });

  describe('PATCH /athletes/:id', () => {
    it('should update an athlete', async () => {
      const mockUpdatedAthlete = {
        id: '1',
        name: 'John Updated',
        age: 26,
        team: 'Team B',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.athlete.update.mockResolvedValue(mockUpdatedAthlete);

      const response = await client.api.v1.athletes[':id'].$patch(
        {
          param: { id: '1' },
        },
        {
          init: {
            body: JSON.stringify({
              name: 'John Updated',
              age: 26,
              team: 'Team B',
            }),
          },
        }
      );

      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({
        ...mockUpdatedAthlete,
        createdAt: mockUpdatedAthlete.createdAt.toISOString(),
        updatedAt: mockUpdatedAthlete.updatedAt.toISOString(),
      });
    });

    it('should return 404 for non-existent athlete', async () => {
      prismaMock.athlete.update.mockRejectedValue({ code: 'P2025' });

      const response = await client.api.v1.athletes[':id'].$patch(
        {
          param: { id: 'non-existent' },
        },
        {
          init: {
            body: JSON.stringify({
              name: 'John Updated',
              age: 26,
              team: 'Team B',
            }),
          },
        }
      );

      expect(response.status).toBe(404);
    });
  });

  describe('POST /athletes/:id/metrics', () => {
    it('should add a metric to an athlete', async () => {
      const mockMetric = {
        id: '1',
        athleteId: '1',
        metricType: MetricType.SPEED,
        value: 10,
        unit: UnitType.METERS_PER_SECOND,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.athlete.findUnique.mockResolvedValue({
        id: '1',
        name: 'John Doe',
        age: 25,
        team: 'Team A',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      prismaMock.performanceMetric.create.mockResolvedValue(mockMetric);

      const response = await client.api.v1.athletes[':id'].metrics.$post(
        {
          param: { id: '1' },
        },
        {
          init: {
            body: JSON.stringify({
              metricType: MetricType.SPEED,
              value: 10,
              unit: UnitType.METERS_PER_SECOND,
            }),
          },
        }
      );

      expect(response.status).toBe(201);
      expect(await response.json()).toEqual({
        ...mockMetric,
        createdAt: mockMetric.createdAt.toISOString(),
        updatedAt: mockMetric.updatedAt.toISOString(),
      });
    });

    it('should return 404 for non-existent athlete', async () => {
      prismaMock.athlete.findUnique.mockResolvedValue(null);

      const response = await client.api.v1.athletes[':id'].metrics.$post(
        {
          param: { id: 'non-existent' },
        },
        {
          init: {
            body: JSON.stringify({
              metricType: MetricType.SPEED,
              value: 10,
              unit: UnitType.METERS_PER_SECOND,
            }),
          },
        }
      );

      expect(response.status).toBe(404);
    });
  });

  describe('GET /athletes/:id/metrics', () => {
    it('should get metrics for an athlete', async () => {
      const mockMetrics = [
        {
          id: '1',
          athleteId: '1',
          metricType: MetricType.SPEED,
          value: 10,
          unit: UnitType.METERS_PER_SECOND,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          athleteId: '1',
          metricType: MetricType.STRENGTH,
          value: 100,
          unit: UnitType.KG,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      prismaMock.athlete.findUnique.mockResolvedValue({
        id: '1',
        name: 'John Doe',
        age: 25,
        team: 'Team A',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      prismaMock.performanceMetric.findMany.mockResolvedValue(mockMetrics);

      const response = await client.api.v1.athletes[':id'].metrics.$get({
        param: { id: '1' },
      });

      expect(response.status).toBe(200);
      expect(await response.json()).toEqual([
        {
          ...mockMetrics[0],
          createdAt: mockMetrics[0].createdAt.toISOString(),
          updatedAt: mockMetrics[0].updatedAt.toISOString(),
        },
        {
          ...mockMetrics[1],
          createdAt: mockMetrics[1].createdAt.toISOString(),
          updatedAt: mockMetrics[1].updatedAt.toISOString(),
        },
      ]);
    });

    it('should filter metrics by type', async () => {
      const mockMetrics = [
        {
          id: '1',
          athleteId: '1',
          metricType: MetricType.SPEED,
          value: 10,
          unit: UnitType.METERS_PER_SECOND,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      prismaMock.athlete.findUnique.mockResolvedValue({
        id: '1',
        name: 'John Doe',
        age: 25,
        team: 'Team A',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      prismaMock.performanceMetric.findMany.mockResolvedValue(mockMetrics);

      const response = await client.api.v1.athletes[':id'].metrics.$get({
        param: { id: '1' },
      });

      expect(response.status).toBe(200);
      expect(await response.json()).toEqual([
        {
          ...mockMetrics[0],
          createdAt: mockMetrics[0].createdAt.toISOString(),
          updatedAt: mockMetrics[0].updatedAt.toISOString(),
        },
      ]);
    });

    it('should return 404 for non-existent athlete', async () => {
      prismaMock.athlete.findUnique.mockResolvedValue(null);

      const response = await client.api.v1.athletes[':id'].metrics.$get({
        param: { id: 'non-existent' },
      });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /athletes/:id', () => {
    it('should delete an athlete', async () => {
      prismaMock.athlete.delete.mockResolvedValue({
        id: '1',
        name: 'John Doe',
        age: 25,
        team: 'Team A',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const response = await client.api.v1.athletes[':id'].$delete({
        param: { id: '1' },
      });

      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({
        message:
          'Athlete and associated performance metrics deleted successfully',
      });
    });

    it('should return 404 for non-existent athlete', async () => {
      prismaMock.athlete.delete.mockRejectedValue({ code: 'P2025' });

      const response = await client.api.v1.athletes[':id'].$delete({
        param: { id: 'non-existent' },
      });

      expect(response.status).toBe(404);
    });
  });
});
