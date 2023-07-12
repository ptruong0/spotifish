import React, { useState, useEffect } from 'react';
import { getToken, topItems } from './apiCalls';
import Home from './Home';


const Authenticate = (props) => {
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");


  useEffect( () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    console.log('getting token');
    console.log(code);
    getToken(code, setToken, setRefreshToken);
  }, [])

  
  return (
    <div >
      {
        token ? <Home token={token} refreshToken={refreshToken} setT={setToken} setRT={setRefreshToken}/>
        :
      <h2>Loading...</h2>
    }
      
    </div>
  );
}

export default Authenticate;