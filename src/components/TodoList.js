import React from 'react';
import Todo from './Todo';

function TodoList({ todos, markComplete, editTodo, deleteTodo, viewAll }) {
  return todos
    .filter((item, index, todos) => (viewAll ? !item.complete : item.complete || !item.complete))
    .map(todo => {
      return (
        <Todo
          key={todo.id}
          todo={todo}
          markComplete={markComplete}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
          viewAll={viewAll}
        />
      );
    });
}

export default TodoList;
