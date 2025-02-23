import { useState } from "react";
import "./App.css";
import Login from "./Login";
import Signup from "./Signup";
import TodoList from "./TodoList";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showSignup, setShowSignup] = useState<boolean>(false);

  const handleSignup = async () => {
    try {
      console.log("Signup success");
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  const handleLogin = async () => {
    try {
      console.log("Login success");
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const handleLogout = () => {
    console.log("Logout success");
    setIsAuthenticated(false);
  };

  return (
    <div className="container">
      <h1 className="header">To-do List</h1>
      {!isAuthenticated ? (
        showSignup ? (
          <Signup handleSignup={handleSignup} setShowSignup={setShowSignup} />
        ) : (
          <Login handleLogin={handleLogin} setShowSignup={setShowSignup} />
        )
      ) : (
        <TodoList handleLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
