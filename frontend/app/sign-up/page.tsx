'use client'
import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './pages.modules.css';
import logoImg from '../../public/assets/videocam.png';

const page = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const handleGoogleSuccess = (credentialResponse: any) => {
    console.log('Google Success:', credentialResponse);
    // Handle Google login success logic
  };

  const handleGoogleFailure = (error: any) => {
    console.log('Google Failure:', error);
    // Handle Google login failure logic
  };

  return (
    <div className='sign-up-page'>
      <span className='logo'>
        <img src={logoImg.src} className='logoImg'></img>
        <h1 className='logoText'>Movie Sound Scene Database</h1>
      </span>
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <div className="signup-container">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="signup-btn">Sign Up</button>
          </form>
          <div className="google-login">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
            />
          </div>
        </div>
      </GoogleOAuthProvider>
    </div>
  );
};

export default page;
