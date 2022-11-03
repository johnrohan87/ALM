import axios from 'axios';

/*const instance = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});*/

const configHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export async function getUser({ email, password }) {
  try {
    const response = await axios({
      method: 'get',
      url: process.env.GATSBY_HEROKU_BASEURL + '/protected',
      timeout: 5000,
      headers: configHeaders,
      params: { email: email, password: password },
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
    if (response.data.access_token) {
      localStorage.setItem(
        'access_token',
        JSON.stringify(response.data.access_token)
      );
    }
  } catch (error) {
    console.error(error);
    console.log(error.response.request._response);
  }
}

export async function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}
