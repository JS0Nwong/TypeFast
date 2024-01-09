/*
*   useGame()
*   
*   handles all the functional logic of the game
*   consider it as parent hooks of all the hooks here
*   as it uses multiple other hooks to handle the logic
*
*/

import { useState, useCallback, useEffect, useRef } from "react"

// game logic hooks
import { useUserInput } from "./useUserInput"
import { useMetrics } from "./useMetrics"
import { useTime } from "./useTime"
import { useGameState } from "./useGameState"
import { useWordChecker } from "./useWordChecker"

// settings hooks
import { useClientSettings } from "./useClientSettings"
import { useGameSettings } from "./useGameSettings"

const useGame = () => {
    // State variables and definitions
    const [userStatus, setUserStatus] = useState(false)
    const [wordIndex, setWordIndex] = useState(0)

    // Hooks
    const {
        keyPressed,
        charTyped,
        resetCharTyped,
        currentUserInput,
        handleInputChange,
        handleKeyDown,
        incorrectExtraUserInputs,
    } = useUserInput()

    const { 
        inputRef,
        gameStatus,
        text, 
        timeInterval,
        startGame, 
        restartGame,
        handleInputFocus,
    } = useGameState()

    return {
        inputRef,
        keyPressed,
        text,
        charTyped,
        timeInterval,
        startGame,
        restartGame,
        handleInputChange,
        handleKeyDown,
        handleInputFocus,
        incorrectExtraUserInputs,
    }
}

export { useGame }