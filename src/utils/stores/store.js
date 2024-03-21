import { createWithEqualityFn } from "zustand/traditional";

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
