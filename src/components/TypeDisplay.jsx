import { useMemo, createRef, useEffect } from 'react'
import { Box, Typography } from "@mui/material"
import { LuMousePointer2 } from "react-icons/lu";

import { applyStyles } from '../utils/applyStyles';
import { useInput } from '../hooks/useInput';
import useFocus from '../hooks/useFocus';
import { useBoundStore } from '../utils/stores/boundStore'

import Caret from "./Carets/Caret"

export default function TypeDisplay() {
  const { applyWordStyles, applyCharStyles } = applyStyles()

  const {
    text,
    focusedTextBox,
    setUserStatus,
    setInputFocus,
    currentWordIndex,
  } = useBoundStore((state) => ({
    currentWordIndex: state.currentWordIndex,
    text: state.text,
    focusedTextBox: state.focusedTextBox,
    setUserStatus: state.setUserStatus,
    setInputFocus: state.setInputFocus,
  }))

  const focus = useFocus()

  // needed to initialize user input handler
  const { displayExtraCharacters } = useInput()

  const wordsDict = useMemo(() => {
    return text
  }, [text])

  const wordsRef = useMemo(() => {
    return Array.from({
      length: text.length
    }).fill(0).map((i) => createRef())
  }, [text])

  const handleFocus = () => {
    setUserStatus('typing')
    setInputFocus(true)
  }

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
        onClick={() => handleFocus()}
      >
        {focusedTextBox ? <></> : <Typography sx={{
          position: 'absolute',
          top: '50%',
          left: "50%",
          maxHeight: "160px",
          height: '100%',
          transform: "translate(-50%, -50%)",
          width: "100%",
          textAlign: 'center',
          zIndex: 99,
          backdropFilter: 'blur(4px)',
          transition: '0.65s ease-in-out',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <LuMousePointer2 style={{ marginRight: '8px' }} />
          click or start typing to focus
        </Typography>
        }
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
