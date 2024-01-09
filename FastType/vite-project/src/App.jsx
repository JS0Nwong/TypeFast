import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from "framer-motion";

import './App.css'

import { UserTheme } from "../src/hooks/useTheme"
import ProtectedRoute from "./utils/ProtectedRoute"
import Home from './views/Home'
import About from './views/About'
import Settings from './views/Settings'
import Leaderboard from './views/Leaderboard'
import Error from './views/404'
import Rooms from './views/Rooms';
import PageLayout from './views/PageLayout';

function App() {
  return (
    <>
      <UserTheme>
        <div className='App'>
          <AnimatePresence>
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/games" element={<Rooms />}/>
                <Route path="/*" element={<Error />} />
            </Routes>
          </AnimatePresence>
        </div>
      </UserTheme>
    </>
  )
}

export default App
