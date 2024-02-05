import { useEffect } from "react";
import useStore from "./store";
import { useUpdateHistory } from "./store";

const isCorrect = () => {
  const {
    gameStatus,
    text,
    currentWordIndex,
    currentUserInput,
    prevInput,
    userInputWordHistory,
    setUserInputWordHistory,
    setPrevInput,    
    increaseRawWordsPerMinuteKeys,
  } = useStore((state) => ({
    gameStatus: state.gameStatus ,
    text: state.text ,
    currentWordIndex: state.currentWordIndex ,
    currentUserInput: state.currentUserInput ,
    prevInput: state.prevInput ,
    userInputWordHistory: state.userInputWordHistory,
    setUserInputWordHistory: state. setUserInputWordHistory,
    setPrevInput: state. setPrevInput,    
    increaseRawWordsPerMinuteKeys: state.increaseRawWordsPerMinuteKeys ,
  }));
  
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
