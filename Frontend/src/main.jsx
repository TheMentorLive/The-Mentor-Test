import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { MainProvider } from './context/mainContex.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
        <Router> 
   <MainProvider>
  <App />
  </MainProvider>
  </Router> 
  
  </React.StrictMode>,
  
)
