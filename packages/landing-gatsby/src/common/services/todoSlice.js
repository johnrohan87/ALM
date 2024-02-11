import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from '../contexts/AxiosContext';

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded(state, action) {
      state.todos.push(action.payload);
    },
    todoUpdated(state, action) {
      const { id, updatedData } = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        state.todos[todoIndex] = { ...state.todos[todoIndex], ...updatedData };
      }
    },
    todoDeleted(state, action) {
      const id = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.todos.push(action.payload);
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action, payload) => {
        state.loading = false;
        state.error = null;
        const id = action.payload;
        state.todos = state.todos.filter((todo) => todo.id !== id);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { todoAdded, todoUpdated, todoDeleted } = todoSlice.actions;

export default todoSlice.reducer;
