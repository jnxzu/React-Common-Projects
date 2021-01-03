import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './ToDo.scss';

function ToDo() {
  const [currentId, setCurrentId] = useState(2);
  const [todos, setTodos] = useState([
    { id: 0, task: 'do that thing there', completed: false },
    { id: 1, task: 'complete the todo component', completed: true },
  ]);
  const { register, handleSubmit } = useForm();

  const add = (data) => {
    if (todos.length < 8) {
      setTodos([
        ...todos,
        { id: currentId, task: data.task, completed: false },
      ]);
      setCurrentId(currentId + 1);
    }
  };

  const toggle = (id) =>
    setTodos(
      todos.map((todo) => {
        if (todo.id === id)
          return { id: todo.id, task: todo.task, completed: !todo.completed };
        return todo;
      })
    );

  const remove = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div id="todo" className="todo">
      <div className="todo__container">
        <div className="todo__container__new">
          <form onSubmit={handleSubmit(add)}>
            <input
              type="text"
              name="task"
              placeholder="Your new task..."
              autoComplete="off"
              ref={register({ required: true, minLength: 2, maxLength: 35 })}
            />
            {todos.length < 8 && <input type="submit" value="Add" />}
          </form>
        </div>
        <TransitionGroup className="todo__container__list">
          {todos.map((todo) => (
            <CSSTransition key={todo.id} timeout={250} classNames="task">
              <div
                className={`todo__container__list__task ${
                  todo.completed ? 'completed' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggle(todo.id)}
                />
                <h2>{todo.task}</h2>
                <button type="button" onClick={() => remove(todo.id)}>
                  ❌
                </button>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
}

export default ToDo;
