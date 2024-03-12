import { Box } from "@mui/material"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom";

import { useBoundStore } from "../utils/stores/boundStore";

import Header from '../components/static/Header'
import Footer from '../components/static/Footer'
import Gutter from "../components/static/Gutter"
import GameLobby from "../components/Multiplayer/GameLobby"

export default function Lobby() {
    const { subscribeToCurrentRoom } = useBoundStore()
    const [searchParams] = useSearchParams()

    //use effect to get current lobby data
    useEffect(() => {
        subscribeToCurrentRoom(searchParams.get('room'))
    }, [searchParams])

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, ease: 'easeOut' }}
                transition={{ delay: 0.2, ease: 'easeInOut' }}
            >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Gutter />

                    <Box sx={{
                        maxWidth: { sm: "100%", md: "1440px" },
                        width: "100%",
                        height: '100dvh',
                        display: 'flex',
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                        <Header />
                        <GameLobby />
                        <Footer />
                    </Box>
                    <Gutter />

                </Box>
            </motion.div>
        </>
    )
}
