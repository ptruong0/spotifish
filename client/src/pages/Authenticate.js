import React, { useState, useEffect } from 'react'
import { getToken } from '../utils/apiCalls'
import Home from './Home'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'


const Authenticate = () => {
  const [token, setToken] = useState("")
  const [refreshToken, setRefreshToken] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const code = urlParams.get('code')

    // redirect to login if no code in URL
    if (!code) {
      navigate('/login')
    }

    // get access and refresh tokens using code
    getToken(code)
    .then(res => {
      setToken(res.data.access_token)
      setRefreshToken(res.data.refresh_token)
    })
  }, [])

  return (
    <div >
      {
        token ? <Home token={token} refreshToken={refreshToken} setT={setToken} setRT={setRefreshToken} />
          :
          <Loading />
      }
    </div>
  )
}

export default Authenticate