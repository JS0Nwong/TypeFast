import { useCallback } from "react";
import useStore from "../utils/store";
import { useUpdateHistory } from "./store";

const applyStyles = () => {
  const { keyPressed, currentWordIndex, currentCharIndex, history } = useStore(
    (state) => ({
      keyPressed: state.keyPressed,
      currentWordIndex: state.currentWordIndex,
      currentCharIndex: state.currentCharIndex,
      history: state.history,
    })
  );
  const { wordsIncorrect } = useUpdateHistory();

  //Apply char style based on if the inputted char is correct or not
  /*
   *
   *
   *
   */
  const applyCharStyles = (wordIndex, charIndex, char, word) => {
    const keyString = wordIndex + "." + charIndex;
    if (history[keyString] === true) {
      return "correct-char char";
    }
    if (history[keyString] === false) {
      return "incorrect-char char";
    }
    if (
      wordIndex === currentWordIndex &&
      charIndex === currentCharIndex &&
      keyPressed
    ) {
      if (char === keyPressed) {
        history[keyString] = true;
        return "correct-char char";
      } else {
        history[keyString] = false;
        return "error-char char";
      }
    } else {
      if (wordIndex < currentWordIndex) {
        history[keyString] = undefined;
      }
      return "char";
    }
  };
  const applyWordStyles = (index) => {
    if (wordsIncorrect.has(index)) {
      if (currentWordIndex === index) {
        return "word incorrect-word active-word";
      }
      return "word incorrect-word";
    } else {
      if (currentWordIndex === index) {
        return "word active-word";
      }
      return "word";
    }
  };

  return { applyCharStyles, applyWordStyles };
};

export { applyStyles };
