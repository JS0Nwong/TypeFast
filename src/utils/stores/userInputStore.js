export const useUserInputStore = (set, get) => ({
  keyPressed: "",
  currentUserInput: "",
  userInputKeyHistory: {},
  currentWordIndex: 0,
  currentCharIndex: -1,
  userInputWordHistory: {},
  prevInput: "",
  history: {},
  setKeyPressed: (key) =>
    set({
      keyPressed: key,
    }),
  setCurrentUserInput: (input) =>
    set({
      currentUserInput: get().currentUserInput + input,
    }),
  setUserInputKeyHistory: () =>
    set({
      // TODO: need to add setter values
    }),
  setCurrentWordIndex: (index) =>
    set({
      currentWordIndex: index,
    }),
  setCurrentCharIndex: (index) =>
    set({
      currentCharIndex: index,
    }),
  setWordsCorrect: (word) =>
    set({
      wordsCorrect: word,
    }),
  setWordsIncorrect: (word) =>
    set({
      wordsIncorrect: word,
    }),
  setUserInputWordHistory: () =>
    set((state) => ({
      userInputWordHistory: {
        ...state.userInputWordHistory,
        [state.currentWordIndex]: state.currentUserInput.trim(),
      },
    })),
  setPrevInput: (input) =>
    set({
      prevInput: input,
    }),
  setHistory: (char) =>
    set({
      history: char,
    }),

  // input utility setters
  increaseCharIndex: () =>
    set({
      currentCharIndex: get().currentCharIndex + 1,
    }),
  decreaseCharIndex: () =>
    set({
      currentCharIndex: get().currentCharIndex - 1,
    }),
  increaseWordIndex: () =>
    set({
      currentWordIndex: get().currentWordIndex + 1,
    }),
  decreaseWordIndex: () =>
    set({
      currentWordIndex: get().currentWordIndex - 1,
    }),
  resetCurrentCharIndex: () => set({ currentCharIndex: -1 }),
  resetUserInput: () => set({ currentUserInput: "" }),
  resetKeyPressed: () => set({ keyPressed: "" }),
  previousUserInput: () =>
    set((state) => ({
      currentUserInput: state.currentUserInput.slice(
        0,
        state.currentCharIndex + 1
      ),
    })),
});
