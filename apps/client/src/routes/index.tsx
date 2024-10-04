import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import AthletePage from '../pages/athlete';
import { routes } from '../constants';

const AppRouter = () => {
  return (
    <>
      <Route exact path={routes.DASHBOARD} component={Dashboard} />
      <Route exact path={routes.ATHLETE} component={AthletePage} />
      <Route exact path={routes.HOME}>
        <Redirect to={routes.DASHBOARD} />
      </Route>
    </>
  );
};

export default AppRouter;
