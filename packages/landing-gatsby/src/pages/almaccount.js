import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getUser, isLoggedIn } from '../common/services/auth';
import { isTokenFresh, refreshToken } from '../common/contexts/AxiosContext';
import { useSelector, useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import store from '../common/services/store';
import {
  getUserState,
  fetchUserData,
  submitFeedData,
  getFeedData,
  set_userinfo,
} from '../common/services/userSlice';

const Account = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const Home = () => {
    //const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    if (!isLoggedIn()) {
      console.log(isLoggedIn());
      navigate('/almlogin');
    } else {
      console.log(isLoggedIn());
    }

    //console.log(user);
    return (
      <>
        {!isLoggedIn() ? (
          <>Redirecting...</>
        ) : (
          <>
            <h1>Hi, {user.email ? user.email : 'friend'}!</h1>
            <h2>Your current user info</h2>
            <ul>User info here</ul>
            <ul>ID {user.logged_in_as ? user.logged_in_as : '0'}</ul>
            <ul>feed {user.feed ? user.feed : 'null'}</ul>
            <br />
            <button
              className="btn btn-primary btn-login text-uppercase fw-bold"
              onClick={() => navigate('/todoapp')}
            >
              Test ToDo app
            </button>
          </>
        )}
      </>
    );
  };
  const Settings = () => <p>Settings</p>;
  const Billing = () => <p>Billing</p>;
  const Admin = () => <p>Admin</p>;

  const PullFeed = () => {
    useEffect(() => {
      if (!isLoggedIn()) {
        navigate('/almlogin');
      }
    }, [user]);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [feedURL, setfeedURL] = useState('');
    const [textFile, settextFile] = useState('');
    const [submitFeed, setsubmitFeed] = useState('');
    const [feedData, setFeedData] = useState(null);
    const [feedHeader, setFeedHeader] = useState('');

    if (submitFeed != '') {
      dispatch(submitFeedData({ feedURL, textFile }));
      console.log('dispatching', feedURL, textFile);
      setsubmitFeed('');
    }

    async function FeedDataHandler() {
      await dispatch(getFeedData('all'));
      const result = JSON.parse(localStorage.getItem('userfeed'));
      console.log('result', result, 'feedData', feedData);
      setFeedData(result);
      return result;
    }

    return (
      <>
        {!isLoggedIn() ? (
          <>Redirecting...</>
        ) : (
          <>
            <div className="container-fluid card">
              <div
                className="card align-self-center"
                style={{ minWidth: '75%', padding: '5rem 5rem' }}
              >
                <label>Enter Feed URL Here</label>
                <label>{submitFeed}</label>
                <input
                  type="text"
                  placeholder="http://"
                  onChange={(e) => {
                    setfeedURL(e.target.value);
                  }}
                  value={feedURL}
                />
                <input
                  type="text"
                  placeholder="textFile"
                  onChange={(e) => {
                    settextFile(e.target.value);
                  }}
                  value={textFile}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setsubmitFeed(
                      'submitted - ' + feedURL + ' textFile - ' + textFile
                    );
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="container-fluid card">
              <div
                className="card align-self-center"
                style={{ minWidth: '75%', padding: '5rem 5rem' }}
              >
                <h1>Hi, {user.email ? user.email : 'friend'}!</h1>
                <h2>Your current user info</h2>
                <ul>User info here</ul>
                <ul>ID {user.id ? user.id : '0'}</ul>
                <ul>logged in as {user.roles ? user.roles : '0'}</ul>
                {/*feedData?<DataGrid title={"Feed List"}
                  data={feedData}
                  />:""*/}
                {feedData ? (
                  <div>
                    <h1>Item Table</h1>
                    <table
                      className="table table-responsive table-bordered"
                      style={{
                        tableLayout: 'fixed',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      <thead>
                        <tr>
                          {Object.entries(feedData[0]).map(([key, value]) => {
                            return (
                              <th>
                                <td className="w-auto">{key}</td>
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {feedData.map((feed, index) => {
                          return (
                            <tr key={index}>
                              {Object.entries(feed).map(([key, value], i) => {
                                return (
                                  <td
                                    style={{
                                      whiteSpace: 'nowrap',
                                      textOverflow: 'ellipsis',
                                      overflowX: 'hidden',
                                      width: 'auto',
                                      maxWidth: '350px',
                                      maxHeight: '100px',
                                      overflow: 'scroll',
                                    }}
                                  >
                                    <td
                                      style={{
                                        textOverflow: 'ellipsis',
                                        maxHeight: '500px',
                                        height: '5vw',
                                        width: 'auto',
                                      }}
                                    >
                                      {value}
                                    </td>
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="container-fluid card">
              <div
                className="card align-self-center"
                style={{ minWidth: '75%', padding: '5rem 5rem' }}
              >
                <label>RSSFeed Table</label>
                <label>Feeds</label>
                <input type="text" placeholder="" />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    let tmpresult = FeedDataHandler();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </>
        )}
      </>
    );
  };
  const Redirect = () => (
    <>
      Redirecting...
      {isLoggedIn() ? navigate('/almaccount/home') : navigate('/almlogin')}
    </>
  );

  return (
    <BrowserRouter>
      <Provider store={store}>
        {!isLoggedIn() ? (
          <>{navigate('/almlogin')}</>
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
                //localStorage.clear();
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
