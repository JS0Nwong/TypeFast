import { useState, useCallback, useRef } from 'react'
import generateWords from "../utils/generateWords"
import useStore from '../utils/store'

const useGameState = () => {
    const [gameStatus, setGameStatus] = useState('unready')
    const [text, setText] = useState(() => generateWords())
    const [time, setTime] = useState(60)
    const [timeInterval, setTimeInterval] = useState(null)

    const regenerateText = useCallback(() => {
        return setText(generateWords())
    }, [setText, text])

    const startGame = () => {
        if (gameStatus === 'finished') {
            setGameStatus('unready')
        }
        if (gameStatus !== "ready") {
            setGameStatus("ready")
            let interval = setInterval(() => {
                setTime((prevTime) => {
                    if(prevTime === 0) {}
                    else {
                        return prevTime - 1
                    }
                })
            }, 1000)
            setTimeInterval(interval)
        }
    }

    const restartGame = useCallback(() => {
        regenerateText()
        setGameStatus('unready')
    }, [regenerateText])

    return {
        gameStatus,
        text,
        timeInterval,
        startGame,
        restartGame,
        regenerateText,
    }

}
export { useGameState }
