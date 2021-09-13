// src/pages/account.js //test
import React from 'react';
import { Router } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';
import { updateStore } from '../common/utils/store/almSlice';

import {
  login,
  logout,
  isAuthenticated,
  getProfile,
} from '../common/utils/auth';
import { Link } from 'gatsby';

const Home = ({ user }) => {
  return (
    <>
      <h1>Hi, {user.name ? user.name : 'friend'}!</h1>
      <h2>Your current user info</h2>
      <ul>
        {Object.entries(user).map(([key, val]) => (
          <li key={key}>
            {key}: {val}
          </li>
        ))}
      </ul>
    </>
  );
};
const Settings = () => <p>Settings</p>;
const Billing = () => <p>Billing</p>;
const Admin = ({ user }) => {
  const dispatch = useDispatch();
  const tmpALMDBStore = useSelector((state) => state.alm_db.user);
  if (user !== tmpALMDBStore) {
    dispatch(updateStore(user));
  }

  return (
    <>
      <p>Admin Page</p>
      {user.name === 'johnrohan@mail.com' ? (
        <p>Display admin info here</p>
      ) : (
        <p>No admin privileges</p>
      )}
      <p>Info Here</p>

      <h1>Hi, {user.name ? user.name : 'friend'}!</h1>
      <h2>Your current user state</h2>
      <ul>
        {Object.entries(tmpALMDBStore).map(([key, val]) => (
          <li key={key}>
            {key}: {val}
          </li>
        ))}
      </ul>
    </>
  );
};

const Account = () => {
  if (!isAuthenticated()) {
    login();
    return <p>Redirecting to login...</p>;
  }

  const user = getProfile();

  return (
    <>
      <nav>
        <Link to="/account/">Account Home</Link>{' '}
        <Link to="/account/settings/">Settings</Link>{' '}
        <Link to="/account/billing/">Billing</Link>{' '}
        <Link to="/account/admin/">Admin</Link>{' '}
        <a
          href="#logout"
          onClick={(e) => {
            logout();
            e.preventDefault();
          }}
        >
          Log Out
        </a>
      </nav>
      <Router>
        <Home path="/account/" user={user} />
        <Settings path="/account/settings" />
        <Billing path="/account/billing" />
        <Admin path="/account/admin" user={user} />
      </Router>
    </>
  );
};

export default Account;
