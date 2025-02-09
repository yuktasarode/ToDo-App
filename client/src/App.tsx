import { useState } from "react";
import "./App.css";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  // Function to add a new task
  const addToList = () => {
    if (inputValue.trim() === "") return;

    const newTask: Task = {
      id: Date.now(), // Unique ID
      text: inputValue,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  // Function to remove a task
  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Function to toggle completion status
  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="container">
      <h1 className="header">To-do List</h1>

      {/* Input Section */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Add your task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && addToList()} // Allow "Enter" key
        />
        <button type="button" onClick={addToList}>ADD</button>
      </div>

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? "active" : ""}`}>
            <button className="btn-check" onClick={() => toggleTaskCompletion(task.id)}>
              <i className="fa-solid fa-check"></i>
            </button>
            <span className="text">{task.text}</span>
            <button className="btn-close" onClick={() => removeTask(task.id)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
