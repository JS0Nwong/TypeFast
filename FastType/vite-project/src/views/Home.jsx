import { useEffect } from 'react'
import { Box } from "@mui/material"
import { motion } from "framer-motion"

import Header from '../components/Header'
import Footer from '../components/Footer'
import Menubar from '../components/Menubar'
import GameScreenWrapper from '../components/GameScreenWrapper'

import { useGame } from '../hooks/useGame'
import { useGameState } from '../hooks/useGameState'
import useStore from '../utils/store'

export default function Home() {
    const {
        text,
        charPressed,
        charTyped,
        keyPressed,
        timeInterval,
        restartGame,
        handleInputChange,
        handleKeyDown,
        incorrectExtraUserInputs,
    } = useGame()

    const {inputRef, handleInputFocus} = useGameState()

    const { currentUserInput } = useStore()

    // const { restartGame } = useGameState()

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
                        <GameScreenWrapper
                            keyPressed={keyPressed}
                            words={text}
                            charPressed={charPressed}
                            charsTyped={charTyped}
                            
                            timeInterval={timeInterval}
                            restartGame={restartGame}
                            handleInputChange={handleInputChange}
                            inputRef={inputRef}
                            handleKeyDown={handleKeyDown}
                            currentUserInput={currentUserInput}
                            incorrectExtraUserInputs={incorrectExtraUserInputs}
                        />
                        <Footer />
                    </Box>
                    <Box sx={{ width: { sm: "0%", md: '25%' } }} />
                </Box>
            </motion.div>
        </>
    )
}
