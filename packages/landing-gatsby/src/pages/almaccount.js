import React, { useEffect } from 'react';
import { Router } from '@reach/router';
import { Link, navigate } from 'gatsby';
import { getUser, isLoggedIn } from '../common/services/auth';
import { useSelector, useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import store from '../common/services/store';
import { getUserState } from '../common/services/userSlice';

class Account extends React.Component {
  /*
  constructor(props) {
    super(props);
    this.state = {'user': user};
    }*/
  render() {
    //const user = useSelector((state) => state.user);

    const Home = () => {
      //console.log('user Info', user);
      return (
        <>
          <h1>Hi, {/*user.email ? user.email : 'friend'*/}!</h1>
          <h2>Your current user info</h2>
          <ul>User info here</ul>
          <ul>user token {/*user.token*/}</ul>
          <ul>logged in {/*JSON.stringify(user.logged_in)*/}</ul>
          <ul>logged in as {/*user.logged_in_as*/}</ul>
        </>
      );
    };
    const Settings = () => <p>Settings</p>;
    const Billing = () => <p>Billing</p>;
    const Admin = () => <p>Admin</p>;

    return (
      <>
        <Provider store={store}>
          {!isLoggedIn() ? (
            <nav>
              <Link to="/almaccount/:home">Account Home</Link>{' '}
              <Link to="/almaccount/:settings">Settings</Link>{' '}
              <Link to="/almaccount/:billing">Billing</Link>{' '}
              <Link to="/almaccount/:admin">Admin</Link>{' '}
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
            <></>
          )}

          <Router>
            <Home path="/almaccount/:home" component={Home} />
            <Settings path="/almaccount/:settings" component={Settings} />
            <Billing path="/almaccount/:billing" component={Billing} />
            <Admin path="/almaccount/:admin" component={Admin} />
          </Router>
        </Provider>
      </>
    );
  }
}

export default Account;
