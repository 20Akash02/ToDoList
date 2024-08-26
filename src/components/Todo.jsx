

import React, { useRef, useState, useEffect } from "react";
import TodoItems from "./TodoItems";

const Todo = () => {
  const inputRef = useRef();
  const [todos, setTodos] = useState(() => {
    // Retrieve todos from localStorage or initialize with an empty array
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Save todos to localStorage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTask() {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") {
      alert("Enter a task to Add");
      return;
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isCompleted: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    inputRef.current.value = "";
  }

  function deleteTodo(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function toggleTodoCompletion(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }

  return (
    <div className="bg-purple-200 w-full min-h-screen flex items-center justify-center">
      <div className="min-h-72 min-w-72 rounded shadow-2xl shadow-purple-600">
        <h1 className="text-3xl text-white flex justify-center bg-purple-500 mb-3">
          To-Do List
        </h1>
        <div className="flex justify-evenly">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter Task"
            className="rounded-lg"
          />
          <button
            className="flex items-center rounded-lg text-white bg-purple-100 w-10"
            onClick={addTask}
          >
            &nbsp;&nbsp;➕
          </button>
        </div>
        <div className="mt-5 flex flex-col ml-10">
          <div>
            {todos.map((todo) => (
              <div key={todo.id} className="flex justify-between items-center mb-2">
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() => toggleTodoCompletion(todo.id)}
                  className="w-4 h-4 rounded bg-purple-400"
                />
                <TodoItems
                  text={todo.text}
                  isCompleted={todo.isCompleted}
                />
                <button
                  className="ml-4 rounded-lg text-white bg-transparent"
                  onClick={() => deleteTodo(todo.id)}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;

