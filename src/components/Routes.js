import React from 'react';
import { Switch, Route } from 'react-router-dom';
import components from '../components';

const Routes = () => {
  return (
    <Switch>
      <Route path="/signup" component={components.Signup} />
      <Route path="/login" component={components.Login} />
      <Route exact path="/" component={components.Dashboard} />
    </Switch>
  );
};

export default Routes;
