import { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login";
import Signup from "./Signup";
import TodoList from "./TodoList";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showSignup, setShowSignup] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/checkAuth", {
          method: "GET",
          credentials: "include", // Ensures cookies are sent
        });

        const data = await response.json();
        if (data.isAuthenticated) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };

    checkAuth();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setIsAuthenticated(false);
  };

  return (
    <div className="container">
      <h1 className="header">To-do List</h1>
      {!isAuthenticated ? (
        showSignup ? (
          <Signup setShowSignup={setShowSignup} />
        ) : (
          <Login handleLoginSuccess={handleLoginSuccess} setShowSignup={setShowSignup} />
        )
      ) : (
        <TodoList handleLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;