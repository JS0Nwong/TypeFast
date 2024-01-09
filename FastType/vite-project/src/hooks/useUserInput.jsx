import { useState, useEffect, useCallback } from "react"
import { useCursor } from "./useCursor"
import { allowedInputs } from "../utils/allowedInputs"
import { useMetrics } from "./useMetrics"
import { useWordChecker } from "./useWordChecker"
import { useGameState } from "./useGameState"
import useStore from "../utils/store"
import Character from "../components/Character"

const useUserInput = () => {
    // State variables and definitions
    const [userState, setUserState] = useState('active')
    const [charTyped, setCharTyped] = useState('')
    const [totalCharTyped, setTotalCharTyped] = useState('')
    const [userInputKeyHistory, setUserInputKeyHistory] = useState({}) 
    
    const {
        history,
        userInputWordHistory,
        setUserInputWordHistory,
        wordsIncorrect,
        keyPressed,
        setKeyPressed,
        currentUserInput,
        setCurrentUserInput,
        currentWordIndex,
        setCurrentWordIndex,
        currentCharIndex,
        setCurrentCharIndex,
        setPrevInput,
        increaseWordIndex,
        decreaseWordIndex,
        increaseCharIndex,
        decreaseCharIndex,
        resetUserInput,
     } = useStore()

    // Hooks
    const {
        rawKeyStrokes,
        setRawKeyStrokes,
    } = useMetrics()

    const { checkWord, gameStatus } = useWordChecker()

    const {
        cursorPosition,
        updateCursorPosition,
        resetCursor
    } = useCursor()

    const { startGame } = useGameState()
    const keyString = currentWordIndex + "." + currentCharIndex

    const handleInputChange = useCallback((value) => {
        if (gameStatus === 'finished') { return }
        setCurrentUserInput(value)
        userInputWordHistory[currentWordIndex] = value.trim()
        setUserInputWordHistory(userInputKeyHistory)
    }, [currentUserInput]) 

    const handleKeyDown = useCallback(({ key, code, keyCode }) => {
        if (!allowedInputs(code)) return
        if (gameStatus === 'finished') return
        if (gameStatus !== 'finished' && gameStatus !== "started") { startGame() }

        if (code === "Space") {
            const correctWord = checkWord()
            if (correctWord === true || correctWord === false) {
                resetUserInput()
                setCurrentUserInput('')
                increaseWordIndex()
                setCurrentCharIndex(-1)
            } else {
                return
            }
        }
        else if(code === "Backspace") {
            delete history[keyString]
            if(currentCharIndex < 0) {
                if(wordsIncorrect.has(currentWordIndex - 1)) {
                    const prevInputWord = userInputWordHistory[currentWordIndex - 1]
                    setCurrentUserInput(prevInputWord +  " ");
                    setCurrentCharIndex(prevInputWord.length - 1)
                    decreaseWordIndex()
                    setPrevInput(prevInputWord)
                }
                return
            }
            decreaseCharIndex()
            setKeyPressed("")
            return
        }
        else {
            increaseCharIndex()
            setKeyPressed(key)
            return
        }

        // setKeyPressed(key)
        // if(key === "Space") {
        //     setWordIndex(wordIndex + 1)
        // }

        // if (gameStatus !== "ready" && gameStatus !== "finished") {
        //     // startGame()
        //     if (!allowedInputs(code)) return
        //     if (key === 'Backspace') {
        //         if (charTyped.length > 0 && cursorPosition > 0) {
        //             setCharTyped(charTyped.slice(0, charTyped.length - 1));
        //             updateCursorPosition('decrease');
        //         }
        //         return
        //     }
        //     if (key === "Space") {
        //         const correct = checkWord()
        //     }
        //     setCharTyped((prev) => prev + key)
        //     setKeyPressed(key)
        //     updateCursorPosition('increase')
        //     setRawKeyStrokes(rawKeyStrokes + 1)
        // }
    }, [
        currentUserInput,
        setCurrentUserInput,
        checkWord,
        resetUserInput,
        increaseCharIndex,
        decreaseCharIndex,
        setKeyPressed,
        // userState,
        // charTyped,
        // charTyped.length,
        // cursorPosition,
        // updateCursorPosition,
        // setKeyPressed,
        // setCharTyped,
    ])

    const resetCharTyped = useCallback(() => {
        setCharTyped('')
    }, [setCharTyped])

    const incorrectExtraUserInputs = (word, index) => {
        let input = userInputWordHistory[index]
        if(!input) { input = currentUserInput.trim() }
        if (index > currentWordIndex) { return null }
        if (input.length <= word.length) { return null }
        const extraChars = input.slice(word.length, input.length).split("")
        history[index] = extraChars.length
        return extraChars.map((char, index) =>
            <span key={index} style={{fontSize: "1.5rem"}}>
                {char}
            </span>
        )
    }

    useEffect(() => {
        // console.log(keyPressed)
        // window.addEventListener('keydown', handleKeyDown)
        // return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return {
        currentUserInput,
        keyPressed,
        charTyped,
        totalCharTyped,
        userState,
        cursorPosition,
        setCharTyped,
        setTotalCharTyped,
        setUserState,
        resetCursor,
        resetCharTyped,
        handleInputChange,
        handleKeyDown,
        incorrectExtraUserInputs,
    }
}

export { useUserInput }