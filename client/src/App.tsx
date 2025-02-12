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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

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

  const handleSignup = async () => {
    try {
      console.log("Signup success")
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  // Handle user login
  const handleLogin = async () => {
    try {
     console.log("Login success")
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  // Handle user logout
  const handleLogout = () => {
   console.log("Logout success")
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

      {!isAuthenticated ? (
        <div className="auth-container">
          <input
            type="text"
            placeholder="Username"
          />
          <input
            type="password"
            placeholder="Password"
          />
          <button onClick={handleSignup}>Sign Up</button>
          <button onClick={handleLogin}>Log In</button>
        </div>
      ) : (
        <>
          <button onClick={handleLogout} className="logout-btn">Logout</button>

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
        </>
      )}
    </div>
  );
}

export default App;
