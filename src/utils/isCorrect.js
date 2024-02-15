import { useUpdateHistory } from "./stores/store";
import { useUserInputStore } from "./stores/userInputStore";

import { useBoundStore } from "./stores/boundStore";

const isCorrect = () => {
  const {
    gameStatus,
    text,
    setPrevInput,
    setUserInputWordHistory,
    currentWordIndex,
    currentUserInput,
    prevInput,
    userInputWordHistory,
    increaseRawWordsPerMinuteKeys,
    // updateWordsCorrect,
    // updateWordsIncorrect,
  } = useBoundStore((state) => ({
    gameStatus: state.gameStatus,
    text: state.text,
    updateWordsCorrect: state.updateWordsCorrect,
    updateWordsIncorrect: state.updateWordsIncorrect,
    setPrevInput: state.setPrevInput,
    setUserInputWordHistory: state.setUserInputWordHistory,
    currentWordIndex: state.currentWordIndex,
    currentUserInput: state.currentUserInput,
    prevInput: state.prevInput,
    userInputWordHistory: state.userInputWordHistory,
    increaseRawWordsPerMinuteKeys: state.increaseRawWordsPerMinuteKeys,
    // updateWordsCorrect: state.updateWordsCorrect,
    // updateWordsIncorrect: state.updateWordsIncorrect,
  }));
  
  const {
    updateWordsCorrect,
    updateWordsIncorrect,
  } = useUpdateHistory()

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
