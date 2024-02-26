import axios from 'axios';
import { resolveConfig } from 'prettier';
import { useSelector, useDispatch } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  toggle_logged_in,
  set_logged_in_as,
  set_email,
  return_logged_in,
} from '../services/userSlice';
import { getUserTokens, setUser } from '../services/auth';

// todoActions.js
import { TODO_ERROR } from './ActionTypes';

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
      return false;
    });
}

export const isTokenFresh = async () => {
  try {
    const response = await axios.get(
      `${process.env.GATSBY_HEROKU_BASEURL}/protected`,
      { headers: { Authorization: `Bearer ${getUserTokens().access_token}` } }
    );
    console.log('isTokenFresh response =', response);
    return true;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return false;
    } else {
      throw error;
    }
  }
};

export const refreshToken = async () => {
  try {
    console.log(
      'refrestToken',
      'getUserTokens().access_token',
      getUserTokens().access_token,
      'refresh_token',
      getUserTokens().refresh_token,
      'expires_in',
      getUserTokens().expires_in
    );

    const response = await axios.post(
      `${process.env.GATSBY_HEROKU_BASEURL}/refresh`,
      { refresh_token: getUserTokens().refresh_token },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getUserTokens().refresh_token}`,
        },
      }
    );
    console.log('refreshToken post response', response);
    const { access_token } = response.data;
    let refresh_token = getUserTokens().access_token;
    let user = window.localStorage.getItem('user');
    let expires_in = user.expires_in;
    console.log(
      'user',
      user,
      'refresh_token',
      refresh_token,
      'access_token',
      access_token,
      'expires_in',
      expires_in
    );

    window.localStorage.setItem(
      'user',
      JSON.stringify({
        access_token,
        refresh_token,
        expires_in: expires_in,
      })
    );
    return { access_token, refresh_token };
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

export const refreshProvidedToken = async ({
  access_token,
  refresh_token,
  expires_in,
}) => {
  try {
    console.log(
      'refreshProvidedToken - ',
      'access_token',
      access_token,
      'refresh_token',
      refresh_token,
      'expires_in',
      expires_in
    );

    const response = await axios.post(
      `${process.env.GATSBY_HEROKU_BASEURL}/refresh`,
      { refresh_token: refresh_token },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refresh_token}`,
        },
      }
    );
    console.log('refreshToken post response', response);
    const data = response.data;
    //let user = window.localStorage.getItem('user');
    //console.log('user', user, 'refreshToken', refreshToken);

    window.localStorage.setItem(
      'user',
      JSON.stringify({
        access_token: data.access_token,
        refresh_token: refresh_token,
        expires_in: expires_in,
      })
    );
    return { access_token, refresh_token, expires_in };
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

export async function getCurrentUser() {
  try {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = storedUser?.access_token;

    if (!storedToken) {
      throw new Error('Token not found in local storage');
    }

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${storedToken}`,
    };

    const response = await axios.get(
      `${process.env.GATSBY_HEROKU_BASEURL}/protected`,
      {
        headers,
        timeout: 5000,
      }
    );

    localStorage.setItem('userinfo', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error('Error getting current user:', error);
    throw error;
  }
}

export async function addFeed({ feedURL, textFile }) {
  let tmpUser = JSON.parse(localStorage.getItem('user'));
  let tmpUserInfo = JSON.parse(localStorage.getItem('userinfo'));
  configHeaders['Authorization'] = 'Bearer ' + tmpUser['access_token'];
  let data = {
    url: feedURL,
    person_id: tmpUserInfo['id'],
    update_feed: true,
    textfile: textFile,
  };

  const response = await axios({
    method: 'post',
    url: process.env.GATSBY_HEROKU_BASEURL + '/textfile',
    timeout: 10000,
    headers: configHeaders,
    body: { data },
    data: { data },
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
      return { error: error, data: data };
      //console.log(error.response.request._response);
    });
}

export async function getFeed({ userID }) {
  let tmpUser = JSON.parse(localStorage.getItem('user'));
  let tmpUserInfo = JSON.parse(localStorage.getItem('userinfo'));
  configHeaders['Authorization'] = 'Bearer ' + tmpUser['access_token'];

  let data = {};
  let checkUID = function (userID) {
    if (typeof userID === 'undefined' || userID === null) {
      data = {
        person_id: 'all',
      };
      return data;
    } else {
      data = {
        person_id: tmpUserInfo['id'],
      };
      return data;
    }
  };

  data = checkUID(userID);
  console.log('data', data);

  const response = await axios({
    method: 'get',
    url: process.env.GATSBY_HEROKU_BASEURL + '/textfile',
    timeout: 10000,
    headers: configHeaders,
    body: { data },
    data: { data },
  })
    .then((response) => {
      if (response.data) {
        console.log('axios response - ', response);
        localStorage.setItem('userfeed', JSON.stringify(response.data));
        return JSON.stringify(response.data);
      }
    })
    .catch((error) => {
      return { error: error, data: data };
    });
}

//todo actions

// Action creator for handling errors
export const todoError = (error) => ({
  type: TODO_ERROR,
  payload: error,
});

// Action creator for fetching todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  let tmpUser = JSON.parse(localStorage.getItem('user'));

  const response = await axios.get(
    process.env.GATSBY_HEROKU_BASEURL + '/api/todos/',
    {
      headers: {
        Authorization: 'Bearer ' + tmpUser['access_token'],
      },
    }
  );
  return response.data;
});

// Action creator for adding a todo
export const addTodo = createAsyncThunk('todos/todoAdded', async (todoData) => {
  let tmpUser = JSON.parse(localStorage.getItem('user'));

  const response = await axios.post(
    process.env.GATSBY_HEROKU_BASEURL + '/api/todos',
    todoData,
    {
      headers: {
        Authorization: 'Bearer ' + tmpUser['access_token'],
      },
    }
  );
  return response.data;
});

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, updatedText }) => {
    try {
      let tmpUser = JSON.parse(localStorage.getItem('user'));
      const updatedData = { text: updatedText };
      console.log('Updating todo with id:', id, 'and text:', updatedText);
      const response = await axios.put(
        process.env.GATSBY_HEROKU_BASEURL + `/api/todos/${id}`,
        updatedData,
        {
          headers: {
            Authorization: 'Bearer ' + tmpUser['access_token'],
          },
        }
      );
      if (response.status === 200) {
        return { id, updatedText };
      } else {
        console.error('Failed to delete todo');
        return false;
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/todoDeleted',
  async (id, thunkAPI) => {
    let tmpUser = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await axios.delete(
        process.env.GATSBY_HEROKU_BASEURL + `/api/todos/${id}`,
        {
          headers: {
            Authorization: 'Bearer ' + tmpUser['access_token'],
          },
        }
      );
      if (response.status === 200) {
        return id;
      } else {
        return thunkAPI.rejectWithValue('Failed to delete todo');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
