import { useMemo, createRef, useEffect } from 'react'
import { Box } from "@mui/material"

import { applyStyles } from '../../utils/applyStyles';
import { useInput } from '../../hooks/useInput';
import { useBoundStore } from '../../utils/stores/boundStore'

import Caret from "../Carets/Caret"

export default function TypeGame() {
    const { applyWordStyles, applyCharStyles } = applyStyles()
    const {
        gameText,
        focusedTextBox,
        setUserStatus,
        setInputFocus,
        currentWordIndex,
    } = useBoundStore((state) => ({
        currentWordIndex: state.currentWordIndex,
        gameText: state.gameText,
        focusedTextBox: state.focusedTextBox,
        setUserStatus: state.setUserStatus,
        setInputFocus: state.setInputFocus,
    }))

    const { displayExtraCharacters } = useInput()

    const wordsDict = useMemo(() => {
        return gameText
    }, [gameText])

    const wordsRef = useMemo(() => {
        return Array.from({
            length: gameText.length
        }).fill(0).map((i) => createRef())
    }, [gameText])

    // useeffect to listen to changes in the text to move it foward properly
    useEffect(() => {
        if (currentWordIndex !== 0 &&
            wordsRef[currentWordIndex]?.current.offsetLeft <
            wordsRef[currentWordIndex - 1]?.current.offsetLeft
        )
            wordsRef[currentWordIndex - 1]?.current.scrollIntoView()
    }, [currentWordIndex, wordsRef])

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: 'wrap',
                    userSelect: 'none',
                    width: '100%',
                    maxHeight: "145px",
                    overflow: "hidden",
                    position: 'relative',
                }}
                id="words"
            >
                <Caret />
                {wordsDict.map((word, index) =>
                    <div
                        key={index}
                        id={index}
                        style={{
                            margin: '5px 5px',
                            scrollMargin: '4px'
                        }}
                        className={applyWordStyles(index)}
                        ref={wordsRef[index]}
                    >
                        {word.split('').map((char, idx) =>
                            <span
                                key={char + idx}
                                className={applyCharStyles(index, idx, char, word)}
                            >
                                {char}
                            </span>
                        )}
                        {displayExtraCharacters(word, index)}
                    </div>
                )}
            </Box>
        </>
    )
}
