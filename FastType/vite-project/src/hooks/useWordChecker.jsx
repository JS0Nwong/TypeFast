import { useGameState } from "./useGameState"
import useStore from "../utils/store"

const useWordChecker = () => {
  const { text } = useGameState()
  const {
    currentUserInput, 
    currentWordIndex,
    wordsCorrect,
    wordsIncorrect,
    prevInput,
    userInputWordHistory,
    setUserInputWordHistory,
    setPrevInput,
  } = useStore()

  const checkWord = () => {
    const wordToCompare = text[currentWordIndex]
    const userInput = currentUserInput.trim()
    const isCorrect = wordToCompare === userInput

    if (!userInput || userInput.length === 0) {
      return null
    }
    if (isCorrect) {
      wordsCorrect.add(currentWordIndex)
      wordsIncorrect.delete(currentWordIndex)
      let inputWordHistoryUpdate = { ...userInputWordHistory }
      inputWordHistoryUpdate[currentWordIndex] = userInput
      setUserInputWordHistory(inputWordHistoryUpdate)
      setPrevInput("")
      return true
    }
    else {
      wordsIncorrect.add(currentWordIndex)
      wordsCorrect.delete(currentWordIndex)
      let inputWordHistoryUpdate = { ...userInputWordHistory }
      setUserInputWordHistory(inputWordHistoryUpdate)
      setPrevInput(prevInput+ " " + userInput)
      return false
    }
  }

  return { checkWord }
}
export { useWordChecker }