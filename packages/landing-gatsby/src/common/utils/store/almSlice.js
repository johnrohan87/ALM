import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

export const almSlice = createSlice({
  name: 'alm_db',
  initialState: {
    user: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    updateStore: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateStore } = almSlice.actions;

export const fetchPosts = createAsyncThunk('alm_db/fetchRoles', async () => {
  const response = await client.get('/fakeApi/posts');
  return response.posts;
});

export default almSlice.reducer;
