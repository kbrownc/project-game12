import React from 'react';

function Todo({ todo, markComplete, editTodo, deleteTodo }) {

  // function todoClick() {
  //   markComplete(todo.id);
  // }

  return (
    <div className="addbutton">
      <li className="singleTodo">
        {todo.complete ? "x " : null}
        <span className="itemText">{todo.name}</span>
        <button onClick={() => editTodo(todo.id)}>Edit</button>
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        <button onClick={markComplete}>Complete</button>
      </li>
    </div>
  );
}

export default Todo;
