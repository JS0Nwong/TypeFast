import { createRef, useRef } from "react";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import generateWords from "./generateWords";
import useCountdown from "../hooks/useCountdown";

export const useUpdateHistory = create((set) => ({
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

const store = (set) => ({
  // user information & data
  isAuthenticated: false,
  userData: {},
  // game state
  gameStatus: "unready",
  typeDisplayFocused: "focused",
  text: generateWords(),
  focusedTextBox: true,
  hideElements: false,
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

  // user information
  setIsAuthenticated: (status) =>
    set(
      {
        isAuthenticated: status,
      },
      false,
      "setIsAuthenticated"
    ),

  // game state
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
          [state.currentWordIndex]: state.currentUserInput.trim(),
        },
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
        selectedTime: option,
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
  previousUserInput: () =>
    set((state) => ({
      currentUserInput: state.currentUserInput.slice(
        0,
        state.currentCharIndex + 1
      ),
    })),
  regenerateText: () =>
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
});

const useStore = create(
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
  })
);
export default useStore;
