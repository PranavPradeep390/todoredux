import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, toggleTodo } from './TodoSlice';
import './App.css'

function App() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  const handleAddTodo = () => {
    if (text.trim() !== '') {
      dispatch(addTodo({
        id: Date.now(),
        text,
        completed: false,
      }));
      setText('');
    }
  };

  const handleDeleteTodo = id => {
    dispatch(deleteTodo(id));
  };

  const handleToggleTodo = id => {
    dispatch(toggleTodo(id));
  };

  const completedTodosCount = todos.filter(todo => todo.completed).length;

  return (
    <div>
      <h1>Todo App</h1>
      <input 
        type="text" 
        value={text} 
        onChange={e => setText(e.target.value)} 
        placeholder="Enter todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      
      <div>
        {todos.map(todo => (
          <div key={todo.id} style={{backgroundColor: todo.completed ? 'lightgray' : 'transparent', padding: '5px', marginBottom: '5px'}}>
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => handleToggleTodo(todo.id)} 
            />
             {todo.text}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
      {completedTodosCount > 0 && <p>Number of completed todos: {completedTodosCount}</p>}
    </div>
  );
}

export default App;
