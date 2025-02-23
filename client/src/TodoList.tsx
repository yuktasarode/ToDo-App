import { useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  handleLogout: () => void;
}

const TodoList = ({ handleLogout }: TodoListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const addToList = () => {
    if (inputValue.trim() === "") return;
    const newTask: Task = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
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