import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './pages/App'
import Login from './pages/Login'
import Authenticate from './pages/Authenticate'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="home" element={<Authenticate />} />
      <Route path="login" element={<Login />} />
    </Routes>
    </BrowserRouter>
)

