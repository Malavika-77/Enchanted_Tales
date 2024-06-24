// AuthenticationPopup.js

import React, { useState } from 'react';

function AuthenticationPopup({ setAuthenticated, setShowAuthPopup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAuthentication = async () => {
    try {
      const response = await fetch('/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        setAuthenticated(true);
        setShowAuthPopup(false);
      } else {
        const errorMessage = await response.text();
        alert(errorMessage || 'Authentication failed');
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      alert('Authentication failed');
    }
  };
  
  const handleClose = () => {
    setShowAuthPopup(false);
  };

  return (
    <div className="authentication-popup">
      <div className="popup-content">
        <button className="close-button" onClick={handleClose}>Close</button>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br></br><br></br>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br></br><br></br>
        <button onClick={handleAuthentication}>Authenticate</button>
      </div>
    </div>
  );
}

export default AuthenticationPopup;
