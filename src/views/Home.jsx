import { useEffect } from 'react'
import { Box } from "@mui/material"
import { motion } from "framer-motion"

import Header from '../components/static/Header'
import Footer from '../components/static/Footer'
import Gutter from '../components/static/Gutter'
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
                    <Gutter/>
                    <Box sx={{
                        maxWidth: { sm: "100%", md: "1440px" },
                        width: "100%",
                        height: '100dvh',
                        display: 'flex',
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                        <Header />
                        <GameScreenWrapper />
                        <Footer />
                    </Box>
                    <Gutter/>
                </Box>
            </motion.div>
        </>
    )
}
