import { z } from 'zod';
import { MetricType, UnitType } from '@vitruve/database';

const athleteSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.number().int().positive('Age must be a positive integer'),
  team: z.string().min(1, 'Team is required'),
});

const athleteUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  age: z.number().int().positive().optional(),
  team: z.string().min(1).optional(),
});

const paginationSchema = z.object({
  page: z
    .string()
    .default('1')
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'Page must be a positive integer',
    }),
  limit: z
    .string()
    .default('10')
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'Limit must be a positive integer',
    }),
});

const metricTypeEnum = z.nativeEnum(MetricType);
const unitTypeEnum = z.nativeEnum(UnitType);

const metricSchema = z.object({
  metricType: metricTypeEnum,
  value: z.number(),
  unit: unitTypeEnum,
});

export { athleteSchema, athleteUpdateSchema, paginationSchema, metricSchema };
