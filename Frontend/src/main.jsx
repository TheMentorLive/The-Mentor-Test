import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import { MainProvider } from './context/mainContex.jsx'
import { store } from "../src/redux/Store.js"

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
        <Router> 
   <MainProvider>
   <Provider store={store}>
  <App />
  </Provider>
  </MainProvider>
  
  </Router> 
  
  </React.StrictMode>,
  
)
