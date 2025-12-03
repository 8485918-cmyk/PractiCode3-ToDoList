import React, { useEffect, useState } from 'react';
import service from './service.js';
import "./App.css";


function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    const todos = await service.getTasks();
    setTodos(todos);
  }

  async function createTodo(e) {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const created = await service.addTask(newTodo);
    setTodos(prev => [...prev, created]);
    setNewTodo("");
  }

  async function updateCompleted(todo, isComplete) {
    await service.setCompleted(todo.id, isComplete, todo.name);
    setTodos(prevTodos =>
      prevTodos.map(t =>
        t.id == todo.id ? { ...t, isComplete } : t
      )
    );
  }

  async function deleteTodo(id) {
    await service.deleteTask(id);
    setTodos(prevTodos => prevTodos.filter(t => t.id !== id));
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={createTodo}>
          <input
            className="new-todo"
            placeholder="Well, let's take on the day"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button type="submit">add task</button>
        </form>
      </header>

      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={todo.isComplete ? "completed" : ""}
            >
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={todo.isComplete}
                  onChange={(e) => updateCompleted(todo, e.target.checked)}
                />
                <label>{todo.name}</label>
                <button
                  className="destroy"
                  onClick={() => deleteTodo(todo.id)}>
                  delete task
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

export default App;