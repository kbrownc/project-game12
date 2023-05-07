import React from 'react';

function Todo({ todo, markComplete }) {

  function todoClick() {
    markComplete(todo.id)
  }

  return (
    <div>
      <label>
      <input type="checkbox" checked={todo.complete} onChange={todoClick}/>
      {todo.name}
      </label>
    </div>
  );
}

export default Todo;
