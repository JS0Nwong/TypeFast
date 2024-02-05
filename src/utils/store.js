import { createWithEqualityFn } from "zustand/traditional";
import { devtools, persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import generateWords from "./generateWords";

export const useUpdateHistory = createWithEqualityFn((set) => ({
  wordsCorrect: new Set(),
  wordsIncorrect: new Set(),
  updateWordsCorrect: (wordIndex) => {
    return useUpdateHistory.setState((prev) => ({
      wordsCorrect: new Set(prev.wordsCorrect).add(wordIndex),
    }));
  },
  updateWordsIncorrect: (wordIndex) => {
    return useUpdateHistory.setState((prev) => ({
      wordsIncorrect: new Set(prev.wordsIncorrect).add(wordIndex),
    }));
  },
  resetHistory: () => {
    set({ wordsCorrect: new Set(), wordsIncorrect: new Set() });
  },
}));

const store = (set, get) => ({
  // user information & data
  isAuthenticated: false,
  userData: {},
  userStatus: "typing", //user statuses: "typing, idle"
  // game state
  gameStatus: "unready", //game statuses: "unready, ready, finished"
  text: generateWords(),
  focusedTextBox: true,
  hideElements: false,
  cursorPositionLeft: 5,
  cursorPositionTop: 5,
  // game setting options
  textOptions: [],
  mode: "time",
  selectedTime: 60,
  time: 60,
  // user input state
  keyPressed: "",
  currentUserInput: "",
  userInputKeyHistory: {},
  currentWordIndex: 0,
  currentCharIndex: -1,
  userInputWordHistory: {},
  prevInput: "",
  history: {},
  // user stats for after the game ends
  rawKeysPerMinute: 0,
  wordsPerMinute: 0,
  wordAccuracy: 0,
  charAccuracy: 0,
  rawWordsPerMinuteKeys: 0,
  rawWpm: 0,
  extraCharsCount: 0,
  // modal states
  openFontModal: false,
  openThemeModal: false,
  // snackbar state
  snackbarMessage: "",

  // modal state setter
  setThemeModal: (boolean) =>
    set({
      openThemeModal: boolean,
      userStatus: "searching",
      focusedTextBox: false,
    }),
  setFontModal: (boolean) =>
    set({
      openFontModal: boolean,
      userStatus: "searching",
      focusedTextBox: false,
    }),
  //snackbar state setter
  setSnackbar: (text) => set({
    snackbarMessage: text,
  }),

  // user information
  setIsAuthenticated: (status) =>
    set({
      isAuthenticated: status,
    }),
  setUserStatus: (status) =>
    set({
      userStatus: status,
    }),

  // game state
  setGameStatus: (status) =>
    set({
      gameStatus: status,
    }),
  setText: (text) =>
    set({
      text: text,
    }),
  startGame: (status) =>
    set({
      gameStatus: status,
      hideElements: true,
    }),

  // setters for cursor position
  setCursorLeftPosition: (pos) =>
    set({
      cursorPositionLeft: pos,
    }),
  setCursorTopPosition: (pos) =>
    set({
      cursorPositionTop: pos,
    }),

  // setters for user input state
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

  //set game options
  setMode: (mode) =>
    set({
      mode: mode,
    }),

  setTime: (option) =>
    set({
      selectedTime: option,
      time: option,
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
  resetUserInput: () => set({ currentUserInput: "" }),
  resetKeyPressed: () => set({ keyPressed: "" }),
  previousUserInput: () =>
    set((state) => ({
      currentUserInput: state.currentUserInput.slice(
        0,
        state.currentCharIndex + 1
      ),
    })),

  // game options
  regenerateText: () =>
    set((state) => ({
      userStatus: "typing",
      focusedTextBox: true,
      keyPressed: "",
      currentUserInput: "",
      userInputKeyHistory: {},
      currentWordIndex: 0,
      currentCharIndex: -1,
      wordsCorrect: new Set(),
      wordsIncorrect: new Set(),
      userInputWordHistory: {},
      prevInput: "",
      history: {},
      text: generateWords(),
      hideElements: false,
      gameStatus: "unready",
      time: state.selectedTime,
      rawKeysPerMinute: 0,
      wordsPerMinute: 0,
      wordAccuracy: 0,
      charAccuracy: 0,
      rawWordsPerMinuteKeys: 0,
      rawWpm: 0,
      extraCharsCount: 0,
      cursorPositionLeft: 5,
      cursorPositionTop: 5,
    })),
  nextTest: () =>
    set((state) => ({
      keyPressed: "",
      currentUserInput: "",
      userInputKeyHistory: {},
      currentWordIndex: 0,
      currentCharIndex: -1,
      wordsCorrect: new Set(),
      wordsIncorrect: new Set(),
      userInputWordHistory: {},
      prevInput: "",
      history: {},
      text: generateWords(),
      hideElements: false,
      gameStatus: "unready",
      time: state.selectedTime,
      rawKeysPerMinute: 0,
      wordsPerMinute: 0,
      wordAccuracy: 0,
      charAccuracy: 0,
      rawWordsPerMinuteKeys: 0,
      rawWpm: 0,
      extraCharsCount: 0,
      cursorPositionLeft: 5,
      cursorPositionTop: 5,
    })),
  repeatTest: () =>
    set((state) => ({
      text: state.text,
      keyPressed: "",
      currentUserInput: "",
      userInputKeyHistory: {},
      currentWordIndex: 0,
      currentCharIndex: -1,
      wordsCorrect: new Set(),
      wordsIncorrect: new Set(),
      userInputWordHistory: {},
      prevInput: "",
      history: {},
      hideElements: false,
      gameStatus: "unready",
      time: state.selectedTime,
      rawKeysPerMinute: 0,
      wordsPerMinute: 0,
      wordAccuracy: 0,
      charAccuracy: 0,
      rawWordsPerMinuteKeys: 0,
      rawWpm: 0,
      extraCharsCount: 0,
      cursorPositionLeft: 5,
      cursorPositionTop: 5,
    })),
  resetCurrentCharIndex: () => set({ currentCharIndex: -1 }),
  unhideElements: () => set((state) => ({ hideElements: !state.hideElements })),

  // users stats utility functions
  increaseWPM: () =>
    set((state) => ({
      wordsPerMinute: state.wordsPerMinute + 1,
    })),
  increaseKPM: () =>
    set((state) => ({
      rawKeysPerMinute: state.rawKeysPerMinute + 1,
    })),
  increaseRawWordsPerMinuteKeys: () =>
    set((state) => ({
      rawWordsPerMinuteKeys: state.rawWordsPerMinuteKeys + 1,
    })),
  updateOverallWPM: () =>
    set((state) => ({
      rawWpm: (state.rawWordsPerMinuteKeys / 5 / state.selectedTime) * 60,
    })),

  //text display focus handler
  setInputFocus: (boolean) =>
    set(
      {
        focusedTextBox: boolean,
      },
      false,
      "setInputFocus"
    ),

  // time utility functions
  updateTimer: () => {
    set((state) => ({
      time: state.time - 1,
    }));
  },
  endGame: () => {
    set((state) => ({
      gameStatus: "finished",
      mode: state.mode,
      hideElements: false,
    }));
  },

  // cursor function
  updateCursorPosition: () => {
    const { currentUserInput } = get();

    const currentWordsLetterList = document
      .querySelector("#words .active-word")
      .querySelectorAll(".char");

    const caretWidth = Math.round(
      document.querySelector("#caret")?.getBoundingClientRect().width ?? 0
    );
    const inputLen = currentUserInput.length;
    const currentLetterIndex = inputLen;

    if (!currentWordsLetterList) return;

    // current letter where the cursor will be
    const currentLetter = currentWordsLetterList[currentLetterIndex];

    const previousLetter =
      currentWordsLetterList[
        Math.min(currentLetterIndex - 1, currentWordsLetterList.length - 1)
      ];

    // need to fix cursor backspace behavior
    const letterPosLeft =
      (currentLetter
        ? currentLetter.offsetLeft
        : previousLetter?.offsetLeft + previousLetter?.offsetWidth) +
      (currentLetter
        ? currentLetter?.offsetWidth
        : previousLetter?.offsetWidth);

    const lettePosTop = currentLetter
      ? currentLetter?.offsetTop
      : previousLetter?.offsetTop;

    const newTop = lettePosTop;
    const newLeft = letterPosLeft - caretWidth / 2;

    set({
      cursorPositionLeft: newLeft,
      cursorPositionTop: newTop,
    });
  },
});

const useStore = createWithEqualityFn(
  persist(devtools(store), {
    name: "game-state-storage",
    partialize: (state) => ({
      // persists game settings through local storage
      // for users even on reload or going to new url
      mode: state.mode,
      time: state.selectedTime,
      selectedTime: state.selectedTime,
      textOptions: state.textOptions,
    }),
  }, shallow)
);

export const useStoreActions = () => useStore((state) => state.actions)

export default useStore;
