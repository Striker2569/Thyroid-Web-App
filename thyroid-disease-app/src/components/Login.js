// Login.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../components/LoginPage.css';
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      // console.log('Response from server:', response);
  
      const data = await response.json();
      // console.log(data)
      if (response.ok) {
        // const data = await response.json();
        // Login successful, handle redirection or other actions
        console.log('Login successful', data);
        navigate('/main');
      } else {
        // Login failed, handle error message
        // const data = await response.json();
        console.error('Login failed', data.error);
      }
    } catch (error) {
      console.error('Error during login', error);
    }
  };
  

  return (
    // <div>
    //   <h2>Login</h2>
    //   <form>
    //     <label>
    //       Username:
    //       <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
    //     </label>
    //     <br />
    //     <label>
    //       Password:
    //       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //     </label>
    //     <br />
    //     <button type="button" onClick={handleLogin}>
    //       Login
    //     </button>
    //   </form>
    // </div>
    <div className="login-container">
    <h1 className="title">Your App Title</h1>
    <p className="quote">Your inspirational quote here.</p>
    <div className="form-container">
      <input type="text" placeholder="User ID" className="input-field" value = {username} onChange={(e) => setUsername(e.target.value)}/>
      <input type="password" placeholder="Password" className="input-field" value={password} onChange={(e)=> setPassword(e.target.value)} />
      <button className="login-button" onClick={handleLogin}>Login</button>
    </div>
    <p className="signup-link">
          New User? <Link to="/Signup">Sign up</Link>
    </p>
    <p className="signup-link">
      Forgot password? <Link to = "/ForgotPassword">Click Here</Link>
    </p>
  </div>
  );
};

export default Login;

