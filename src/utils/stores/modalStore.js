export const useModalStore = (set) => ({
  openFontModal: false,
  openThemeModal: false,
  customSettingsDialog: false,

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
  setCustomSettingsDialog: (boolean) =>
    set({
      customSettingsDialog: boolean,
      userStatus: "searching",
    }),
});
