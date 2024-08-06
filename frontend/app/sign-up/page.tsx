'use client'
import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './pages.modules.css';
import logoImg from '../../public/assets/videocam.png';
import { useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth';
import {auth} from '@/app/firebase/config';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

const page = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const email = username;
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({res});
      setUsername('');
      setPassword('');
    } catch(error) {
      console.error("Error trying to submit username and password", error)
      console.error(JSON.stringify(error, null, 2));
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    console.log('Google Success:', credentialResponse);
    // Handle Google login success logic
    const credential = GoogleAuthProvider.credential(credentialResponse.credential);
    try{
      const result = await signInWithCredential(auth, credential);
      console.log(result.user);
    } catch (error) {
      console.error("Error signing in with google crecentials");
    }
  };

  const handleGoogleFailure = (error: void) => {
    console.log('Google Failure:', error);
    // Handle Google login failure logic
  };

  return (
    <div className='sign-up-page'>
      <span className='logo'>
        <img src={logoImg.src} className='logoImg'></img>
        <h1 className='logoText'>Movie Sound Scene Database</h1>
      </span>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
        <div className="signup-container">
          <h2>Join MSSD Today!</h2>
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
          <h1 className='orHeader'>Or</h1>
          <div className="google-login">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
            />
          </div>
        </div>
      </GoogleOAuthProvider>
    </div>
  );
};

export default page;
