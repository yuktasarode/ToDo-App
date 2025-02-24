import { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login";
import Signup from "./Signup";
import TodoList from "./TodoList";
import { checkAuth, logout } from "./api/api";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showSignup, setShowSignup] = useState<boolean>(false);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const data = await checkAuth();
      setIsAuthenticated(data.isAuthenticated);
    };

    fetchAuthStatus();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await logout();
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