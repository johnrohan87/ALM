import { navigate } from 'gatsby';
import React, { useState, useEffect, useContext } from 'react';
import { getCurrentUser, getToken } from '../common/contexts/AxiosContext';
import { getUser, isLoggedIn } from '../common/services/auth';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggle_logged_in,
  set_logged_in_as,
  set_email,
  return_logged_in,
} from '../common/services/userSlice';
import { Provider } from 'react-redux';
import store from '../common/services/store';
import ALMLogin from '../containers/ALM/ALMLogin';

export default ({ state }) => {
  return (
    <>
      <Provider store={store}>
        <ALMLogin />
      </Provider>
    </>
  );
};
