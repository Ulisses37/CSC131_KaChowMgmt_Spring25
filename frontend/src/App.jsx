import { useState } from 'react'
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TestComponent from './components/testComponent'
import { DeleteMe } from './components/testComponent'
// Pages
import Home from './pages/Home'
import CLogin from './pages/CustomerLogin'  // note the first letter of what is being imported needs to be an upper case
import ELogin from './pages/EmployeeLogin'
import EVerif from './pages/EmployeeVerif'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Home/>
    //<CLogin /> // remember to put the name of the function you are exporting if it is not the default
    //<ELogin/>
    //<EVerif/>

    // <>
    //   <div>
    //     <a href="https://vite.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>halllooooo</h1>
    //   <TestComponent />
    //   <TestComponent />
    //   <TestComponent />
    //   <TestComponent />
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
  )
}

export default App
