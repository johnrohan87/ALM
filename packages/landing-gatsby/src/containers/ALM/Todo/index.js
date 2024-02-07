import React, { useState, useRef } from 'react';

import BannerWrapper, {
  AboutWrapper,
  //SearchWrapper,
  List,
  //DiscountWrapper,
  //DiscountLabel,
  HeaderList,
  Expierence_Projects_Block,
} from './about.style';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  const addTodo = () => {
    const inputValue = inputRef.current.value.trim();
    if (inputValue !== '') {
      setTodos([...todos, inputValue]);
      inputRef.current.value = '';
    }
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <List>
      <h1>ToDo List</h1>
      <input type="text" ref={inputRef} placeholder="Enter a new task" />
      <button onClick={addTodo}>Add Task</button>
      <HeaderList>
        {todos.map((todo, index) => (
          <List key={index}>
            {todo}
            <button onClick={() => removeTodo(index)}>Remove</button>
          </List>
        ))}
      </HeaderList>
    </List>
  );
}

export default TodoApp;
