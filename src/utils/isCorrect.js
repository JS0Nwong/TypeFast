import { useEffect } from "react";
import useStore from "./store";
import { updateWordsCorrect } from "./store";
import { updateWordsIncorrect } from "./store";
import { useUpdateHistory } from "./store";

const isCorrect = () => {
  const {
    gameStatus,
    keyPressed,
    text,
    currentWordIndex,
    currentCharIndex,
    currentUserInput,
    wordsCorrect,
    wordsIncorrect,
    prevInput,
    userInputWordHistory,
    setUserInputWordHistory,
    setPrevInput,    
  } = useStore();

  //checks if user is active

  const checkWord = () => {
    // Gets the current word to check
    if (gameStatus !== "ready") return

    const wordToCompare = text[currentWordIndex];
    const userInput = currentUserInput.trim();
    const isCorrect = wordToCompare === userInput;

    if (!userInput || userInput.length === 0) {
      return null;
    }
    if (isCorrect) {
      // useUpdateHistory.setState((prev) => ({
      //   wordsCorrect: new Set(prev.wordsCorrect).add(currentWordIndex),
      //   wordsIncorrect: new Set(prev.wordsIncorrect).delete(currentWordIndex),
      // }))
      // updateWordsCorrect(currentWordIndex)

      useStore.setState((prev) => ({
        wordsCorrect: new Set(prev.wordsCorrect).add(currentWordIndex),
        wordsIncorrect: new Set(prev.wordsIncorrect).delete(currentWordIndex)
      }))
      let inputWordHistoryUpdate = { ...userInputWordHistory };
      inputWordHistoryUpdate[currentWordIndex] = userInput;
      setUserInputWordHistory(inputWordHistoryUpdate);
      setPrevInput("");
      return true;
    } else {
      // useUpdateHistory.setState((prev) => ({
      //   wordsIncorrect: new Set(prev.wordsIncorrect).add(currentWordIndex),
      //   wordsCorrect: new Set(prev.wordsCorrect).delete(currentWordIndex),
      // }))
      // updateWordsIncorrect(currentWordIndex)

      useStore.setState((prev) => ({
        wordsIncorrect: new Set(prev.wordsIncorrect).add(currentWordIndex),
        wordsCorrect: new Set(prev.wordsCorrect).delete(currentWordIndex),
      }))
      let inputWordHistoryUpdate = { ...userInputWordHistory };
      setUserInputWordHistory(inputWordHistoryUpdate);
      setPrevInput(prevInput + " " + userInput);
      return false;
    }
  };
  return { checkWord };
};
export { isCorrect };
