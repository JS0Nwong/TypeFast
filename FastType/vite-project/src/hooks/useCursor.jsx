import { useState } from "react";

const useCursor = () => {
    const [cursorPosition, setCursorPosition] = useState(0)

    const resetCursor = () => setCursorPosition(0)

    const updateCursorPosition = (value) => {
        if (value === 'increase') { setCursorPosition((cursorPosition) => cursorPosition + 1) }
        else { setCursorPosition((cursorPosition) => cursorPosition - 1) }
    }
    return { cursorPosition, resetCursor, updateCursorPosition }
}
export { useCursor }