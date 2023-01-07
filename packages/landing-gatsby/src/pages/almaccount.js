import React, { useEffect } from 'react';
import { Routes, Route, Link, Navigate, BrowserRouter } from 'react-router-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getUser, isLoggedIn } from '../common/services/auth';
import { useSelector, useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import store from '../common/services/store';
import { getUserState } from '../common/services/userSlice';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: window ? JSON.parse(localStorage.getItem('user')) || '' : null,
      user: window ? JSON.parse(localStorage.getItem('userinfo')) || {} : null,
      redirect: false,
    };
  }

  componentDidMount() {
    if (!isLoggedIn()) {
      this.props.navigateFunction.navigate('/almlogin');
    }
  }

  render() {
    const Home = () => {
      console.log(this.state);
      return (
        <>
          <h1>
            Hi, {this.state.user.email ? this.state.user.email : 'friend'}!
          </h1>
          <h2>Your current user info</h2>
          <ul>User info here</ul>
          <ul>
            user token{' '}
            {this.state.token.access_token
              ? this.state.token.access_token
              : 'none found'}
          </ul>
          <ul>ID {this.state.user.id ? this.state.user.id : 'none found'}</ul>
          <ul>
            logged in as{' '}
            {this.state.user.roles ? this.state.user.roles : 'none found'}
          </ul>
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
  }
}

export default Account;
