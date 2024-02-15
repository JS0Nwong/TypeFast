import { useEffect } from 'react'
import { useBoundStore } from '../utils/stores/boundStore'

const useFocus = () => {
    const { 
        focusedTextBox, 
        setInputFocus, 
        gameStatus, 
        userStatus, 
        setUserStatus 
    } = useBoundStore((state) => ({
        focusedTextBox: state.focusedTextBox,
        setInputFocus: state.setInputFocus,
        gameStatus: state.gameStatus,
        userStatus: state.userStatus,
        setUserStatus: state.setUserStatus,
    }))

    useEffect(() => {
        if (document.hasFocus()) {
            if (gameStatus === "unready") {
                setTimeout(() => {
                    gameStatus === 'unready' ? setInputFocus(!focusedTextBox) : setInputFocus(true)
                    userStatus === 'typing' ? setUserStatus('idle') : setUserStatus('typing')
                }, 15000)
            }
            else {
                setInputFocus(true)
                setUserStatus('typing')
            }
        }
        if (!document.hasFocus()) {
            setInputFocus(!focusedTextBox)
            setUserStatus('idle')
        }
    }, [gameStatus, userStatus])
}

export default useFocus