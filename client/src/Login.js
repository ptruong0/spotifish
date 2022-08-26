import './index.css';
import './Login.scss';
import { login } from './apiCalls';

import spotifyLogo from './assets/spotify-logo.png';

import React from 'react';
import Foreground from './Foreground';
import Background from './Background';


const Login = () => {
  return (
    <div className='login-page'>
      {/* background assets */}
      <Background />
      <Foreground />
      

      <div className='container'>
        
        <h1 className='header'>Spotifish</h1>
        <a className='login-btn' href='http://localhost:5000/login'>
          <span className='row-around'>
            <p className='login-text'>Log in with Spotify</p>
            <img src={spotifyLogo}/>
          </span>
        </a>
      </div>
    </div>
  );
}

export default Login;