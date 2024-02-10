import useStore from "./stores/store";
import { useUpdateHistory } from "./stores/store";
import { useUserInputStore } from "./stores/userInputStore";

const isCorrect = () => {
  const {
    gameStatus,
    text,
    setUserInputWordHistory,
  } = useStore((state) => ({
    gameStatus: state.gameStatus ,
    text: state.text ,
    setUserInputWordHistory: state.setUserInputWordHistory,
  }));

  const {
    currentWordIndex,
    currentUserInput,
    prevInput,
    userInputWordHistory,
  } = useUserInputStore((state) => ({
    currentWordIndex: state.currentWordIndex,
    currentUserInput: state.currentUserInput,
    prevInput: state.prevInput,
    userInputWordHistory: state.userInputWordHistory,
  }));

  // const { setPrevInput } = useUserInputStoreActions();

  // const {
  //   increaseRawWordsPerMinuteKeys,
  // } = useUserStatsStoreActions()
  
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
