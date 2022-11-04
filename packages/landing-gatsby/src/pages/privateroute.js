import React from 'react';
import { navigate } from 'gatsby';
import { isLoggedIn } from '../common/services/auth';

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/almaccount`) {
    navigate('/login');
    return null;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
