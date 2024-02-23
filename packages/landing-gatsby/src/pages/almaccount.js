import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../common/services/store';
import { Home } from './protected/Home';
import { PullFeed } from './protected/PullFeed';
import { Settings } from './protected/Settings';
import { Billing } from './protected/Billing';
import { Admin } from './protected/Admin';
import {
  isLoggedIn,
  logout,
  getUser,
  getUserInfo,
} from '../common/services/auth';
import { navigate } from 'gatsby';

const Account = () => {
  const [user, setUser] = useState({});
  const [userinfo, setUserInfo] = useState({});

  useEffect(() => {
    setUser(getUser());
    setUserInfo(getUserInfo());
    console.log(user, userinfo);

    if (!isLoggedIn()) {
      navigate('/almlogin');
    }
  }, []);

  const Redirect = () => (
    <>
      Redirecting...
      {isLoggedIn() ? navigate('/almaccount/home') : navigate('/almlogin')}
    </>
  );

  const handleLogout = () => {
    logout(() => {
      navigate('/almlogin');
    });
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <nav>
          <Link to="/almaccount/home">Account Home</Link>{' '}
          <Link to="/almaccount/settings">Settings</Link>{' '}
          <Link to="/almaccount/billing">Billing</Link>{' '}
          <Link to="/almaccount/admin">Admin</Link>{' '}
          <Link to="/almaccount/pullfeed">PullFeed</Link>{' '}
          <a href="#logout" onClick={handleLogout}>
            Logout
          </a>
        </nav>

        <Routes>
          <Route
            index
            path="/almaccount/home"
            element={<Home user={user} userinfo={userinfo} />}
          />
          <Route path="/almaccount/settings" element={<Settings />} />
          <Route path="/almaccount/billing" element={<Billing />} />
          <Route path="/almaccount/admin" element={<Admin />} />
          <Route path="/almaccount/pullfeed" element={<PullFeed />} />
          <Route exact path="/almaccount" element={<Redirect />} />
          <Route path="*" element={() => navigate('/')} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default Account;
