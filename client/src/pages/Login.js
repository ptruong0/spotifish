import '../index.css'
import './Login.scss'

import spotifyLogo from '../assets/spotify-logo.png'

import Foreground from '../ui/Foreground'
import Background from '../ui/Background'


const Login = () => {
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
        
        <a className='login-btn' href='http://localhost:5000/login'>
          <span className='row-around'>
            <p className='login-text'>Log in with Spotify</p>
            <img src={spotifyLogo} alt='spotify logo'/>
          </span>
        </a>
      </div>
    </div>
  )
}

export default Login