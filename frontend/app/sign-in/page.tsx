'use client'
import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './pages.modules.css';
import logoImg from '../../public/assets/videocam.png';
import mssdLogo from '../../public/assets/Screenshot 2024-08-06 164631.png';
import { useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth';
import {auth} from '@/app/firebase/config';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { serialize } from 'v8';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const email = username;
      const res = await signInWithEmailAndPassword(email, password);
      setUsername('');
      setPassword('');
      router.push('/home');
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
        <img src={mssdLogo.src} className='logoImg'></img>
      </span>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
        <div className="signup-container">
          <h2 className='signUp'>Sign In To MSSD</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className='label'>Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='input'
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className='label'>Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='input'
                required
              />
            </div>
            <button type="submit" className="signup-btn">Sign In</button>
          </form>
          <h2 className='orHeader'>Or</h2>
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

export default SignIn;
