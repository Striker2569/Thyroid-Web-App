// MainPage.js
import React , {useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import '../components/LoginPage.css'
import ProfileDropdown from './profile';

const MainPage = () => {
  const location = useLocation();
  // const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { username } = location.state || {};
  console.log("user logged in ", username);

  const handleLogout = () => {
  // Implement your logout logic here
  navigate("/login");
};
  return (
    <div className='login-container'>
    <h1 className="title">Your App Title</h1>
    <p className="quote">Your inspirational quote here.</p>
    <div className="profile-dropdown">
      <p>Welcome, {username}</p>
      <button className='logout' onClick={handleLogout}>Logout</button>
    </div>
    </div>
  );
};

export default MainPage;
