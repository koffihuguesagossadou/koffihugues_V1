import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.scss'
import { BrowserRouter } from "react-router-dom";
import { Suspense } from 'react';





ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
      <Suspense>
        <App/>
      </Suspense>
  </BrowserRouter>,
)
