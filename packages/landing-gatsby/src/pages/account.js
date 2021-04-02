// src/pages/account.js //test
import React from 'react';
import { Router } from '@reach/router';
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
      <p>Hi, {user.name ? user.name : 'friend'}!</p>
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
const Admin = ({ user }) => (
  <>
    <p>Admin Page</p>
    <p>Info Here</p>
  </>
);

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
        <Admin path="/account/admin" />
      </Router>
    </>
  );
};

export default Account;
