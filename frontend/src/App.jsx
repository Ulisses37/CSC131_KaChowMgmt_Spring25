import { useState } from 'react'
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route } from "react-router";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TestComponent from './components/testComponent'
import { DeleteMe } from './components/testComponent'
// Pages
import Home from './pages/Home'
import CLogin from './pages/CustomerLogin'
import FPassword from './pages/ForgotPassword'
import AccCreation from './pages/AccountCreation'
function App() {
  const [count, setCount] = useState(0)

  return (
    <AccCreation/>
    /*<>
     <Router>
      <Route>
        <Route path="/" element = {<Home/>}/>
        <Route path="/account-creation" element = {<AccCreation/>}/>
        <Route path="/forgot-password" element = {<FPassword/>}/>
        <Route path="/customer-login" element = {<CLogin/>}/>
      </Route>  
      </Router>
    </> */
  )
}

export default App
