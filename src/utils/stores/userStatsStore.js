export const useUserStatsStore = (set, get) => ({
  rawKeysPerMinute: 0,
  wordsPerMinute: 0,
  wordAccuracy: 0,
  charAccuracy: 0,
  rawWordsPerMinuteKeys: 0,
  rawWpm: 0,
  extraCharsCount: 0,
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
});
