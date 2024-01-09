import React, { useCallback, useState } from 'react'

const useMetrics = () => {
    const [rawKeyStrokes, setRawKeyStrokes] = useState(0)
    const [wordsPerMinuteKeyStrokes, setWordsPerMinuteKeyStrokes] = useState(0)
    const [wordsPerMinute, setWordsPerMinute] = useState(0)
    const [accuracy, setAccuracy] = useState(0)
    const [wordsCorrect, setWordsCorrect] = useState(0)
    const [wordsIncorect, setWordsIncorrect] = useState(0)

    const updateWordsPerMinuteKeyStrokes = useCallback((keycode) => {
        if (keycode >= 65 && keycode <= 90) {
            setWordsPerMinuteKeyStrokes(wordsPerMinuteKeyStrokes + 1)
        }
    }, [])

    return {
        rawKeyStrokes,
        wordsPerMinuteKeyStrokes,
        wordsPerMinute,
        accuracy,
        wordsCorrect,
        wordsIncorect,
        setRawKeyStrokes,
        updateWordsPerMinuteKeyStrokes
    }
}

export { useMetrics }