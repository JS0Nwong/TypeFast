import { useCallback, useEffect } from 'react'
import useStore from '../utils/store'
import { allowedInputs } from '../utils/allowedInputs'
import { allowedGameInputs } from '../utils/allowedGameInputs'
import { isCorrect } from '../utils/isCorrect'
import { useUpdateHistory } from '../utils/store'

function useInput() {
    const {  
        currentWordIndex,
        currentCharIndex, 
        gameStatus,
        currentUserInput,
        userInputWordHistory,
        wordsCorrect,
        wordsIncorrect,
        setKeyPressed,
        setGameStatus,
        increaseWordIndex,
        increaseCharIndex,
        resetKeyPressed,
        resetCurrentCharIndex,
        decreaseCharIndex,
        decreaseWordIndex,
        setCurrentUserInput,
        setCurrentCharIndex,
        resetUserInput,
        setPrevInput,
        startGame,
        unhideElements,
        setUserInputWordHistory,
    } = useStore()
    // const {wordsCorrect, wordsIncorrect} = useUpdateHistory()
    const { checkWord } = isCorrect()
    const keyString = currentWordIndex + "." + currentCharIndex

    const handleUserInput = useCallback(({ key, code }) => {
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
        // condition for Backspace key
        /*
        *
        *
        * 
        */
        if(key === "Tab") {unhideElements()}
        if (key === 'Backspace') {
            delete history[keyString]
            if (currentCharIndex < 0) {
                if (wordsIncorrect.has(currentWordIndex - 1)) {
                    const prevInputWord = userInputWordHistory[currentWordIndex - 1]
                    setCurrentUserInput(prevInputWord + " ");
                    setCurrentCharIndex(prevInputWord.length - 1)
                    decreaseWordIndex()
                    setPrevInput(prevInputWord)
                }
                return
            }
            else {
                decreaseCharIndex()
                setKeyPressed("")
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

        if (code === "Space") {
            const correct = checkWord()
            if (correct || !correct) {
                resetCurrentCharIndex()
                resetKeyPressed()
                resetUserInput()
                increaseWordIndex()
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
            setCurrentUserInput(key)
            setKeyPressed(key)
            increaseCharIndex()
            setUserInputWordHistory(key)
            return
        }
    }, [
        setCurrentUserInput,
        setKeyPressed, 
        increaseCharIndex, 
        increaseWordIndex, 
        resetKeyPressed
    ])

    useEffect(() => {   
        console.log(wordsCorrect, wordsIncorrect)  
        window.addEventListener('keydown', handleUserInput)
        return () => window.removeEventListener('keydown', handleUserInput)
    }, [currentUserInput, wordsCorrect, wordsIncorrect])

    return { handleUserInput }
}

export { useInput }