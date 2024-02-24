import { create } from "zustand";
import { persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";

import { useUserInputStore } from "./userInputStore";
import { useUserStatsStore } from "./userStatsStore";
import { useGameStore } from "./gameStore";
import { useUserStore } from "./userStore";
import { useCursorStore } from "./cursorStore";
import { useWordHistoryStore } from "./wordHistoryStore";
import { useModalStore } from "./modalStore";
import { useMultiplayerStore } from "./multiplayerStore";

export const useBoundStore = create(
  persist(
    (...args) => ({
      ...useUserInputStore(...args),
      ...useUserStatsStore(...args),
      ...useGameStore(...args),
      ...useUserStore(...args),
      ...useCursorStore(...args),
      ...useWordHistoryStore(...args),
      ...useModalStore(...args),
      ...useMultiplayerStore(...args),
    }),
    {
      name: "bound-store",
      partialize: (state) => ({
        // persists game settings through local storage
        // for users even on reload or going to new url
        mode: state.mode,
        customTest: state.customTest,
        time: state.selectedTime,
        wordsAmount: state.selectedWordsAmount,
        selectedTime: state.selectedTime,
        textOptions: state.textOptions,
      }),
    }
  ),
  shallow
);
