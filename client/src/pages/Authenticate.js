import React, { useState, useEffect } from 'react';
import { getToken, topItems } from '../utils/apiCalls';
import Home from './Home';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';


const MAX_TOKEN_REQUEST_MS = 5000

const Authenticate = (props) => {
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');

    if (!code) {
      navigate('/login')
    }
    getToken(code, setToken, setRefreshToken)

  }, [])

  useEffect(() => {
    console.log(token)
    // if (!token) {
    //   setTimeout(() => {navigate('/login')}, MAX_TOKEN_REQUEST_MS)
    // }
  }, [token])


  return (
    <div >
      {
        token ? <Home token={token} refreshToken={refreshToken} setT={setToken} setRT={setRefreshToken} />
          :
          <Loading />
      }
    </div>
  );
}

export default Authenticate;