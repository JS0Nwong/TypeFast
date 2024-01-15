import { useMemo, createRef, useEffect } from 'react'
import { Box, Typography } from "@mui/material"

import { applyStyles } from '../utils/applyStyles';
import { useInput } from '../hooks/useInput';
import useStore from '../utils/store';
import Character from './Character';
import useFocus from '../hooks/useFocus';

export default function TypeDisplay({ words }) {
  const { applyWordStyles, applyCharStyles } = applyStyles()
  const { focusedTextBox, setInputFocus, currentWordIndex } = useStore()

  // needed to initialize user input handler
  const { handleUserInput } = useInput()

  const wordsDict = useMemo(() => {
    return words
  }, [words])

  const wordsRef = useMemo(() => {
    return Array.from({
      length: words.length
    }).fill(0).map((i) => createRef())  
  }, [words])

  useEffect(() => {
    if(currentWordIndex !==0 &&
        wordsRef[currentWordIndex].current.offsetLeft < 
        wordsRef[currentWordIndex - 1].current.offsetLeft
      )
    wordsRef[currentWordIndex - 1].current.scrollIntoView()
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
          // filter: focusedTextBox ? "none" : "blur(6.5px)",
          transition: "0.15s ease",
        }}
      > 
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
                className={applyCharStyles(index, idx, char, word)}>
                {char}
              </span>
              // <Character
              //   key={char + idx}
              //   char={char}
              //   className={applyCharStyles(index, idx, char, word)}
              // />
            )}
          </div>
        )}
      </Box>
    </>
  )
}
