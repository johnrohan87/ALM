import axios from 'axios';
import { resolveConfig } from 'prettier';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggle_logged_in,
  set_logged_in_as,
  set_email,
  return_logged_in,
} from '../services/userSlice';

let configHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export async function verifyUser({ token }) {
  try {
    const response = await axios({
      method: 'get',
      url: process.env.GATSBY_HEROKU_BASEURL + '/protected',
      timeout: 5000,
      headers: configHeaders,
      data: { token: token.token },
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

export async function getToken({ email, password }) {
  const response = await axios({
    method: 'post',
    url: process.env.GATSBY_HEROKU_BASEURL + '/login',
    timeout: 10000,
    headers: configHeaders,
    body: { email, password },
    data: { email: email, password: password },
  })
    .then((response) => {
      if (response.data) {
        console.log('axios response - ', response);
        localStorage.setItem('user', JSON.stringify(response.data));
      }
    })
    .catch((error) => {
      //console.error("axios response error - ",error);
      //console.error("axios response data - ",email,password);
      return false;
      //console.log(error.response.request._response);
    });
}

export async function getCurrentUser() {
  try {
    let tmpDict = JSON.parse(localStorage.getItem('user'));
    configHeaders['Authorization'] = 'Bearer ' + tmpDict['access_token'];

    const response = await axios({
      method: 'get',
      url: process.env.GATSBY_HEROKU_BASEURL + '/protected',
      timeout: 5000,
      headers: configHeaders,
    });
    //console.log(response);
    localStorage.setItem('userinfo', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error(error);
  }
  //return JSON.parse(localStorage.getItem('user'));
}

export async function addFeed({ feedURL, textFile }) {
  let tmpUser = JSON.parse(localStorage.getItem('user'));
  let tmpUserInfo = JSON.parse(localStorage.getItem('userinfo'));
  configHeaders['Authorization'] = 'Bearer ' + tmpUser['access_token'];
  let feedData = {
    url: feedURL,
    person_id: tmpUserInfo['id'],
    update_feed: 'true',
    textfile: textFile,
  };

  const response = await axios({
    method: 'post',
    url: process.env.GATSBY_HEROKU_BASEURL + '/textfile',
    timeout: 10000,
    headers: configHeaders,
    body: { feedData },
    data: { feedData },
  })
    .then((response) => {
      if (response.data) {
        console.log('axios response - ', response);
        //localStorage.setItem('user', JSON.stringify(response.data));
        return response;
      }
    })
    .catch((error) => {
      //console.error("axios response error - ",error);
      //console.error("axios response data - ",email,password);
      return { error: error, feedData: feedData };
      //console.log(error.response.request._response);
    });
}
