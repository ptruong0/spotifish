import './Loading.scss'
import Background from '../ui/Background'
import Foreground from '../ui/Foreground'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Loading = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timeout = setTimeout(() => navigate('/login'), 4000)
    localStorage.setItem('timeoutId', timeout)
  }, [])

  return (
    <div>
    <Background />
    <Foreground />

    <div className='loading-container'>
      <h1 className='loading-text'>Loading...</h1>
      {/* <p className='loading-text try-again-text'>If not loading, <a href="http://localhost:5000/login" className='link'>log in</a> again</p> */}
    </div>
</div>
  )
}

export default Loading