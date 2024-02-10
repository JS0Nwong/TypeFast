import { useCallback, useEffect } from 'react'

import useStore from '../utils/stores/store'
import { allowedInputs } from '../utils/allowedInputs'
import { allowedIdleInputs } from '../utils/allowedIdleInputs'
import { allowedGameInputs } from '../utils/allowedGameInputs'
import { isCorrect } from '../utils/isCorrect'
import { useUpdateHistory } from '../utils/stores/store'
import { useCursor } from "./useCursor"
import { useBoundStore } from '../utils/stores/boundStore'

function useInput() {
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
    }))

    const {
        setKeyPressed,
        setCurrentUserInput,
        setCurrentCharIndex,
        setUserInputWordHistory,
        setPrevInput,
        increaseCharIndex,
        increaseWordIndex,
        resetKeyPressed,
        resetUserInput,
        decreaseCharIndex,
        decreaseWordIndex,
        previousUserInput,
        resetCurrentCharIndex,
        setUserStatus,
        increaseRawWordsPerMinuteKeys,
        updateOverallWPM,
        setGameStatus,
        startGame,
        unhideElements,
        setInputFocus,
        increaseKPM,
    } = useBoundStore((state) => ({
        setKeyPressed: state.setKeyPressed,
        setCurrentUserInput: state.setCurrentUserInput,
        setCurrentCharIndex: state.setCurrentCharIndex,
        setUserInputWordHistory: state.setUserInputWordHistory,
        setPrevInput: state.setPrevInput,
        increaseCharIndex: state.increaseCharIndex,
        increaseWordIndex: state.increaseWordIndex,
        resetKeyPressed: state.resetKeyPressed,
        resetUserInput: state.resetUserInput,
        decreaseCharIndex: state.decreaseCharIndex,
        decreaseWordIndex: state.decreaseWordIndex,
        previousUserInput: state.previousUserInput,
        resetCurrentCharIndex: state.resetCurrentCharIndex,
        setUserStatus: state.setUserStatus,
        increaseRawWordsPerMinuteKeys: state.increaseRawWordsPerMinuteKeys,
        updateOverallWPM: state.updateOverallWPM,
        setGameStatus: state.setGameStatus,
        startGame: state.startGame,
        unhideElements: state.unhideElements,
        setInputFocus: state.setInputFocus,
        increaseKPM: state.increaseKPM,
    }))

    const { updatePosition, updateBackSpace } = useCursor() 
    const { wordsIncorrect } = useUpdateHistory()
    const { checkWord } = isCorrect()
    const keyString = currentWordIndex + "." + currentCharIndex

    const displayExtraCharacters = (word, index) => {
        let input = userInputWordHistory[index];
        if (!input) {
            input = currentUserInput?.trim()
        }
        if (index > currentWordIndex) {
            return null;
        }
        if (input?.length <= word.length) {
            return null;
        }
        else {
            // prevent spamming keys by limiting input to be only 10 characters more than the current word
            const extraChars = input?.slice(word.length, input?.length).split("");
            history[index] = Number(extraChars?.length);
            return extraChars?.map((char, index) => (
                <span key={index} className="incorrect-char char">
                    {char}
                </span>
            ));
        }
    }

     const handleUserInput = useCallback(({ key, code, keyCode }) => {
        // checks conditons if key pressed is allowed and if the game is ready or not
        /*
        *   If the input is not allowed or if the game is not ongoing,
        *   return early
        */
        if (!allowedGameInputs(code) && gameStatus === 'unready') return
        if (gameStatus === 'unready' && allowedGameInputs(code)) {
            setGameStatus('ready')
            startGame('ready')
        }
        if(gameStatus === 'ready') {
            increaseKPM()
            if(keyCode >= 65 && keyCode <=90) {
                increaseRawWordsPerMinuteKeys()
            }
        }
        if(rawWordsPerMinuteKeys !== 0) {
            updateOverallWPM()        
        }
        // condition for Backspace key
        /*
        *
        *
        * 
        */
        if (key === 'Backspace') {
            delete history[keyString]
            if (currentCharIndex < 0) {
                if (wordsIncorrect.has(currentWordIndex - 1)) {
                    const prevInputWord = userInputWordHistory[currentWordIndex - 1]
                    setCurrentUserInput(prevInputWord + " ");
                    setCurrentCharIndex(prevInputWord.length - 1)
                    decreaseWordIndex()
                    setPrevInput(prevInputWord)
                    updatePosition()
                }
                return
            }
            else {
                decreaseCharIndex()
                setKeyPressed("")
                previousUserInput()
                setUserInputWordHistory("")
                updateBackSpace()
                return
            }
        }
        // condition for Space Key
        /*
        *   Pressing space would let the user advance to the next word
        *   regardless whether the word they previously entered is incorrect
        *   or correct.
        * 
        *   It resets the current char index to 0 
        *   It resets the user key pressed to ''
        *   It moves the current word index up by 1
        */

        if (code === "Space" && currentUserInput !== '') {
            const correct = checkWord()
            if (correct || !correct) {
                resetCurrentCharIndex()
                resetKeyPressed()
                resetUserInput()
                increaseWordIndex()
                updatePosition()
                return
            }
            return
        }
        // else user is entering input for current word
        /*
        *   Sets the current user input to the key that the user pressed
        *   Appends the current key to the current user input string
        *   Increases the char index of the current word
        */
        else {
            if (key === "Tab") { unhideElements() }
            if (code.startsWith("Key")) {
                setCurrentUserInput(key)
                setKeyPressed(key)
                increaseCharIndex()
                setUserInputWordHistory(key)
                updatePosition()
                return
            }                
        }
    }, [
        history,
        prevInput,
        wordsIncorrect,
        currentUserInput,
        gameStatus,
        currentWordIndex,
        currentCharIndex,
        setKeyPressed,
        increaseCharIndex,
        increaseWordIndex,
        resetKeyPressed,
        decreaseWordIndex,
        previousUserInput,
        decreaseCharIndex,
    ])
    const handleStatusChange = ({code}) => {
        if (allowedIdleInputs(code)) {
            setInputFocus(true)
            setUserStatus('typing')
        }
    }

    // use effect to listent to user input on window load
    useEffect(() => {
        if (userStatus === 'typing') {
            window.addEventListener('keydown', handleUserInput)
            return () => window.removeEventListener('keydown', handleUserInput)
        }
        if (userStatus === 'idle') {
            window.addEventListener('keydown', handleStatusChange)
            return () => window.removeEventListener('keydown', handleStatusChange)
        }
        if (userStatus === 'searching') { return }
    }, [currentUserInput, userStatus])

    return { handleUserInput, displayExtraCharacters }
}

export { useInput }