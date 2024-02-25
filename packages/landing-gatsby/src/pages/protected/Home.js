import React from 'react';
import { useSelector } from 'react-redux';
import { navigate } from 'gatsby';

const Home = ({ user, userinfo }) => {
  return (
    <>
      <h1>Hi, {userinfo?.email ? userinfo.email : 'friend'}!</h1>
      <h2>Your current user info</h2>
      <ul>User info here</ul>
      <ul>ID {userinfo?.id ? userinfo.id : '0'}</ul>
      <ul>Roles {userinfo?.roles ? userinfo.roles : 'null'}</ul>
      <br />
      <div>
        <div>Access Token: {user?.access_token}</div>
        <div>Refresh Token: {user?.refresh_token}</div>
        <div>Expires In: {user?.expires_in}</div>
      </div>
      {/*<button
        className="btn btn-primary btn-login text-uppercase fw-bold"
        onClick={() => navigate('/todoapp')}
      >
        Test ToDo app
        </button>*/}
    </>
  );
};

export { Home };
