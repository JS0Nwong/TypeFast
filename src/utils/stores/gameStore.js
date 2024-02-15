import { generate } from "random-words";
import generateWords from "../generateWords";

export const useGameStore = (set) => ({
  // game information
  gameStatus: "unready", //game statuses: "unready, ready, finished"
  text: generateWords(),
  focusedTextBox: true,
  hideElements: false,
  cursorPositionLeft: 5,
  cursorPositionTop: 5,
  blurElements: false,

  //game options
  mode: "time",
  textOptions: [],
  customTest: false,

  selectedTime: 60,
  time: 60,
  customTime: 1,

  selectedWordsAmount: 50,
  wordsAmount: 50,
  customWordsAmount: 1,
  wordsTimer: 0,

  // snackbar state
  snackbarMessage: "",

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
  endGame: () => {
    set((state) => ({
      gameStatus: "finished",
      mode: state.mode,
      hideElements: false,
    }));
  },
  setInputFocus: (boolean) =>
    set(
      {
        focusedTextBox: boolean,
      },
      false,
      "setInputFocus"
    ),
  setMode: (mode) =>
    set({
      mode: mode,
      customTest: false,
    }),

  //test mode options
  setTime: (option) =>
    set({
      selectedTime: option,
      time: option,
      customTest: false,
    }),
  updateTimer: () => {
    set((state) => ({
      time: state.time - 1,
    }));
  },
  setCustomTime: (time) =>
    set({
      selectedTime: time,
      time: time,
      customTime: time,
      customTest: true,
    }),

  setWordsAmount: (amount) =>
    set({
      selectedWordsAmount: amount,
      wordsAmount: amount,
      customTest: false,
    }),
  setCustomWordsAmount: (amount) =>
    set({
      selectedWordsAmount: amount,
      wordsAmount: amount,
      customWordsAmout: amount,
      customTest: true,
    }),
  updateWordsTimer: () => set((state) => ({
    wordsTimer: state.wordsTimer + 1
  })),

  //snackbar state setter
  setSnackbar: (text) =>
    set({
      snackbarMessage: text,
    }),

  unhideElements: () => set((state) => ({ hideElements: !state.hideElements })),
  setBlurElements: () =>
    set((state) => ({ blurElements: !state.blurElements })),

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
      mode: state.mode,
      customTest: state.customTest,
      text: generateWords(),
      selectedWordsAmount: state.selectedWordsAmount,
      customWordsAmount: state.customWordsAmount,
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
      hideElements: false,
      gameStatus: "unready",
      mode: state.mode,
      customTest: state.customTest,
      time: state.selectedTime,
      text: generateWords(),
      selectedWordsAmount: state.selectedWordsAmount,
      customWordsAmount: state.customWordsAmount,
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
      mode: state.mode,
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
      customTest: state.customTest,
      selectedWordsAmount: state.selectedWordsAmount,
      customWordsAmount: state.customWordsAmount,
      mode: state.mode,
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
});
