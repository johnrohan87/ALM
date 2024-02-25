import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../common/services/store';
import Home from './protected/Home';
import PullFeed from './protected/PullFeed';
import Settings from './protected/Settings';
import Billing from './protected/Billing';
import Admin from './protected/Admin';
import TodoApp from '../containers/ALM/Todo';
import {
  isLoggedIn,
  logout,
  getUser,
  getUserInfo,
  getRemainingSecondsUntilExpiry,
} from '../common/services/auth';
import { navigate } from 'gatsby';
import {
  refreshProvidedToken,
  refreshToken,
} from '../common/contexts/AxiosContext';

const Account = () => {
  const [user, setUser] = useState({});
  const [userinfo, setUserInfo] = useState({});

  useEffect(() => {
    const userFromLocalStorage = getUser();
    const userinfoFromLocalStorage = getUserInfo();

    setUser(userFromLocalStorage);
    setUserInfo(userinfoFromLocalStorage);

    if (!isLoggedIn()) {
      navigate('/almlogin');
    } else {
      const remainingSeconds = getRemainingSecondsUntilExpiry(
        userFromLocalStorage.access_token
      );
      console.log(remainingSeconds);
      if (remainingSeconds < 300) {
        console.log('refreshing token');
        refreshProvidedToken(userFromLocalStorage);
      }
    }
  }, []);
  if (typeof window === 'undefined') {
    return null;
  }

  const Redirect = () => (
    <>
      Redirecting...
      {isLoggedIn() ? navigate('/almaccount/home') : navigate('/almlogin')}
    </>
  );

  const handleLogout = () => {
    //logout(() => {
    navigate('/almlogin');
    //});
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
          <Link to="/almaccount/todoapp">ToDoApp</Link>{' '}
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
          <Route path="/almaccount/todoapp" element={<TodoApp />} />
          <Route exact path="/almaccount" element={<Redirect />} />
          <Route path="*" element={() => navigate('/')} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default Account;
