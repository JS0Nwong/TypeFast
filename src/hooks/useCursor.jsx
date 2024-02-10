import { useBoundStore } from "../utils/stores/boundStore"

const useCursor = () => {

    const { 
        currentUserInput,
        setCursorLeftPosition, 
        setCursorTopPosition 
    } = useBoundStore((state) => ({
        setCursorLeftPosition: state.setCursorLeftPosition,
        setCursorTopPosition: state.setCursorTopPosition,
        currentUserInput: state.currentUserInput
    }))
    const updateBackSpace = () => {
        const currentWordsLetterList = document.querySelector('#words .active-word').querySelectorAll('.char')

        const caretWidth = Math.round(
            document.querySelector("#caret")?.getBoundingClientRect().width ?? 0
        );
        const inputLen = currentUserInput?.length
        const currentLetterIndex = inputLen

        if (!currentWordsLetterList) return

        // current letter where the cursor will be
        const currentLetter = currentWordsLetterList[currentLetterIndex]
        const previousLetter = currentWordsLetterList[
            Math.min(currentLetterIndex - 1, currentWordsLetterList.length - 1)
        ]

        // need to fix cursor backspace behavior
        const letterPosLeft =
            (currentLetter
                ? currentLetter.offsetLeft
                : previousLetter.offsetLeft + previousLetter.offsetWidth)
            -
            (currentLetter
                ? currentLetter.offsetWidth
                : previousLetter.offsetWidth)

        const lettePosTop =
            currentLetter ?
                currentLetter?.offsetTop :
                previousLetter?.offsetTop

        const newTop = lettePosTop
        const newLeft = letterPosLeft - caretWidth / 2

        setCursorLeftPosition(newLeft)
        setCursorTopPosition(newTop)
    }

    const updatePosition = () => {
        // get currrent word and letters that cusor will be moving on
        const currentWordsLetterList = document.querySelector('#words .active-word').querySelectorAll('.char')

        const caretWidth = Math.round(
            document.querySelector("#caret")?.getBoundingClientRect().width ?? 0
        );    
        const inputLen = currentUserInput?.length
        const currentLetterIndex = inputLen

        if (!currentWordsLetterList) return

        // current letter where the cursor will be
        const currentLetter = currentWordsLetterList[currentLetterIndex]
        const previousLetter = currentWordsLetterList[
            Math.min(currentLetterIndex - 1, currentWordsLetterList.length - 1)
        ]

        // need to fix cursor backspace behavior
        const letterPosLeft =
            (currentLetter
                ? currentLetter.offsetLeft
                : previousLetter.offsetLeft + previousLetter.offsetWidth) 
            +
            (currentLetter
                ? currentLetter.offsetWidth
                : previousLetter.offsetWidth)
        
        const lettePosTop = 
            currentLetter ? 
            currentLetter?.offsetTop : 
            previousLetter?.offsetTop

        const newTop = lettePosTop
        const newLeft = letterPosLeft - caretWidth / 2

        setCursorLeftPosition(newLeft)
        setCursorTopPosition(newTop)

    }
    return { updatePosition, updateBackSpace }
}
export { useCursor }