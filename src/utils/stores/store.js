import { createWithEqualityFn } from "zustand/traditional";
import { devtools, persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import generateWords from "../generateWords";

// import { userInputStore } from "./userInputStore";
// import { userStatsStore } from "./userStatsStore";

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

// TODO: code split the store so it is not one big massive store
// split into stores for game state, user input state, user information state,
// and user statistic states.

const boundStore = (set, get) => ({

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
  setSnackbar: (text) =>
    set({
      snackbarMessage: text,
    }),

  unhideElements: () => set((state) => ({ hideElements: !state.hideElements })),

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
});

const useBoundStore = createWithEqualityFn(
  persist(devtools(boundStore), {
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

export default useBoundStore;
