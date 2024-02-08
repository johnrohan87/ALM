import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
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

function TodoApp({ todos, fetchTodos, addTodo, updateTodo, deleteTodo }) {
  useEffect(() => {
    // Fetch todos on component mount
    fetchTodos();
  }, [fetchTodos, todos]);

  const [newTodoText, setNewTodoText] = useState('');

  const handleAddTodo = () => {
    if (newTodoText.trim() !== '') {
      addTodo({ text: newTodoText });
      setNewTodoText('');
    }
  };

  const handleUpdateTodo = (id, newText) => {
    updateTodo(id, { text: newText });
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id);
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <ul>
        {todos.length ? (
          todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
              <button onClick={() => handleUpdateTodo(todo.id, 'Updated Text')}>
                Update
              </button>
            </li>
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
    </div>
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
