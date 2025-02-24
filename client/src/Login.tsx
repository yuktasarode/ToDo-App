import { useState } from "react";
import { login } from "./api/api";

interface LoginProps {
    handleLoginSuccess: () => void; 
    setShowSignup: (value: boolean) => void;
  }
  
  const Login = ({ handleLoginSuccess, setShowSignup }: LoginProps) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await login(username, password);
        handleLoginSuccess(); // Call parent function to update state
      } catch (err) {
        setError("Invalid credentials"+ err);
      }
    };
  
    return (
      <div className="auth-container">
        <h2 style={{ color: "black" }}>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
        <p style={{ color: "black" }}>Don't have an account? <button className="signup" onClick={() => setShowSignup(true)}>Sign up</button></p>
      </div>
      
    );
  };
  
  export default Login;