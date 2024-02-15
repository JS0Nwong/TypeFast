import { Box, IconButton, Tooltip } from "@mui/material"
import TypeDisplay from './TypeDisplay'
import UserInputDisplay from './UserInputDisplay';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TimeDisplay from './TimeDisplay';
import WordsAmountCount from "./WordsAmountCount";
import Results from "./Results";
import Menubar from "./Menubar/Menubar";
import { motion } from 'framer-motion'

import { useBoundStore } from "../utils/stores/boundStore";
import { useUpdateHistory } from "../utils/stores/store"

export default function GameScreenWrapper() {
    const {
        mode, 
        currentUserInput, 
        hideElements, 
        gameStatus,
        regenerateText, 
        setCurrentUserInput,
        setBlurElements,
        blurElements
    } = useBoundStore((state) => ({
        mode: state.mode,
        currentUserInput: state.currentUserInput,
        gameStatus: state.gameStatus,
        hideElements: state.hideElements,
        regenerateText: state.regenerateText,
        setCurrentUserInput: state.setCurrentUserInput,
        setBlurElements: state.setBlurElements,
        blurElements: state.blurElements,
    }))

    const { resetHistory } = useUpdateHistory((state) => ({ resetHistory: state.resetHistory }))

    const renderSwitch = (param) => {
        switch (param) {
            case 'zen':
                return <UserInputDisplay charsTyped={currentUserInput} />;
            case 'time':
                return (
                    <>
                        <TimeDisplay />
                        <TypeDisplay />
                    </>
                );
            case 'words':
                return (
                    <>
                        <WordsAmountCount />
                        <TypeDisplay />
                    </>
                );
            default:
                return <TypeDisplay />
        }
    }

    const handleReset = () => {
        regenerateText()
        resetHistory()
    }

    return (
        <>
            <Menubar />
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
                    <Box sx={{ width: '100%', height: '100%' }}><Results /></Box>
                }
                {gameStatus !== 'finished' &&
                    <Tooltip title={'restart game'}>
                        <IconButton
                            sx={{ opacity: hideElements ? "0" : "1", mt: -10 }}
                            onClick={handleReset}
                            tabIndex={9}
                        >
                            <RestartAltIcon />
                        </IconButton>
                    </Tooltip>
                }
            </Box>
        </>
    )
}
