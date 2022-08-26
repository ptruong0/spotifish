import React, { useState, useEffect } from 'react';
import Authenticate from './Authenticate';
import Home from './Home';
import Login from './Login';

const App = () => {
  const [token, setToken] = useState("");

  const authenticate = () => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setToken(token)

  }

  useEffect(authenticate, [])

  return (
    <div className="App">
      {
        token ? 
        <div>
          <Authenticate />
          <p> Help</p>
          </div>
          : 
          <Login />
      }
    </div>
  );
}

export default App;
