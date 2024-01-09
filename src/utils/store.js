import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = ((set) => ({
    // game state
    gamestatus: "unready",
    text: '',
    isLoggedIn: false,
    // user input state
    keyPressed: '',
    currentUserInput: '',
    userInputKeyHistory: {},
    currentWordIndex: 0,
    currentCharIndex: -1,
    wordsCorrect: new Set(),
    wordsIncorrect: new Set(),
    userInputWordHistory: {},
    prevInput: '',
    history: {},

    setGameStatus: (status) => set({
        gamestatus: status
    }, false, "setGameStatus"),
    setText: (text) => set({
        text: text,
    }, false, "setText"),

    // setters for user input state
    setKeyPressed: (key) => set({
        keyPressed: key
    }, false, "setKeyPressed"),
    setCurrentUserInput: (input) => set({
        currentUserInput: input
    }, false, "setCurrentUserInput"),
    setUserInputKeyHistory: () => set({
        // TODO: need to add setter values
    }, false, "setUserInputHistory"),
    setCurrentWordIndex: (index) => set({
        currentWordIndex: index
    }, false, "setCurrentWordIndex"),
    setCurrentCharIndex: (index) => set({
        currentCharIndex: index
    }, false, "setCurrentCharIndex"),
    setWordsCorrect: (word) => set({
        wordsCorrect: word
    }, false,  "setWordsCorrect"),
    setWordsIncorrect: (word) => set({
        wordsIncorrect: word
    }, false, "setWordsIncorrect"),
    setUserInputWordHistory: (word) => set({
        userInputWordHistory: word
    }, false, "setUserInputWordHistory"),
    setPrevInput: (input) => set({
        prevInput: input
    }, false, 'setPrevInput'),
    setHistory: (char) => set({
        history: char
    }),

    increaseCharIndex: () => set((state) => ({
        currentCharIndex: state.currentCharIndex + 1 
    })),
    decreaseCharIndex: () => set((state) => ({
        currentCharIndex: state.currentCharIndex - 1
    })),
    increaseWordIndex: () => set((state) => ({
        currentWordIndex: state.currentWordIndex + 1
    })),
    decreaseWordIndex: () => set((state) => ({
        currentWordIndex: state.currentWordIndex - 1
    })),
    resetUserInput: () => set({currentUserInput: ''})

}))

const useStore = create(devtools(store))
export default useStore
