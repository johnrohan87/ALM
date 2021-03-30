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
  return <p>Hi, {user.name ? user.name : 'friend'}!</p>;
};
const Settings = () => <p>Settings</p>;
const Billing = () => <p>Billing</p>;

const Account = () => {
  if (!isAuthenticated()) {
    login();
    return (
      <p>
        Redirecting to login...{'domain - ' + process.env.AUTH0_DOMAIN}
        {'client ID - ' + process.env.AUTH0_CLIENTID}
        {'callback - ' + process.env.AUTH0_CALLBACK}
      </p>
    );
  }

  const user = getProfile();

  return (
    <>
      <nav>
        <Link to="/account/">Account Home</Link>{' '}
        <Link to="/account/settings/">Settings</Link>{' '}
        <Link to="/account/billing/">Billing</Link>{' '}
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
      </Router>
    </>
  );
};

export default Account;
