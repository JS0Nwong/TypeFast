import { useEffect } from 'react'
import { Box } from "@mui/material"
import { motion } from "framer-motion"

import Header from '../components/Header'
import Footer from '../components/Footer'
import Menubar from '../components/Menubar'
import GameScreenWrapper from '../components/GameScreenWrapper'

export default function Home() {
    useEffect(() => {
        document.title = document.hidden ? "🥺 Come back" : "type.fast";
    }, [document.hidden])

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, ease: 'easeOut' }}
                transition={{ delay: 0.2, ease: 'easeInOut' }}
            >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Box sx={{ width: { sm: "0%", md: '25%' } }} />
                    <Box sx={{
                        maxWidth: { sm: "100%", md: "1440px" },
                        width: "100%",
                        height: '100dvh',
                        display: 'flex',
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                        <Header />
                        <Menubar />
                        <GameScreenWrapper />
                        <Footer />
                    </Box>
                    <Box sx={{ width: { sm: "0%", md: '25%' } }} />
                </Box>
            </motion.div>
        </>
    )
}
