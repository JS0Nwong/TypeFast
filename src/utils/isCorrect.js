import { useEffect } from "react";
import useStore from "./store";
// import { updateWordsCorrect } from "./store";
// import { updateWordsIncorrect } from "./store";
import { useUpdateHistory } from "./store";

const isCorrect = () => {
  const {
    keyPressed,
    gameStatus,
    text,
    currentWordIndex,
    currentUserInput,
    prevInput,
    userInputWordHistory,
    setUserInputWordHistory,
    setPrevInput,    
    increaseRawWordsPerMinuteKeys,
  } = useStore();
  
  const {
    updateWordsCorrect,
    updateWordsIncorrect,
  } = useUpdateHistory();

  const checkWord = () => {
    // checks if user is active, return early if not
    if (gameStatus !== "ready") return
    
    // Gets the current word to check
    const wordToCompare = text[currentWordIndex];
    const userInput = currentUserInput.trim();
    const isCorrect = wordToCompare === userInput;

    if (!userInput || userInput.length === 0) {
      return null;
    }
    if (isCorrect) {
      updateWordsCorrect(currentWordIndex)
      let inputWordHistoryUpdate = { ...userInputWordHistory };
      inputWordHistoryUpdate[currentWordIndex] = userInput;
      setUserInputWordHistory(inputWordHistoryUpdate);
      setPrevInput("");
      increaseRawWordsPerMinuteKeys()
      return true;
    } else {
      updateWordsIncorrect(currentWordIndex)
      let inputWordHistoryUpdate = { ...userInputWordHistory };
      setUserInputWordHistory(inputWordHistoryUpdate);
      setPrevInput(prevInput + " " + userInput);
      return false;
    }
  };
  return { checkWord };
};
export { isCorrect };
