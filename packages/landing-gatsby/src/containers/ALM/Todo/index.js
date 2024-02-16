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
  const todos = useSelector((state) => state.todos.todos);
  const [newTodoText, setNewTodoText] = useState('');
  const [editingTodos, setEditingTodos] = useState({});
  const [updatedTexts, setUpdatedTexts] = useState({});

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
    console.log('Updated text:', newText);
    if (typeof newText !== 'string') {
      console.error('newText should be a string');
      return;
    }
    console.log('Updating todo with id:', id);
    console.log('Updating todo with new text:', newText);

    updateTodo({ id, updatedText: newText }).then(() => {
      fetchTodos();
      setUpdatedTexts((prevUpdatedTexts) => ({
        ...prevUpdatedTexts,
        [id]: newText,
      }));
      setEditingTodos((prevEditingTodos) => ({
        ...prevEditingTodos,
        [id]: false,
      }));
    });
  };

  const handleEditTodo = (id, text) => {
    setEditingTodos((prevEditingTodos) => ({
      ...prevEditingTodos,
      [id]: text,
    }));
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id);
  };

  const displayStateContents = () => {
    console.log('Current todos state:', todos);
    console.log('Current newTodoText state:', newTodoText);
    console.log('Current editingTodos state:', editingTodos);
    console.log('Current updatedTexts state:', updatedTexts);
  };

  return (
    <HeaderList>
      <h1>ToDo List</h1>
      <button onClick={displayStateContents}>Display State Contents</button>
      <ul>
        {Array.isArray(todos) ? (
          todos.map((todo) => (
            <List key={todo.id}>
              {todo.id}
              <br />
              {todo.text}
              <br />
              <input
                type="text"
                value={
                  editingTodos[todo.id]
                    ? editingTodos[todo.id]
                    : updatedTexts[todo.id] || todo.text
                }
                onChange={(e) => {
                  const { value } = e.target;
                  setEditingTodos((prevEditingTodos) => ({
                    ...prevEditingTodos,
                    [todo.id]: value,
                  }));
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
  todos: state.todos.todos,
});

const mapDispatchToProps = {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
