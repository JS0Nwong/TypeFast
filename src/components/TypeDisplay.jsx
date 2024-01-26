import { useMemo, createRef, useEffect } from 'react'
import { Box } from "@mui/material"

import { applyStyles } from '../utils/applyStyles';
import { useInput } from '../hooks/useInput';
import useStore from '../utils/store';
import useFocus from '../hooks/useFocus';
import Caret from "../components/Caret"

export default function TypeDisplay() {
  const { applyWordStyles, applyCharStyles } = applyStyles()
  const { currentWordIndex, text } = useStore()

  // needed to initialize user input handler
  const { handleUserInput, displayExtraCharacters } = useInput()

  const wordsDict = useMemo(() => {
    return text
  }, [text])

  const wordsRef = useMemo(() => {
    return Array.from({
      length: text.length
    }).fill(0).map((i) => createRef())
  }, [text])

  const charRef = useMemo(() => {
    return wordsDict.map(
      (str) => str.split('').map((char) => createRef())
    )
  }, [])


  useEffect(() => {
    if (currentWordIndex !== 0 &&
      wordsRef[currentWordIndex].current.offsetLeft <
      wordsRef[currentWordIndex - 1].current.offsetLeft
    )
      wordsRef[currentWordIndex - 1].current.scrollIntoView()
  }, [currentWordIndex, wordsRef])

  useEffect(() => {
    console.log(charRef)
  }, [])

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
          // filter: focusedTextBox ? "none" : "blur(6.5px)",
          transition: "0.15s ease",
        }}
      >          
        <Caret />
        {wordsDict.map((word, index) =>
          <div
            key={index}
            id={index}
            style={{
              margin: '5px 5px',
              display: 'flex',
              scrollMargin: '4px'
            }}
            className={applyWordStyles(index)}
            ref={wordsRef[index]}
          >
            {word.split('').map((char, idx) =>
              <span
                key={char + idx}
                className={applyCharStyles(index, idx, char, word)}
                ref={charRef[index][idx]}
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
