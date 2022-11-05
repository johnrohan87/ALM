import React, { useEffect } from 'react';
import { Router } from '@reach/router';
import { Link, navigate } from 'gatsby';
import { getUser, isLoggedIn } from '../common/services/auth';

const Account = ({ user }) => {
  useEffect(() => {
    window.addEventListener('storage', () => {
      if (isLoggedIn()) {
        navigate('/almlogin');
      }
    });
  });

  const Home = ({ user }) => {
    return (
      <>
        <h1>Hi, {user.name ? user.name : 'friend'}!</h1>
        <h2>Your current user info</h2>
        <ul>add user info here</ul>
      </>
    );
  };
  const Settings = () => <p>Settings</p>;
  const Billing = () => <p>Billing</p>;
  const Admin = () => <p>Admin</p>;

  return (
    <>
      {!isLoggedIn() ? (
        <nav>
          <Link to="/almlogin/:home">Account Home</Link>{' '}
          <Link to="/almlogin:settings">Settings</Link>{' '}
          <Link to="/almlogin:billing">Billing</Link>{' '}
          <Link to="/almlogin:admin">Admin</Link>{' '}
          <a
            href="#logout"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Log Out
          </a>
        </nav>
      ) : (
        navigate('/almlogin')
      )}

      <Router>
        <Home path="/almlogin/:home" component={Home} />
        <Settings path="/almlogin/:settings" component={Settings} />
        <Billing path="/almlogin/:billing" component={Billing} />
        <Admin path="/almlogin/:admin" component={Admin} />
      </Router>
    </>
  );
};

export default Account;
