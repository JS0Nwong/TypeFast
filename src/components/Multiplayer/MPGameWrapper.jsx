import { Box } from "@mui/material"
import { motion } from 'framer-motion'

import TimeDisplay from '../TimeDisplay';
import WordsAmountCount from "../WordsAmountCount";
import TypeGame from "./TypeGame";
import MPResultsScreen from "./MPResultsScreen";
import GameCountdown from "./GameCountdown";

import { useBoundStore } from "../../utils/stores/boundStore";

export default function MPGameWrapper() {
    const {
        mode, 
        gameStatus,
    } = useBoundStore((state) => ({
        mode: state.mode,
        currentUserInput: state.currentUserInput,
        gameStatus: state.gameStatus,
        hideElements: state.hideElements,
        setCurrentUserInput: state.setCurrentUserInput,
        setBlurElements: state.setBlurElements,
        blurElements: state.blurElements,
    }))

    const renderSwitch = (param) => {
        switch (param) {
            case 'time':
                return (
                    <>
                        <TimeDisplay />
                        <TypeGame />
                    </>
                );
            case 'quote':
                return (
                    <>
                        <TimeDisplay />
                        <TypeGame />
                    </>
                );
            case 'words':
                return (
                    <>
                        <WordsAmountCount />
                        <TypeGame />
                    </>
                );
            default:
                return (
                    <>
                        <TimeDisplay />
                        <TypeGame />
                    </>
                );
        }
    }

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: "column",
                width: '100%',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                mt: 5,
                height: "100%",
                position: 'relative',
            }}>
                <GameCountdown />
                {gameStatus !== 'finished' &&
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                            ease: 'easeOut',
                        }}
                        transition={{
                            delay: 0.4,
                            ease: 'easeInOut',
                        }}
                        style={{
                            width: '100%',
                        }}
                    >
                        {renderSwitch(mode)}
                    </motion.div>
                }
                {gameStatus === 'finished' &&
                    <Box sx={{ width: '100%', height: '100%' }}><MPResultsScreen /></Box>
                }
            </Box>
        </>
    )
}
