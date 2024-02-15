import { Box, Typography } from "@mui/material"
import { useBoundStore } from "../utils/stores/boundStore";
import { useEffect } from "react";
import useCountdown from "../hooks/useCountdown";

export default function WordsAmountCount() {
    const {
        wordsAmount,
        gameStatus,
        currentWordIndex,
        endGame,
        updateWordsTimer
    } = useBoundStore((state) => ({
        wordsAmount: state.wordsAmount,
        gameStatus: state.gameStatus,
        currentWordIndex: state.currentWordIndex,
        endGame: state.endGame,
        updateWordsTimer: state.updateWordsTimer,
    }))

    useCountdown(() => {
        updateWordsTimer()
    }, gameStatus === 'ready' ? 1000 : null)

    useEffect(() => {
        if (currentWordIndex === wordsAmount || currentWordIndex > wordsAmount) {
            endGame()
        }
    }, [currentWordIndex])

    return (
        <>
            <Box sx={{
                position: 'relative',
                top: 0,
                left: 0,
                borderRadius: "4px",
                opacity: gameStatus === 'ready' ? "1" : "0",
                transition: "0.15s ease"
            }}>
                <Typography fontSize="1.3rem" fontFamily='League Spartan' fontWeight="500">
                    {currentWordIndex}/{wordsAmount}
                </Typography>
            </Box>
        </>
    )
}
