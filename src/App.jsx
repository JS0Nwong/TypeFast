import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from "framer-motion";
import './App.css'

import { UserTheme } from "../src/hooks/useTheme"
import { AuthProvider } from './hooks/AuthProvider';

import ProtectedRoute from "./utils/ProtectedRoute"
import Home from './views/Home'
import About from './views/About'
import Settings from './views/Settings'
import Leaderboard from './views/Leaderboard'
import Error from './views/404'
import Rooms from './views/Rooms';
import Profile from './views/Profile'
import UserAuth from './views/UserAuth';
import PageLayout from './views/PageLayout';
import useStore from './utils/store';

function App() {
  const { isAuthenticated } = useStore()
  return (
    <>
      <UserTheme>
        <div className='App'>
          <AnimatePresence>
            <AuthProvider>
              <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/games" element={<Rooms />} />
                <Route path="/login" element={<UserAuth />} />
                <Route
                  path="/account"
                  element={
                    <ProtectedRoute
                      Component={Profile}
                    />}
                />
                <Route path="/u/:username" element={<Profile />} />
                <Route path="/*" element={<Error />} />
              </Routes>
            </AuthProvider>
          </AnimatePresence>
        </div>
      </UserTheme>
    </>
  )
}

export default App
