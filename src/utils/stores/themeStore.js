import { devtools, persist, subscribeWithSelector  } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { themes } from "../../static/themes/themes.json";
import { create } from "zustand";

const themeStore = (set, get) => ({
  toggleCustom: false,
  customTheme: themes["custom"],
  backgroundPrimary: themes['custom'].backgroundPrimary.toUpperCase(),
  backgroundSecondary: themes["custom"].backgroundSecondary.toUpperCase(),
  textCaret: themes["custom"].textCaret.toUpperCase(),
  textPrimary: themes["custom"].textPrimary.toUpperCase(),
  textSecondary: themes["custom"].textSecondary.toUpperCase(),
  errorColor: themes["custom"].errorColor.toUpperCase(),
  select: themes["custom"].select.toUpperCase(),
  themeType: null,

  actions: {
    setToggleCustom: (boolean) =>
      set({
        toggleCustom: boolean,
      }),
    setBackgroundColor: (color) =>
      set({
        backgroundPrimary: color,
      }),
    setBackgroundAltColor: (color) =>
      set({
        backgroundSecondary: color,
      }),
    setCaretColor: (color) =>
      set({
        textCaret: color,
      }),
    setTextColor: (color) =>
      set({
        textPrimary: color,
      }),
    setTextAltColor: (color) =>
      set({
        textSecondary: color,
      }),
    setErrorColor: (color) =>
      set({
        errorColor: color,
      }),
    setSelectColor: (color) =>
      set({
        select: color,
      }),
    getColors: () => {
      const {
        backgroundPrimary, 
        backgroundSecondary, 
        textCaret, 
        textPrimary, 
        textSecondary, 
        errorColor, 
        select,
      } = get()

      return {
        backgroundPrimary, 
        backgroundSecondary, 
        textCaret, 
        textPrimary, 
        textSecondary, 
        errorColor, 
        select,
      }
    }
  },
});

const useThemeStore = create(
  persist(
    devtools(themeStore),
    {
      name: "theme-store",
      partialize: (state) => ({
        // persists theme values if a user has a custom theme through local storage
        // for users even on reload or going to new url
        toggleCustom: state.toggleCustom,
        backgroundColor: state.backgroundColor,
        backgroundAltColor: state.backgroundAltColor,
        caretColor: state.caretColor,
        textColor: state.textColor,
        textAltColor: state.textAltColor,
        errorColor: state.errorColor,
        selectColor: state.selectColor,
      }),
    },
    shallow
  )
);
export const useThemeStoreActions = () => useThemeStore((state) => state.actions)


export default useThemeStore;
