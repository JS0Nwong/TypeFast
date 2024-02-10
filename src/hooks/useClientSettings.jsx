import { useState, useCallback } from "react"

const useClientSettings = () => {
    const [closeInput, setCloseInput] = useState(true)
    const [closeBehavior, setCloseBehavior] = useState(true)
    const [closeCaret, setCloseCaret] =  useState(true)
    const [closeTheme, setCloseTheme] = useState(true)
    const [closeApperance, setCloseApperance] =  useState(true)

    const handleCloseAccordion = (fn, value) => {
        fn(false)
    }

    const handleOpenAccordion = (fn, value) => {
        fn(true)
    }

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