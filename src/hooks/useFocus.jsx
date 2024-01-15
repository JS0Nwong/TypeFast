import React, { useEffect } from 'react'
import useStore from '../utils/store'

const useFocus = () => {
    const { focusedTextBox, setInputFocus, gameStatus } = useStore()
    useEffect(() => {
        setTimeout(() => {
            gameStatus === 'unready' ? setInputFocus(!focusedTextBox) : setInputFocus(true)
        }, 500)
    }, [gameStatus])
}

export default useFocus