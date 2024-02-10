import { create } from "zustand";
import { persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";

import { useUserInputStore } from "./userInputStore";
import { useUserStatsStore } from "./userStatsStore";
import { useGameStore } from "./gameStore";
import { useUserStore } from "./userStore";
import { useCursorStore } from "./cursorStore";

export const useBoundStore = create(
  persist(
    (...args) => ({
      ...useUserInputStore(...args),
      ...useUserStatsStore(...args),
      ...useGameStore(...args),
      ...useUserStore(...args),
      ...useCursorStore(...args),
    }),
    {
      name: "bound-store",
      partialize: (state) => ({
        // persists game settings through local storage
        // for users even on reload or going to new url
        mode: state.mode,
        time: state.selectedTime,
        selectedTime: state.selectedTime,
        textOptions: state.textOptions,
      }),
    }
  ), shallow
);
