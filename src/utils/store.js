import { createRef, useRef } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import generateWords from "./generateWords";

let startTime = Date.now(),
  diff,
  minutes,
  seconds;

const timer = setInterval((time) => {
  diff = time - (((Date.now() - startTime) / 1000) | 0);
  minutes = (diff / 60) | 0;
  seconds = diff % 60 | 0;

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  if (diff <= 0) {
    startTime = Date.now() + 1000;
  }
}, 1000);

export const useUpdateHistory = create(() => ({
  wordsCorrect: new Set(),
  wordsIncorrect: new Set(),
}));

export const updateWordsCorrect = (currentWordIndex) => {
  return useUpdateHistory.setState((prev) => ({
    wordsCorrect: new Set(prev.wordsCorrect).add(currentWordIndex),
  }));
};

export const updateWordsIncorrect = (currentWordIndex) => {
  return useUpdateHistory.setState((prev) => ({
    wordsIncorrect: new Set(prev.wordsIncorrect).add(currentWordIndex),
  }));
};

const store = (set) => ({
  // user details
  isLoggedIn: false,
  // game state
  gameStatus: "unready",
  typeDisplayFocused: "focused",
  text: generateWords(),
  focusedTextBox: true,
  hideElements: false,
  // game setting options
  textOptions: [],
  mode: "time",
  time: 60,
  // user input state
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
  // user stats
  rawKeysPerMinute: 0,
  wordsPerMinute: 0,
  wordAccuracy: 0,
  charAccuracy: 0,

  setGameStatus: (status) =>
    set(
      {
        gameStatus: status,
      },
      false,
      "setGameStatus"
    ),
  setText: (text) =>
    set(
      {
        text: text,
      },
      false,
      "setText"
    ),
  startGame: (status) =>
    set(
      {
        gameStatus: status,
        hideElements: true,
      },
      false,
      "startGame"
    ),

  // setters for user input state
  setKeyPressed: (key) =>
    set(
      {
        keyPressed: key,
      },
      false,
      "setKeyPressed"
    ),
  setCurrentUserInput: (input) =>
    set(
      (state) => ({
        currentUserInput: state.currentUserInput + input,
      }),
      false,
      "setCurrentUserInput"
    ),
  setUserInputKeyHistory: () =>
    set(
      {
        // TODO: need to add setter values
      },
      false,
      "setUserInputHistory"
    ),
  setCurrentWordIndex: (index) =>
    set(
      {
        currentWordIndex: index,
      },
      false,
      "setCurrentWordIndex"
    ),
  setCurrentCharIndex: (index) =>
    set(
      {
        currentCharIndex: index,
      },
      false,
      "setCurrentCharIndex"
    ),
  setWordsCorrect: (word) =>
    set(
      {
        wordsCorrect: word,
      },
      false,
      "setWordsCorrect"
    ),
  setWordsIncorrect: (word) =>
    set(
      {
        wordsIncorrect: word,
      },
      false,
      "setWordsIncorrect"
    ),
  setUserInputWordHistory: () =>
    set(
      (state) => ({
        userInputWordHistory: {
          ...state.userInputWordHistory,
          [state.currentWordIndex]: state.currentUserInput.trim()
        }
      }),
      false,
      "setUserInputWordHistory"
    ),
  setPrevInput: (input) =>
    set(
      {
        prevInput: input,
      },
      false,
      "setPrevInput"
    ),
  setHistory: (char) =>
    set({
      history: char,
    }),
  // setTimer: () => set({
  //   time:
  // }),

  //set game options
  setMode: (mode) =>
    set(
      {
        mode: mode,
      },
      false,
      "setMode"
    ),

  setTime: (option) =>
    set(
      {
        time: option,
      },
      false,
      "setTime"
    ),

  // input utility setters
  increaseCharIndex: () =>
    set((state) => ({
      currentCharIndex: state.currentCharIndex + 1,
    })),
  decreaseCharIndex: () =>
    set((state) => ({
      currentCharIndex: state.currentCharIndex - 1,
    })),
  increaseWordIndex: () =>
    set((state) => ({
      currentWordIndex: state.currentWordIndex + 1,
    })),
  decreaseWordIndex: () =>
    set((state) => ({
      currentWordIndex: state.currentWordIndex - 1,
    })),
  resetUserInput: () => set({ currentUserInput: "" }),
  resetKeyPressed: () => set({ keyPressed: "" }),
  regenerateText: () =>
    set({
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
    }),
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

  //text display focus handler
  setInputFocus: (boolean) =>
    set(
      {
        focusedTextBox: boolean,
      },
      false,
      "setInputFocus"
    ),
});

const useStore = create(devtools(store));
export default useStore;
