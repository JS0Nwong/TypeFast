import { useMemo, useContext } from 'react'
import { Box } from "@mui/material"

import { ThemeContext } from "../hooks/useTheme"
import Caret from "./Carets/Caret"
import { useBoundStore } from '../utils/stores/boundStore';

export default function UserInputDisplay() {
    const {
        currentUserInput
    } = useBoundStore((state) => ({
        currentUserInput: state.currentUserInput
    }))

    const char = useMemo(() => {
        return currentUserInput?.split('');
    }, [currentUserInput]);

    const theme = useContext(ThemeContext)

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
                <Caret />
                {char.map((word, index) =>
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
