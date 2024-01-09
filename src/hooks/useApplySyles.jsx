import React from 'react'
import useStore from '../utils/store'

const useApplySyles = () => {
    const {
        keyPressed,
        wordsCorrect, 
        wordsIncorrect,
        currentWordIndex,
        currentCharIndex,
        history
    } = useStore()
    const applyCharStyles = (wordIndex, charIndex, char, word) => {
        const keyString = wordIndex + "." + charIndex
        if(history[keyString] === true) {
            return 'correct-char'
        }
        if(history[keyString] === false) {
            return 'incorrect-char'
        }
        if(
            wordIndex === currentWordIndex && 
            charIndex === currentCharIndex &&
            keyPressed
        ) {
            if(char === keyPressed) {
                history[keyString] = true
                return 'correct-char'
            } else {
                history[keyString] = false
                return 'error-char'
            }
        } else {
            if(wordIndex < currentWordIndex) {history[keyString] = undefined}
            return 'char'
        }
    }
    const applyWordStyles = (index) => {
        if (wordsIncorrect.has(index)) {
            if (currentWordIndex === index) {
                return 'word incorrect-word'
            }
        } else {
            if (currentWordIndex === index) {
                return "word active"
            }
            return 'word'
        }
    }

    return { applyCharStyles, applyWordStyles }
}

export { useApplySyles }