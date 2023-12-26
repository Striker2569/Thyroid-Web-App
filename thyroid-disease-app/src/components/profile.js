import React from 'react';
import '../components/LoginPage.css';
const ProfileDropdown = ({ username, onLogout }) => {
  return (
    <div className="profile-dropdown">
      <p>Welcome, {username}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default ProfileDropdown;