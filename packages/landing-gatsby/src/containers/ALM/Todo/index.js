import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
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
  const todos = useSelector((state) => state.todos);
  const [newTodoText, setNewTodoText] = useState('');
  const [editingTodos, setEditingTodos] = useState({});

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos, deleteTodo]);

  const handleAddTodo = () => {
    if (newTodoText.trim() !== '') {
      addTodo({ text: newTodoText });
      setNewTodoText('');
    }
  };

  const handleUpdateTodo = (id, newText) => {
    updateTodo(id, { text: newText });
    setEditingTodos({ ...editingTodos, [id]: false });
  };

  const handleEditTodo = (id, text) => {
    setEditingTodos({ ...editingTodos, [id]: true });
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
                value={
                  editingTodos[todo.id] ? editingTodos[todo.id] : todo.text
                }
                onChange={(e) => {
                  const { value } = e.target;
                  setEditingTodos({
                    ...editingTodos,
                    [todo.id]: { ...editingTodos[todo.id], text: value },
                  });
                }}
                disabled={!editingTodos[todo.id]}
              />
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
              {editingTodos[todo.id] ? (
                <button
                  onClick={() =>
                    handleUpdateTodo(todo.id, editingTodos[todo.id])
                  }
                >
                  Save
                </button>
              ) : (
                <button onClick={() => handleEditTodo(todo.id, todo.text)}>
                  Edit
                </button>
              )}
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
