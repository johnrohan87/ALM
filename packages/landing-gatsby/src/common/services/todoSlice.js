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
      console.log('State before todoAdded reducer:', state);
      state.todos.push(action.payload);
      console.log('State after todoAdded reducer:', state);
    },
    todoUpdated(state, action) {
      const { id, updatedData } = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        state.todos[todoIndex] = { ...state.todos[todoIndex], ...updatedData };
      }
    },
    todoDeleted(state, action) {
      const { id } = action.payload;
      console.log(
        id,
        state,
        state.todos.filter((todo) => todo.id !== id)
      );
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== id),
      };
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
        state.todos.push(action.payload); // Push the new todo to the todos array
      });
  },
});

export const { todoAdded, todoUpdated, todoDeleted } = todoSlice.actions;

export default todoSlice.reducer;
