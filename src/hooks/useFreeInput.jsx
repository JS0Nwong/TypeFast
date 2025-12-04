import { useCallback, useEffect } from 'react'

import { allowedInputs } from '../utils/allowedInputs'
import { allowedIdleInputs } from '../utils/allowedIdleInputs'
import { allowedGameInputs } from '../utils/allowedGameInputs'
import { isCorrect } from '../utils/isCorrect'
import { useUpdateHistory } from '../utils/stores/store'
import { useCursor } from "./useCursor"
import { useBoundStore } from '../utils/stores/boundStore'


function useFreeInput() {
    const {
        currentUserInput,
        currentWordIndex,
        currentCharIndex,
        prevInput,
        history,
        userInputWordHistory,
        rawWordsPerMinuteKeys,
        userStatus,
        gameStatus,
        allowUserInput,
    } = useBoundStore((state) => ({
        currentUserInput: state.currentUserInput,
        currentWordIndex: state.currentWordIndex,
        currentCharIndex: state.currentCharIndex,
        prevInput: state.prevInput,
        history: state.history,
        userInputWordHistory: state.userInputWordHistory,
        rawWordsPerMinuteKeys: state.rawWordsPerMinuteKeys,
        userStatus: state.userStatus,
        gameStatus: state.gameStatus,
        allowUserInput: state.allowUserInput
    }))

    const {
        setFreeInput,
    } = useBoundStore((state) => ({
        setFreeInput: state.setFreeInput


    }))

    const handleUserInput = (key) => {
        setFreeInput(key)
    }
    useEffect(() => {
        // if (!allowUserInput) { return }
    //     if (userStatus === 'searching') { return }
    //     if (userStatus === 'typing') {
    //         window.addEventListener('keydown', handleUserInput)
    //         return () => window.removeEventListener('keydown', handleUserInput)
    //     }
    //     if (userStatus === 'idle') {
    //         window.addEventListener('keydown', handleStatusChange)
    //         return () => window.removeEventListener('keydown', handleStatusChange)
    //     }
    }, [])

    return { handleUserInput }

}
export { useFreeInput }
