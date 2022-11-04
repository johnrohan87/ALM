import axios from 'axios';

/*const instance = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});*/

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
  try {
    const response = await axios({
      method: 'post',
      url: process.env.GATSBY_HEROKU_BASEURL + '/login',
      timeout: 5000,
      headers: configHeaders,
      body: { email, password },
      data: { email: email.email, password: password.password },
    });
    console.log(response);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
  } catch (error) {
    console.error(error);
    console.log(error.response.request._response);
  }
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
    console.log(response);
    localStorage.setItem('userinfo', JSON.stringify(response.data));
  } catch (error) {
    console.error(error);
  }
  //return JSON.parse(localStorage.getItem('user'));
}
