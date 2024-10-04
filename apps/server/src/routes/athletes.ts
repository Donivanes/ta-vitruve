import { Hono } from 'hono';
import { MetricType } from '@vitruve/database';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import {
  athleteSchema,
  athleteUpdateSchema,
  metricSchema,
  paginationSchema,
} from '@/schemas/athletesSchemas';

export const athletesRouter = new Hono()
  .post('/', async (c) => {
    try {
      const body = await c.req.json();
      const parsed = athleteSchema.parse(body);

      const athlete = await prisma.athlete.create({
        data: parsed,
      });

      return c.json(athlete, 201);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return c.json({ errors: error.errors }, 400);
      }
      console.error('Error creating athlete:', error);
      return c.json({ error: 'Internal Server Error' }, 500);
    }
  })
  .get('/', async (c) => {
    try {
      const { page, limit } = paginationSchema.parse({
        page: c.req.query('page'),
        limit: c.req.query('limit'),
      });

      const maxLimit = 100;
      const validatedLimit = Math.min(limit, maxLimit);

      const skip = (page - 1) * validatedLimit;

      const [athletes, totalItems] = await Promise.all([
        prisma.athlete.findMany({
          skip,
          take: validatedLimit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.athlete.count(),
      ]);

      const totalPages = Math.ceil(totalItems / validatedLimit);

      const response = {
        data: athletes,
        meta: {
          currentPage: page,
          totalPages,
          totalItems,
          limit: validatedLimit,
        },
      };

      return c.json(response, 200);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return c.json({ errors: error.errors }, 400);
      }
      console.error('Error fetching athletes with pagination:', error);
      return c.json({ error: 'Internal Server Error' }, 500);
    }
  })
  .get('/:id', async (c) => {
    const { id } = c.req.param();

    try {
      const athlete = await prisma.athlete.findUnique({
        where: { id },
      });

      if (!athlete) {
        return c.json({ error: 'Athlete not found' }, 404);
      }

      return c.json(athlete);
    } catch (error) {
      console.error(`Error fetching athlete with id ${id}:`, error);
      return c.json({ error: 'Internal Server Error' }, 500);
    }
  })
  .patch('/:id', async (c) => {
    const { id } = c.req.param();

    try {
      const body = await c.req.json();
      const parsed = athleteUpdateSchema.parse(body);

      const updatedAthlete = await prisma.athlete.update({
        where: { id },
        data: parsed,
      });

      return c.json(updatedAthlete);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return c.json({ errors: error.errors }, 400);
      }
      if ((error as any).code === 'P2025') {
        return c.json({ error: 'Athlete not found' }, 404);
      }
      console.error(`Error updating athlete with id ${id}:`, error);
      return c.json({ error: 'Internal Server Error' }, 500);
    }
  })
  .post('/:id/metrics', async (c) => {
    const { id } = c.req.param();

    try {
      const body = await c.req.json();
      const parsed = metricSchema.parse(body);

      const athleteExists = await prisma.athlete.findUnique({ where: { id } });

      if (!athleteExists) {
        return c.json({ error: 'Athlete not found' }, 404);
      }

      const metric = await prisma.performanceMetric.create({
        data: {
          athleteId: id,
          metricType: parsed.metricType,
          value: parsed.value,
          unit: parsed.unit,
        },
      });

      return c.json(metric, 201);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return c.json({ errors: error.errors }, 400);
      }
      console.error(`Error adding metric for athlete with id ${id}:`, error);
      return c.json({ error: 'Internal Server Error' }, 500);
    }
  })
  .get('/:id/metrics', async (c) => {
    const { id } = c.req.param();
    const metricType = c.req.query('filter') as MetricType | undefined;

    try {
      let filter: any = { athleteId: id };
      if (metricType) {
        if (!Object.values(MetricType).includes(metricType as MetricType)) {
          return c.json({ error: 'Invalid metricType value' }, 400);
        }
        filter.metricType = metricType;
      }

      const athleteExists = await prisma.athlete.findUnique({ where: { id } });
      if (!athleteExists) {
        return c.json({ error: 'Athlete not found' }, 404);
      }

      const metrics = await prisma.performanceMetric.findMany({
        where: filter,
      });

      return c.json(metrics);
    } catch (error) {
      console.error(`Error fetching metrics for athlete with id ${id}:`, error);
      return c.json({ error: 'Internal Server Error' }, 500);
    }
  })
  .delete('/:id', async (c) => {
    const { id } = c.req.param();

    try {
      await prisma.athlete.delete({ where: { id } });

      return c.json({
        message:
          'Athlete and associated performance metrics deleted successfully',
      });
    } catch (error) {
      if ((error as any).code === 'P2025') {
        return c.json({ error: 'Athlete not found' }, 404);
      }
      console.error(`Error deleting athlete with id ${id}:`, error);
      return c.json({ error: 'Internal Server Error' }, 500);
    }
  });
