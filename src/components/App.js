import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState('');
  const [editId, setEditId] = useState(0);
  const [viewAll, setViewAll] = useState(false);
  const todoNameRef = useRef();
  const LOCAL_STORAGE_KEY = 'game12-todos';

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (savedItems) setTodos(savedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function markComplete(id) {
    const date = new Date();
    const updatedTodos = todos.map(t =>
      t.id === id
        ? {
            id: t.id,
            name: t.name,
            complete: !t.complete,
            created: t.created,
            dateCompleted: date.toDateString(),
          }
        : { id: t.id, name: t.name, complete: t.complete, created: t.created, dateCompleted: t.dateCompleted }
    );
    setTodos(updatedTodos);
  }

  function view() {
    if (viewAll) {
      setViewAll(false);
    } else {
      setViewAll(true);
    }
  }

  function addTodo(e) {
    e.preventDefault();
    if (editId) {
      const editTodo = todos.find(todo => todo.id === editId);
      const updatedTodos = todos.map(t =>
        t.id === editTodo.id
          ? { id: editTodo.id, name: todoName, complete: editTodo.complete, created: editTodo.created }
          : { id: t.id, name: t.name, complete: t.complete, created: t.created }
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodoName('');
      return;
    }
    const date = new Date();
    const name = todoNameRef.current.value;
    if (name === '') return;
    setTodos(prev => {
      return [...prev, { id: uuidv4(), name: name, complete: false, created: date.toDateString() }];
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
        <h1>Todos</h1>
        <form className="todoForm" onSubmit={addTodo}>
          <input ref={todoNameRef} type="text" value={todoName} onChange={e => setTodoName(e.target.value)} />
          <button type="submit">{editId ? 'edit' : '+'}</button>
          <button onClick={view}>{!viewAll ? 'View all' : 'View active'}</button>
        </form>
        <div>{todos.filter(todo => !todo.complete).length} left to do</div>
        <ul className="allTodos">
          <TodoList
            todos={todos}
            markComplete={markComplete}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
            viewAll={viewAll}
          />
        </ul>
      </div>
    </div>
  );
}

export default App;
