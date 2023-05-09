import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState('');
  const [editId, setEditId] = useState(0);
  const todoNameRef = useRef();
  const LOCAL_STORAGE_KEY = 'game12-todos';

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (savedItems) setTodos(savedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function markComplete() {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => !todo.complete);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function addTodo(e) {
    e.preventDefault();

    if (editId) {
      const editTodo = todos.find(todo => todo.id === editId);
      const updatedTodos = todos.map(t =>
        t.id === editTodo.id
          ? (t = {
              id: editTodo.id,
              name: todoName,
              completed: editTodo.completed,
              created: editTodo.created,
            })
          : { id: t.id, name: t.name, completed: t.completed, created: t.created }
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodoName('');
      return;
    }

    const name = todoNameRef.current.value;
    if (name === '') return;
    setTodos(prev => {
      return [...prev, { id: uuidv4(), name: name, completed: false, created: Date.now() }];
    });
    todoNameRef.current.value = null;
    setTodoName('');
  }

  function deleteTodo(id) {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  }

  function editTodo(id) {
    const editTodo = todos.find(todo => todo.id === id);
    setTodoName(editTodo.name);
    setEditId(id);
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Todo List</h1>
        <form className="todoForm" onSubmit={addTodo}>
          <input
            className="tbd"
            ref={todoNameRef}
            type="text"
            value={todoName}
            onChange={e => setTodoName(e.target.value)}
          />
          <button className="tbd" type="submit">
            {editId ? 'edit' : '+'}
          </button>
          <button className="tbd" onClick={markComplete}>
            DeleteC
          </button>
        </form>
        <div className="tbd">{todos.filter(todo => !todo.complete).length} left to do</div>
        <ul className="allTodos">
          <TodoList todos={todos} markComplete={markComplete} editTodo={editTodo} deleteTodo={deleteTodo} />
        </ul>
      </div>
    </div>
  );
}

export default App;
