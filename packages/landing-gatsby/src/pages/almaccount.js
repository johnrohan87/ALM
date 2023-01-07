import React, { useEffect } from 'react';
import { Routes, Route, Link, Navigate, BrowserRouter } from 'react-router-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getUser, isLoggedIn } from '../common/services/auth';
import { useSelector, useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import store from '../common/services/store';
import { getUserState } from '../common/services/userSlice';

const Account = ({ user }) => {
  const Home = () => {
    console.log(this.state);
    return (
      <>
        <h1>Hi, {'friend'}!</h1>
        <h2>Your current user info</h2>
        <ul>User info here</ul>
        <ul>user token {'none found'}</ul>
        <ul>ID {'none found'}</ul>
        <ul>logged in as {'none found'}</ul>
      </>
    );
  };
  const Settings = () => <p>Settings</p>;
  const Billing = () => <p>Billing</p>;
  const Admin = () => <p>Admin</p>;
  const PullFeed = () => (
    <>
      <label>Enter Reed URL Here</label>
      <text></text>
    </>
  );

  return (
    <BrowserRouter>
      <Provider store={store}>
        {!isLoggedIn() ? (
          <></>
        ) : (
          <nav>
            <Link to="/almaccount/home">Account Home</Link>{' '}
            <Link to="/almaccount/settings">Settings</Link>{' '}
            <Link to="/almaccount/billing">Billing</Link>{' '}
            <Link to="/almaccount/admin">Admin</Link>{' '}
            <Link to="/almaccount/pullfeed">PullFeed</Link>{' '}
            <a
              href="#logout"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Log Out
            </a>
          </nav>
        )}

        <Routes>
          <Route index path="/almaccount/:home" element={<Home />} />
          <Route path="/almaccount/settings" element={<Settings />} />
          <Route path="/almaccount/billing" element={<Billing />} />
          <Route path="/almaccount/admin" element={<Admin />} />
          <Route path="/almaccount/pullfeed" element={<PullFeed />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default Account;
