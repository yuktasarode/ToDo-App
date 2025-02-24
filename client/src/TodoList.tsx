import { useState, useEffect } from "react";
import axios from "axios";

interface Task {
  id: string; // Update type to string since backend likely uses UUIDs
  text: string;
  completed: boolean;
}

interface TodoListProps {
  handleLogout: () => void;
}

const API_BASE_URL = "http://localhost:3000/task";

const TodoList = ({ handleLogout }: TodoListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  // 🔹 Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/tasks`, {
          withCredentials: true, // Important for sending cookies (auth)
        });
        console.log(response)
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // 🔹 Add a task to the backend
  const addToList = async () => {
    if (inputValue.trim() === "") return;
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/addTask`,
        { text: inputValue, completed: false },
        { withCredentials: true }
      );

      setTasks([...tasks, response.data]); // Append new task from backend
      setInputValue("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // 🔹 Delete a task from the backend
  const removeTask = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/deleteTask/${id}`, {
        withCredentials: true,
      });

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // 🔹 Toggle task completion (frontend only, backend update needed if required)
  const toggleTaskCompletion = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/task/toggleTaskCompletion/${id}`, {
        method: "PATCH",
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Failed to update task completion");
      }
  
      const updatedTask = await response.json();
      setTasks(
        tasks.map((task) =>
          String(task.id) === String(id) ? { ...task, completed: updatedTask.completed } : task
        )
      );
    } catch (error) {
      console.error("Error updating task completion:", error);
    }
  };
  

  return (
    <div>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add your task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && addToList()}
        />
        <button type="button" onClick={addToList}>ADD</button>
      </div>
      <div className="task-list-container">
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
    </div>
  );
};

export default TodoList;