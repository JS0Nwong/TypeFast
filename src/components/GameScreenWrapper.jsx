import { useState, useEffect } from "react"
import { Box, IconButton } from "@mui/material"
import TypeDisplay from './TypeDisplay'
import UserInputDisplay from './UserInputDisplay';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TimeDisplay from './TimeDisplay';
import Results from "./Results";
import Menubar from "./Menubar";
import { motion } from 'framer-motion'

import useStore from '../utils/store';
import { useUpdateHistory } from "../utils/store"

export default function GameScreenWrapper() {
    const { 
        mode, 
        currentUserInput, 
        hideElements, 
        gameStatus,
        regenerateText, 
        setCurrentUserInput,
    } = useStore((state) => ({
        mode: state.mode,
        currentUserInput: state.currentUserInput,
        gameStatus: state.gameStatus,
        hideElements: state.hideElements,
        regenerateText: state.regenerateText,
        setCurrentUserInput: state.setCurrentUserInput,
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
                        <TimeDisplay />
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, ease: 'easeOut' }}
                        transition={{ delay: 0.4, ease: 'easeInOut' }}
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
                    <IconButton
                        sx={{ opacity: hideElements ? "0" : "1", mt: -10}}
                        onClick={handleReset}
                        tabIndex={9}
                    >
                        <RestartAltIcon />
                    </IconButton>
                }
            </Box>
        </>
    )
}
