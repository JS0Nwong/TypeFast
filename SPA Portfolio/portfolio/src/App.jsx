import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';

import Home from "./Home"
import Works from './Works';

import { useLocation } from 'react-router-dom';

function App() {

  const location = useLocation()

  return (
    <div className="App">
      <AnimatePresence mode='wait' initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/works/*" element={<Works />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App
