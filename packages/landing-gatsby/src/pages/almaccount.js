import React, { useEffect } from 'react';
import { Router } from '@reach/router';
import { Link, navigate } from 'gatsby';
import { getUser, isLoggedIn } from '../common/services/auth';

const Account = ({ user }) => {
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/almlogin');
    }
  });

  const Home = () => {
    let userInfo = localStorage.getItem('userinfo');
    console.log('userInfo', userInfo);
    return (
      <>
        <h1>Hi, {userInfo.email ? userInfo.email : 'friend'}!</h1>
        <h2>Your current user info</h2>
        <ul>add user info here</ul>
        <p>{userInfo.id}</p>
        <p>{userInfo.roles}</p>
        <p>{userInfo.logged_in_as}</p>
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
          <Link to="/almaccount/:home">Account Home</Link>{' '}
          <Link to="/almaccount:settings">Settings</Link>{' '}
          <Link to="/almaccount:billing">Billing</Link>{' '}
          <Link to="/almaccount:admin">Admin</Link>{' '}
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
        <Home path="/almaccount/:home" component={Home} />
        <Settings path="/almaccount/:settings" component={Settings} />
        <Billing path="/almaccount/:billing" component={Billing} />
        <Admin path="/almaccount/:admin" component={Admin} />
      </Router>
    </>
  );
};

export default Account;
