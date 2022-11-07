import { configureStore } from '@reduxjs/toolkit';
import almReducer from './almSlice';

export default configureStore({
  reducer: {
    alm_db: almReducer,
  },
});
