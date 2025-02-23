interface LoginProps {
    handleLogin: () => void;
    setShowSignup: (value: boolean) => void;
  }
  
  const Login = ({ handleLogin, setShowSignup }: LoginProps) => {
    return (
      <div className="auth-container">
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button onClick={handleLogin}>Log In</button>
        <button onClick={() => setShowSignup(true)}>Sign Up</button>
      </div>
    );
  };
  
  export default Login;