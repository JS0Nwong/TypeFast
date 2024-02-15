import { createWithEqualityFn } from "zustand/traditional";
import { devtools, persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";

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

// const useBoundStore = createWithEqualityFn(
//   persist(
//     devtools(boundStore),
//     {
//       name: "game-state-storage",
//       partialize: (state) => ({
//         // persists game settings through local storage
//         // for users even on reload or going to new url
//         mode: state.mode,
//         time: state.selectedTime,
//         selectedTime: state.selectedTime,
//         textOptions: state.textOptions,
//       }),
//     },
//     shallow
//   )
// );

// export default useBoundStore;
