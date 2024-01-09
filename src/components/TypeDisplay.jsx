import { useMemo, useContext, useState, createRef } from 'react'
import { Box } from "@mui/material"
import { useApplySyles } from '../hooks/useApplySyles';

import Character from './Character';

export default function TypeDisplay({ words, incorrectExtraUserInputs }) {

  const {applyCharStyles, applyWordStyles} = useApplySyles()

  const wordsDict = useMemo(() => {
    return words
  }, [words])

  const wordsRef = useMemo(() => {
    return Array.from({
      length: words.length
    }).fill(0).map((i) => createRef())  
  }, [words])

  return (
    <Box
      onFocus={() => console.log('focused')}
      onBlur={() => console.log('blured')}
      sx={{
        display: "flex",
        flexWrap: 'wrap',
        userSelect: 'none',
        width: '100%',
      }}
    >
      {wordsDict.map((word, index) =>
        <div
          key={index}
          id={word + index}
          style={{
            margin: '5px 5px',
            display: 'flex',
            scrollMargin: '4px'
          }}
          className={applyWordStyles(index)}
          ref={wordsRef[index]}
        >
          {word.split('').map((char, idx) =>
            <Character
              key={char + idx}
              char={char}
              className={applyCharStyles(index, idx, char, word)}
            />
          )}
          {incorrectExtraUserInputs(word, index)}
        </div>
      )}
    </Box>
  )
}
