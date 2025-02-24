import axios from "axios";

// Configure Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/auth", // Adjust if needed
  withCredentials: true, // Ensures cookies are sent with requests
  headers: { "Content-Type": "application/json" },
});

// Signup function
export const signup = async (email: string, password: string, username: string) => {
  try {
    const response = await api.post("/signup", { email, password, username });
    return response.data; // Returns user data and token
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
};

// Login function
export const login = async (username: string, password: string) => {
  try {
    const response = await api.post("/login", { username, password });
    return response.data; // Returns user data
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
