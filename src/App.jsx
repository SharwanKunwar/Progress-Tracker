import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './Context';
import TodoForm from './Components/TodoForm';
import TodoItems from './Components/TodoItems';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((pre) => [{ id: Date.now(), ...todo }, ...pre]);
  };

  const updateTodo = (id, todo) => {
    setTodos((pre) =>
      pre.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((pre) => pre.filter((item) => item.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((pre) =>
      pre.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Load from localStorage on mount
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div
        className="min-h-screen py-8"
        style={{
          background: 'linear-gradient(to right, #C06C84, #6C5B7B, #355C7D)',
        }}
      >
       <div className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-lg px-4 py-3 text-white">

          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Today's Plan "Table of Content"
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItems todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
