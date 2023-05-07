import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import {v4 as uuidv4} from 'uuid'

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  const LOCAL_STORAGE_KEY = 'game12-todos';

  useEffect( () => {
    const savedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (savedItems) setTodos(savedItems)
  }, [])

  useEffect( () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function markComplete(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function addTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prev => {
      return [...prev, { id: uuidv4(), name: name, completed: false}]
    })
    todoNameRef.current.value = null
  };

  function deleteTodo(e) {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  };

  return (
    <>
      <TodoList todos={todos} markComplete={markComplete} />
      <input ref={todoNameRef} type="text" />
      <button onClick={addTodo}>Add</button>
      <button onClick={deleteTodo}>Delete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do
      </div>
    </>
  );
};

export default App;
