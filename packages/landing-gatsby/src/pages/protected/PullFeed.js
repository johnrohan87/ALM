import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submitFeedData, getFeedData } from '../../common/services/userSlice';

const PullFeed = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [feedURL, setFeedURL] = useState('');
  const [textFile, setTextFile] = useState('');
  const [submitFeed, setSubmitFeed] = useState('');
  const [feedData, setFeedData] = useState(null);

  const submitHandler = () => {
    dispatch(submitFeedData({ feedURL, textFile }));
    console.log('dispatching', feedURL, textFile);
    setSubmitFeed('submitted - ' + feedURL + ' textFile - ' + textFile);
  };

  const feedDataHandler = async () => {
    await dispatch(getFeedData('all'));
    const result = JSON.parse(localStorage.getItem('userfeed'));
    console.log('result', result, 'feedData', feedData);
    setFeedData(result);
  };

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={submitHandler}>
        Submit
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={feedDataHandler}
      >
        Get Feed Data
      </button>
    </>
  );
};

export default PullFeed;
