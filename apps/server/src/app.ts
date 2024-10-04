import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { athletesRouter } from '@/routes/athletes';

export const app = new Hono()
  .basePath('/api/v1')
  .use('*', cors({ origin: ['http://localhost:5173'] }))
  .route('/athletes', athletesRouter);

const port = 3000;

serve({
  fetch: app.fetch,
  port,
});
