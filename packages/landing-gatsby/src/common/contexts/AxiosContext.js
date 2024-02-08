import axios from 'axios';
import { resolveConfig } from 'prettier';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggle_logged_in,
  set_logged_in_as,
  set_email,
  return_logged_in,
} from '../services/userSlice';

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

// Action creators for fetching todos
export const fetchTodos = () => {
  let tmpUser = JSON.parse(localStorage.getItem('user'));
  return (dispatch) => {
    axios
      .get(process.env.GATSBY_HEROKU_BASEURL + '/api/todos', {
        headers: {
          Authorization: 'Bearer ' + tmpUser['access_token'],
        },
      })
      .then((response) => {
        dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: response.data });
      })
      .catch((error) => {
        dispatch(todoError(error.message));
      });
  };
};

// Action creators for adding a todo
export const addTodo = (todoData) => {
  let tmpUser = JSON.parse(localStorage.getItem('user'));
  return (dispatch) => {
    axios
      .post(process.env.GATSBY_HEROKU_BASEURL + '/api/todos', todoData, {
        headers: {
          Authorization: 'Bearer ' + tmpUser['access_token'],
        },
      })
      .then((response) => {
        dispatch({ type: 'ADD_TODO_SUCCESS', payload: response.data });
      })
      .catch((error) => {
        dispatch(todoError(error.message));
      });
  };
};

// Action creators for updating a todo
export const updateTodo = (id, updatedData) => {
  let tmpUser = JSON.parse(localStorage.getItem('user'));
  return (dispatch) => {
    axios
      .put(
        process.env.GATSBY_HEROKU_BASEURL + `/api/todos/${id}`,
        updatedData,
        {
          headers: {
            Authorization: 'Bearer ' + tmpUser['access_token'],
          },
        }
      )
      .then(() => {
        dispatch({ type: 'UPDATE_TODO_SUCCESS', payload: { id, updatedData } });
      })
      .catch((error) => {
        dispatch(todoError(error.message));
      });
  };
};

// Action creators for deleting a todo
export const deleteTodo = (id) => {
  let tmpUser = JSON.parse(localStorage.getItem('user'));
  return (dispatch) => {
    axios
      .delete(process.env.GATSBY_HEROKU_BASEURL + `/api/todos/${id}`, {
        headers: {
          Authorization: 'Bearer ' + tmpUser['access_token'],
        },
      })
      .then(() => {
        dispatch({ type: 'DELETE_TODO_SUCCESS', payload: id });
      })
      .catch((error) => {
        dispatch(todoError(error.message));
      });
  };
};
