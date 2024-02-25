import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submitFeedData, getFeedData } from '../../common/services/userSlice';

const PullFeed = () => {
  //useEffect(() => {}, [user]);

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
  );
};

export default PullFeed;
