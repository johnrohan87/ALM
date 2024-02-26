import { createSlice } from '@reduxjs/toolkit';

import {
  getCurrentUser,
  getToken,
  addFeed,
  getFeed,
  refreshProvidedToken,
} from '../../common/contexts/AxiosContext';
import {
  getUser,
  isLoggedIn,
  getUserTokens,
  getRemainingSecondsUntilExpiry,
} from './auth';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    access_token: null,
    refresh_token: null,
    expires_in: null,
    loading: false,
    logged_in: false,
    logged_in_as: null,
    email: null,
    feed: null,
  },
  reducers: {
    toggle_logged_in: (state) => {
      return {
        ...state,
        logged_in: !state.logged_in.value,
      };
      //state.user.logged_in.value += !state.user.logged_in.value
    },
    toggle_loading: (state) => {
      return {
        ...state,
        loading: !state.loading.value,
      };
    },
    set_logged_in_as: (state, action) => {
      state.user.logged_in_as += action.payload;
    },
    set_email: (state, action) => {
      state.user.email += action.payload;
    },
    set_token: (state, action) => {
      return {
        ...state,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
        expires_in: action.payload.expires_in,
      };
    },
    set_userinfo: (state, action) => {
      return {
        ...state,
        email: action.payload.email,
        logged_in_as: action.payload.roles,
      };
    },
    set_feed_toState: (state, action) => {
      return {
        ...state,
        feed: action.payload,
      };
    },
  },
});

export const {
  toggle_loading,
  toggle_logged_in,
  set_logged_in_as,
  set_email,
  set_token,
  set_userinfo,
  set_feed_toState,
} = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const return_logged_in = (state) => state.user.logged_in.value;
export const return_loading = (state) => state.user.loading.value;
export const getUserState = (state) => state;

export function fetchLoginData({ email, password }) {
  return async (dispatch, getState) => {
    try {
      //test for existing token
      let storedToken = getUser();
      if (storedToken.access_token) {
        //check for freshness
        let remainingFreshness = getRemainingSecondsUntilExpiry(
          storedToken.access_token
        );
        console.log('remainingFreshness', remainingFreshness);

        //determine if token is fresh or needs refreshing
        if (remainingFreshness > 0) {
          //Token is fresh
          dispatch(
            set_token({
              access_token: storedToken.access_token,
              refresh_token: storedToken.refresh_token,
              expires_in: storedToken.expires_in,
            })
          );
          dispatch(toggle_logged_in());
        } else {
          //Token need refreshing
          console.log('Token need refreshing ', storedToken);
          refreshProvidedToken({
            access_token: storedToken.access_token,
            refresh_token: storedToken.refresh_token,
            expires_in: storedToken.expires_in,
          });
        }
      } else {
        await getToken({ email, password }).then(() => {
          let result = JSON.parse(localStorage.getItem('user'));

          if (result != undefined) {
            dispatch(set_token(result));
            dispatch(toggle_logged_in());
          }
        });
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };
}

export function fetchUserData() {
  return async (dispatch, getState) => {
    try {
      await getCurrentUser().then(() => {
        let result = JSON.parse(localStorage.getItem('userinfo'));
        if (result != undefined) {
          dispatch(set_userinfo(result));
        }
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  };
}

export function submitFeedData({ feedURL, textFile }) {
  return async (dispatch, getState) => {
    try {
      await addFeed({ feedURL, textFile }).then(() => {
        let result = JSON.parse(localStorage.getItem('user'));
        if (result != undefined) {
          dispatch(set_token(result));
          dispatch(toggle_logged_in());
        }
      });
    } catch (error) {
      console.log('submitFeedData', error.response.data);
      return error;
    }
  };
}

export function getFeedData({ userID }) {
  return async (dispatch, getState) => {
    try {
      await getFeed({ userID }).then(() => {
        let result = JSON.parse(localStorage.getItem('userfeed'));
        if (result != undefined) {
          //console.log(result)
          //dispatch(set_feed_toState(JSON.stringify(result)));
          return result;
        }
      });
    } catch (error) {
      console.log('getFeedData', error);
      return error;
    }
  };
}

export default userSlice.reducer;
