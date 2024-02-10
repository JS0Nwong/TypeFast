import generateWords from "../generateWords";
import { useUserInputStore } from "./userInputStore";
import { useUserStatsStore } from "./userStatsStore";
import { useUserStore } from "./userStore";

export const useGameStore = (set) => ({
  // game information
  gameStatus: "unready", //game statuses: "unready, ready, finished"
  text: generateWords(),
  focusedTextBox: true,
  hideElements: false,
  cursorPositionLeft: 5,
  cursorPositionTop: 5,

  //game options
  textOptions: [],
  mode: "time",
  selectedTime: 60,
  time: 60,

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
    }),

  setTime: (option) =>
    set({
      selectedTime: option,
      time: option,
    }),
  updateTimer: () => {
    set((state) => ({
      time: state.time - 1,
    }));
  },

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
});
