import { useState, useEffect } from "react";
import { fetchTasks, addTask, removeTask as removeTaskAPI, toggleTaskCompletion as toggleTaskAPI } from "./api/api";


interface Task {
  id: string; // Update type to string since backend likely uses UUIDs
  text: string;
  completed: boolean;
}

interface TodoListProps {
  handleLogout: () => void;
}


const TodoList = ({ handleLogout }: TodoListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  // 🔹 Fetch tasks from backend
  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasks = await fetchTasks();
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getTasks();
  }, []);

  // 🔹 Add a task to the backend
  const addToList = async () => {
    if (inputValue.trim() === "") return;

    try {
      const newTask = await addTask(inputValue);
      setTasks([...tasks, newTask]); 
      setInputValue("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // 🔹 Delete a task from the backend
  const removeTask = async (id: string) => {
    try {
      await removeTaskAPI(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // 🔹 Toggle task completion (frontend only, backend update needed if required)
  const toggleTaskCompletion = async (id: string) => {
    try {
      const updatedTask = await toggleTaskAPI(id); // Call the actual API function
  
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