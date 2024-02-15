export const useCursorStore = (set, get) => ({
  cursorPositionLeft: 5,
  cursorPositionTop: 5,
  setCursorLeftPosition: (pos) => {
    set({
      cursorPositionLeft: pos,
    });
  },
  setCursorTopPosition: (pos) => {
    set({
      cursorPositionTop: pos,
    });
  },
});
