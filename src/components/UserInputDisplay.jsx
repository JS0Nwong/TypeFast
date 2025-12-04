import { useMemo, useContext, createRef } from 'react'
import { Box } from "@mui/material"

import Caret from "./Carets/Caret"
import { ThemeContext } from "../hooks/useTheme"
import { useBoundStore } from '../utils/stores/boundStore';
import { useFreeInput } from '../hooks/useFreeInput';

export default function UserInputDisplay() {
    const {
        freeInput,
        setFreeInput
    } = useBoundStore((state) => ({
        freeInput: state.freeInput,
        setFreeInput: state.setFreeInput
    }))

    const char = useMemo(() => {
        return freeInput?.split('');
    }, [freeInput]);

    const wordsRef = useMemo(() => {
        return Array.from({
          length: freeInput.length
        }).fill(0).map((i) => createRef())
      }, [freeInput])
    

    const handleUserInput = (value) => {
        setFreeInput(value)
    }


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
                }}
                id="words"
            >
                <Caret />
                {char.map((word, index) =>
                    <div
                        key={index}
                        id={index}
                        style={{
                            margin: '5px 5px',
                            scrollMargin: '4px'
                        }}
                        className='word'
                        ref={wordsRef[index]}
                    >
                        {word.split('').map((char, idx) =>
                            <span
                                key={char + idx}
                                className='char'
                            >
                                {char}
                            </span>
                        )}
                    </div>
                )}
                <input
                    autoComplete='false'
                    autoFocus
                    type="text"
                    value={freeInput}
                    onChange={(e) => handleUserInput(e.target.value)}
                    className="input"
                    style={{
                        width: '100px',
                        position: 'absolute',
                        zIndex: 99,
                        top: 0,
                        
                    }}
                
                />
            </Box>
        </>
    )
}
