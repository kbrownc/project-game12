import React from 'react';

function Todo({ todo, markComplete, editTodo, deleteTodo }) {
  return (
    <div className="addbutton">
      <li className={todo.complete ? 'singleTodo-complete' : 'singleTodo'}>
        <span className="itemText">{todo.name}</span>
        <button onClick={() => editTodo(todo.id)}>Edit</button>
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        <button onClick={() => markComplete(todo.id)}>Complete</button>
      </li>
      <div>
        Created: {todo.created} Completd: {todo.dateCompleted}
      </div>
    </div>
  );
}

export default Todo;
