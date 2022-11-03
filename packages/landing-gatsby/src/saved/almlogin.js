import React from 'react';
import { Router } from '@reach/router';
import { Link } from 'gatsby';

const Login = ({ user }) => {
  /**<Router>
            <Switch>
                <Home default path="/account/home" user={user} element={<Home/>} />
                <Settings path="/account/settings" element={<Settings/>}/>
                <Billing path="/account/billing" element={<Billing/>}/>
                <Admin path="/account/admin" user={user} element={<Admin/>}/>
            </Switch>
        </Router> */
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
      <Router>
        <Home path="/almlogin/:home" component={Home} />
        <Settings path="/almlogin/:settings" component={Settings} />
        <Billing path="/almlogin/:billing" component={Billing} />
        <Admin path="/almlogin/:admin" component={Admin} />
      </Router>
    </>
  );
};

export default Login;
