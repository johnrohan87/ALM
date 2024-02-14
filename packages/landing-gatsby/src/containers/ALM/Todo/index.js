import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from '../../../common/contexts/AxiosContext';

import BannerWrapper, {
  AboutWrapper,
  //SearchWrapper,
  List,
  //DiscountWrapper,
  //DiscountLabel,
  HeaderList,
  Expierence_Projects_Block,
} from './about.style';

function TodoApp({ fetchTodos, addTodo, updateTodo, deleteTodo }) {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  useEffect(() => {
    // Fetch todos on component mount
    fetchTodos();
  }, [fetchTodos, deleteTodo]);

  const [newTodoText, setNewTodoText] = useState('');
  const [updatedTodoText, setUpdatedNewTodoText] = useState('');
  const [updatedTodoId, setUpdatedTodoId] = useState(null);

  const handleAddTodo = () => {
    if (newTodoText.trim() !== '') {
      addTodo({ text: newTodoText });
      setNewTodoText('');
    }
  };

  const handleUpdateTodo = (id, newText) => {
    setUpdatedTodoId(id);
    setUpdatedTodoText(newText);
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id);
  };

  return (
    <HeaderList>
      <h1>ToDo List</h1>
      <ul>
        {todos ? (
          todos.todos.map((todo) => (
            <List key={todo.id}>
              <input
                type="text"
                value={todo.id === updatedTodoId ? updatedTodoText : todo.text}
                onChange={(e) => setUpdatedNewTodoText(e.target.value)}
              />
              <button
                onClick={() => {
                  handleDeleteTodo(todo.id);
                }}
              >
                Delete
              </button>
              <button
                onClick={(e) => {
                  handleUpdateTodo(todo.id, updatedTodoText);
                }}
              >
                Update
              </button>
            </List>
          ))
        ) : (
          <div>No todos found</div>
        )}
      </ul>
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        placeholder="Enter new task"
      />
      <button onClick={handleAddTodo}>Add Task</button>
    </HeaderList>
  );
}

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
