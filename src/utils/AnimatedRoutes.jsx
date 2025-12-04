import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from "framer-motion";

import ProtectedRoute from "./ProtectedRoute"
import Home from '../views/Home'
import About from '../views/About'
import Settings from '../views/Settings'
import Leaderboard from '../views/Leaderboard'
import Error from '../views/404'
import Rooms from '../views/Rooms';
import Profile from '../views/Profile'
import UserAuth from '../views/UserAuth';
import Lobby from '../views/Lobby';
import MultiplayerGame from '../views/MultiplayerGame';

export default function AnimatedRoutes() {
    const location = useLocation

    return (
        <AnimatePresence>
            <Routes loction={location} key={location.pathname}>
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
                <Route path="/:lobby" element={<Lobby />} />
                <Route path="/mpgame" element={<MultiplayerGame />} />
                <Route path="/u/:username" element={<Profile />} />
                <Route path="/*" element={<Error />} />
            </Routes>
        </AnimatePresence>
    )
}
