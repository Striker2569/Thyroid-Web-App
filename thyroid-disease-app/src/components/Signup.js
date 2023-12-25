// Signup.js

import React, { useState } from 'react';
import { signup } from '../components/authService';
import '../components/LoginPage.css';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      await signup(username, password);
      navigate('/login');
      console.log('Signup successful');
      // Redirect or handle success as needed
    } catch (error) {
      console.error('Signup failed:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div className='login-container'>
      <h2 className='title'>Signup</h2>
      <input type="text" placeholder="Username" className="input-field" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className='login-button' onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
