import React from 'react';
import Todo from './Todo';

function TodoList({ todos, markComplete, editTodo, deleteTodo }) {
  return todos.map(todo => {
    return (
      <Todo
        key={todo.id}
        todo={todo}
        markComplete={markComplete}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
      />
    );
  });
}

export default TodoList;
