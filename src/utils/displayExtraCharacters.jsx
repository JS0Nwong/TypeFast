import useStore from "./store";
const displayExtraCharacters = () => {
  const display = (word, index) => {
    const {
      history,
      userInputWordHistory,
      currentUserInput,
      currentWordIndex,
    } = useStore();
    const input = userInputWordHistory[index];
    if (!input) {
      input = currentUserInput.trim();
    }
    if (i > currentWordIndex) {
      return null;
    }
    if (input.length <= word.length) {
      return null;
    } else {
      const extraChars = input.slice(word.length, input.length).split("");
      history[index].extraChars.length;
      return extraChars.map((char, index) => (
        <span key={index} className="incorrect-char">
          {char}
        </span>
      ));
    }
  };

  return { display };
};

export { displayExtraCharacters }
