import React, { useCallback } from 'react'
import { Box, Button } from "@mui/material"
import TypeDisplay from './TypeDisplay'
import UserInputDisplay from './UserInputDisplay';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TimeDisplay from './TimeDisplay';

import { useGameSettings } from '../hooks/useGameSettings';

export default function GameScreenWrapper({ 
    inputRef,
    words, 
    charsTyped, 
    restartGame,
    handleInputChange,
    handleKeyDown,
    currentUserInput,
    incorrectExtraUserInputs,
    timeInterval,
}) {
    const { mode } = useGameSettings()
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: "column",
            width: '100%',
            height: "100%",
            justifyContent: 'space-evenly',
            alignItems: 'center',
            mt: 10,
            position: 'relative'
        }}>
            <TimeDisplay timeInterval={timeInterval}/>
            {mode !== 'zen' ?
                <TypeDisplay
                    words={words}
                    incorrectExtraUserInputs={incorrectExtraUserInputs}
                />
                : <UserInputDisplay
                    words={words}
                    charsTyped={charsTyped}
                    isCorrectCharacter={isCorrectCharacter}
                />}
                <textarea 
                    ref={inputRef}
                    type="text"
                    onKeyDown={(e) => handleKeyDown(e)}
                    onChange={(e) => handleInputChange(e.target.value)}
                    value={currentUserInput}
                />
            <Button
                sx={{}}
                onClick={restartGame}
            >
                <RestartAltIcon />
            </Button>
        </Box>
    )
}
