interface SignupProps {
    handleSignup: () => void;
    setShowSignup: (value: boolean) => void;
  }
  
  const Signup = ({ handleSignup, setShowSignup }: SignupProps) => {
    return (
      <div className="auth-container">
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button onClick={handleSignup}>Sign Up</button>
        <button onClick={() => setShowSignup(false)}>Back to Login</button>
      </div>
    );
  };
  
  export default Signup;