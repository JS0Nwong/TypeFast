/*
*   useGame()
*   
*   handles all the functional logic of the game
*   consider it as parent hooks of all the hooks here
*   as it uses multiple other hooks to handle the logic
*
*/

import { useState } from "react"

// game logic hooks
import { useGameState } from "./useGameState"

// settings hooks
import { useClientSettings } from "./useClientSettings"
import { useGameSettings } from "./useGameSettings"

const useGame = () => {
    // State variables and definitions
    const [userStatus, setUserStatus] = useState(false)
    const [wordIndex, setWordIndex] = useState(0)

    // Hooks
}

export { useGame }