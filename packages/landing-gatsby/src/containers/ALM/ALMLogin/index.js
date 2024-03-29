import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from 'gatsby';
import { Provider } from 'react-redux';
import {
  fetchLoginData,
  fetchUserData,
  set_userinfo,
} from '../../../common/services/userSlice';
import store from '../../../common/services/store';
import {
  isTokenFresh,
  refreshToken,
  getToken,
} from '../../../common/contexts/AxiosContext';
import { isLoggedIn } from '../../../common/services/auth';

const ALMLogin = ({ state }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  //const isLoggedIn = useSelector((state) => state.user.logged_in);

  const fetchToken = async ({ email, password }) => {
    //check for user and password
    await dispatch(fetchLoginData({ email, password }));
    //console.log('isLoggedIn', isLoggedIn)
    if (isLoggedIn) {
      let isFresh = false;
      try {
        //need to add self fresh check as token should be fresh here
        isFresh = await isTokenFresh();
      } catch (error) {
        console.error('Error checking token freshness:', error);
      }
      if (!isFresh) {
        try {
          const newTokens = await getToken({ email, password });
          dispatch(set_userinfo(newTokens));
          console.error('token refreshed', newTokens);
        } catch (error) {
          console.error('Error refreshing token:', error);
          return;
        }
      }
      //console.log('fetchUserData', fetchUserData())
      await dispatch(fetchUserData());
      console.log('navigating');
      navigate('/almaccount/home');
    }
  };

  const handleClick = (email, password) => {
    fetchToken({ email, password });
  };

  return (
    <Provider store={store}>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5">
                  Sign In
                </h5>
                <div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="rememberPasswordCheck"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="rememberPasswordCheck"
                    >
                      Remember password
                    </label>
                  </div>
                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      onClick={() => handleClick(email, password)}
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default ALMLogin;
