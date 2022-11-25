import { navigate } from 'gatsby';
import React, { useState, useEffect, useContext } from 'react';
import {
  getCurrentUser,
  getToken,
} from '../../../common/contexts/AxiosContext';
import { getUser, isLoggedIn } from '../../../common/services/auth';
import { Provider, useSelector, useDispatch } from 'react-redux';
import {
  toggle_logged_in,
  toggle_loading,
  set_logged_in_as,
  set_email,
  return_logged_in,
  return_loading,
  fetchLoginData,
  fetchUserData,
  set_userinfo,
} from '../../../common/services/userSlice';
import store from '../../../common/services/store';
import thunk from 'redux-thunk';

const ALMLogin = ({ state }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(user.loading ? user.loading : false);
  const [loggedIn, setLoggedIn] = useState(
    user.logged_in ? user.logged_in : false
  );

  const FetchToken = async ({ email, password }) => {
    await dispatch(fetchLoginData({ email, password }));
    if (isLoggedIn()) {
      await dispatch(fetchUserData());
      navigate('/almaccount/:home');
    }
  };

  const handleClick = (email, password) => {
    {
      /**
    if (dispatch(fetchLoginData({email,password}))){
      if (isLoggedIn()){
        console.log(dispatch(return_logged_in))
        dispatch(toggle_logged_in)
        console.log('navigating')
        navigate('/almaccount/:home');
      }
      else {
        LoginFunction({email,password})
        console.log('user = ',user)
      }
    } */
    }
    FetchToken({ email, password });
  };

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/almaccount/:home');
    }
  }, [loggedIn]);

  return (
    <>
      <Provider store={store}>
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card border-0 shadow rounded-3 my-5">
                <div className="card-body p-4 p-sm-5">
                  <h5 className="card-title text-center mb-5 fw-light fs-5">
                    Sign In
                  </h5>
                  <p>{store.logged_in}</p>
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
                      <label for="floatingInput">Email address</label>
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
                      <label for="floatingPassword">Password</label>
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
                        for="rememberPasswordCheck"
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
    </>
  );
};

export default ALMLogin;
