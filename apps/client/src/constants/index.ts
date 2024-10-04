export const routes = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  ATHLETE: '/athlete/:id',
};

export const routeResolver = {
  athlete: (id: string) => `/athlete/${id}`,
};
