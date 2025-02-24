import axios from "axios";

// Configure Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000", // Base URL for backend
  withCredentials: true, // Ensures cookies are sent with requests
  headers: { "Content-Type": "application/json" },
});

// 🔹 Authentication APIs
export const signup = async (email: string, password: string, username: string) => {
  try {
    const response = await api.post("/auth/signup", { email, password, username });
    return response.data; 
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
};

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    return response.data; 
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const checkAuth = async () => {
  try {
    const response = await api.get("/auth/checkAuth");
    return response.data;
  } catch (error) {
    console.error("Auth check failed:", error);
    return { isAuthenticated: false };
  }
};

export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

// 🔹 Task APIs
export const fetchTasks = async () => {
  try {
    const response = await api.get("/task/tasks");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const addTask = async (text: string) => {
  try {
    const response = await api.post("/task/addTask", { text, completed: false });
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const removeTask = async (id: string) => {
  try {
    await api.delete(`/task/deleteTask/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const toggleTaskCompletion = async (id: string) => {
  try {
    const response = await api.patch(`/task/toggleTaskCompletion/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error updating task completion:", error);
    throw error;
  }
};
