import { useState, useCallback } from "react"

const useClientSettings = () => {
    const [closeInput, setCloseInput] = useState(true)
    const [closeBehavior, setCloseBehavior] = useState(true)
    const [closeCaret, setCloseCaret] =  useState(true)
    const [closeTheme, setCloseTheme] = useState(true)
    const [closeApperance, setCloseApperance] =  useState(true)

    const handleCloseAccordion = useCallback((fn, value) => {
        fn(!value)
    }, [])

    const handleOpenAccordion = useCallback((fn, value) => {
        fn(!value)
    }, [])

    return { 
        closeInput, 
        closeBehavior, 
        closeCaret, 
        closeTheme, 
        closeApperance,  
        setCloseInput,
        setCloseBehavior,
        setCloseCaret,
        setCloseApperance,
        setCloseTheme,
        handleCloseAccordion,
        handleOpenAccordion,
    }
}

export { useClientSettings }