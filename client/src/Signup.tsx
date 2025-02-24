import { useState } from "react";
import { signup } from "./api/api";

interface SignupProps {
  setShowSignup: (show: boolean) => void;
}

const Signup = ({ setShowSignup }: SignupProps) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password, username);
      alert("Signup successful! Please log in.");
      setShowSignup(false); // Redirect to login
    } catch (err) {
      setError("Signup failed:" + err);
    }
  };

  return (
    <div className="auth-container">
    <div>
      <h2>Signup</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign up</button>
      </form>
      <p>Already have an account? <button onClick={() => setShowSignup(false)}>Login</button></p>
    </div>
    </div>
  );
};

export default Signup;