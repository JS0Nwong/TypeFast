export const useWordHistoryStore = (set) => ({
  wordsCorrect: new Set(),
  wordsIncorrect: new Set(),
  resetHistory: () => {
    set({ wordsCorrect: new Set(), wordsIncorrect: new Set() });
  },
});

export function updateWordsCorrect(wordIndex) {
  useWordHistoryStore.setState((prev) => ({
    wordsCorrect: new Set(prev.wordsCorrect).add(wordIndex),
  }));
}

export function updateWordsIncorrect(wordIndex) {
  useWordHistoryStore.setState((prev) => ({
    wordsIncorrect: new Set(prev.wordsIncorrect).add(wordIndex),
  }));
}
