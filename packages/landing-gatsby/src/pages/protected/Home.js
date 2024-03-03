import React, { useEffect } from 'react';
import {
  Container,
  Heading,
  SubHeading,
  UserInfoList,
  TokenInfoContainer,
} from '../../containers/ALM/CSS/home.styles';

const Home = ({ user, userinfo }) => {
  return (
    <Container>
      <Heading>Hi, {userinfo?.email ? userinfo.email : 'friend'}!</Heading>
      <SubHeading>Your current user info</SubHeading>
      <UserInfoList>
        <li>ID: {userinfo?.id ? userinfo.id : '0'}</li>
        <li>Roles: {userinfo?.roles ? userinfo.roles : 'null'}</li>
      </UserInfoList>
      <br />
      <TokenInfoContainer>
        <div>Access Token: {user?.access_token}</div>
        <br />
        <div>Refresh Token: {user?.refresh_token}</div>
        <br />
        <div>Expires In: {user?.expires_in}</div>
      </TokenInfoContainer>
    </Container>
  );
};

export default Home;
