import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Import the shared CSS file for styling

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use for redirection

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setError('');
        alert('Sign-up successful. Redirecting to login.');
        setUsername('');
        setPassword('');
        navigate('/login'); // Redirect to login page
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error signing up. Please try again.');
      }
    } catch (err) {
      setError('Error signing up. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignUp}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
