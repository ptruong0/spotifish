import '../index.css'
import './Login.scss'

import spotifyLogo from '../assets/spotify-logo.png'

import Foreground from '../ui/Foreground'
import Background from '../ui/Background'
import { SERVER_BASE_URL } from '../constants/server'


const Login = () => {
  const showDialog = JSON.parse(localStorage.getItem('showDialog'));
  // show dialog if null or true
  const spotifyLoginURL = `${SERVER_BASE_URL}/login?show_dialog=${showDialog === null || showDialog === true}`

  return (
    <div className='login-page'>
      {/* background assets */}
      <Background />
      <Foreground />
      
      <div className='container'>
        
        <div className='text-container'>
        <h1 className='header'>Spotifish</h1>
        <h2 className='subtext'>Dive right in!</h2>
        </div>
        
        <a className='login-btn' href={spotifyLoginURL}>
          <span className='row-around'>
            <p className='login-text'>Log in with Spotify</p>
            <img src={spotifyLogo} className='spotify-logo' alt='spotify logo'/>
          </span>
        </a>
      </div>
    </div>
  )
}

export default Login