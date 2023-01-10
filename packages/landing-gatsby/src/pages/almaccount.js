import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getUser, isLoggedIn } from '../common/services/auth';
import { useSelector, useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import store from '../common/services/store';
import { getUserState, fetchUserData } from '../common/services/userSlice';

const Account = () => {
  /**
  let loginTest = isLoggedIn()
  const dispatch = useDispatch();

  if (loginTest){
    dispatch(fetchUserData());
  } else {
    navigate('/');
  }  */

  if (typeof window === 'undefined') {
    return null;
  }

  const Home = () => {
    //const user = useSelector((state) => state.user);
    useEffect(() => {
      if (!isLoggedIn()) {
        navigate('/');
      }
    }, []);

    const user = useSelector((state) => state.user);

    console.log(user);
    return (
      <>
        {!isLoggedIn() ? (
          <>Redirecting...</>
        ) : (
          <>
            <h1>Hi, {user.email ? user.email : 'friend'}!</h1>
            <h2>Your current user info</h2>
            <ul>User info here</ul>
            <ul>ID {user.id ? user.id : 'none found'}</ul>
            <ul>logged in as {user.roles ? user.roles : '0'}</ul>
          </>
        )}
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
  const Redirect = () => (
    <>
      Redirecting...
      {isLoggedIn() ? navigate('/almaccount/home') : navigate('/')}
    </>
  );

  return (
    <BrowserRouter>
      <Provider store={store}>
        {!isLoggedIn() ? (
          <>{navigate('/')}</>
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
                localStorage.removeItem('user');
                localStorage.removeItem('userinfo');
                navigate('/almlogin');
              }}
            >
              Log Out
            </a>
          </nav>
        )}

        <Routes>
          <Route index path="/almaccount/home" element={<Home />} />
          <Route path="/almaccount/settings" element={<Settings />} />
          <Route path="/almaccount/billing" element={<Billing />} />
          <Route path="/almaccount/admin" element={<Admin />} />
          <Route path="/almaccount/pullfeed" element={<PullFeed />} />
          <Route exact path="/almaccount" element={<Redirect />} />
          <Route path="*" element={() => navigate('/')} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default Account;
