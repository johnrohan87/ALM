import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from 'gatsby';
const Home = ({ user, userinfo }) => {
  //const user = useSelector((state) => state.user);
  //const dispatch = useDispatch();
  //const user = useSelector((state) => state.user);

  //console.log(user);
  return (
    <>
      <h1>Hi, {user.email ? user.email : 'friend'}!</h1>
      <h2>Your current user info</h2>
      <ul>User info here</ul>
      <ul>ID {user.logged_in_as ? user.logged_in_as : '0'}</ul>
      <ul>feed {user.feed ? user.feed : 'null'}</ul>
      <br />
      {user}
      <button
        className="btn btn-primary btn-login text-uppercase fw-bold"
        onClick={() => navigate('/todoapp')}
      >
        Test ToDo app
      </button>
    </>
  );
};
export { Home };
