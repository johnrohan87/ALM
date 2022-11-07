import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    logged_in: false,
    logged_in_as: null,
    email: null,
  },
  reducers: {
    toggle_logged_in: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return {
        ...state,
        logged_in: !state.logged_in.value,
      };
      //state.user.logged_in.value += !state.user.logged_in.value
    },
    set_logged_in_as: (state, action) => {
      state.user.logged_in_as += action.payload;
    },
    set_email: (state, action) => {
      state.user.email += action.payload;
    },
  },
});

export const {
  toggle_logged_in,
  set_logged_in_as,
  set_email,
} = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const return_logged_in = (state) => state.user.logged_in;

export default userSlice.reducer;
