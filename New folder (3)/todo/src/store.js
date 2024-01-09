import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  loader: true,
  boards: [],
  isLoggedIn: false,
  areBoardsFetched: false,
  data: null,
  filtered: null,
  publiclyEditable: false,
  publiclyViewable: false,
  currentBoard: null,
  addBoard: (board) =>
    set(
      (old) => ({
        boards: [board, ...old.boards],
      }),
      false,
      "addBoards"
    ),
  setPubliclyViewable: (boolean) =>
    set({ publiclyViewable: boolean }, false, "setPubliclyViewable"),
  setPubliclyEditable: (boolean) =>
    set({ publiclyEditable: boolean }, false, "setPubliclyEditable"),
  setCurrentBoard: (boardId) =>
    set(
      {
        currentBoard: boardId,
      },
      false,
      "setCurrentBoard"
    ),
  setBoards: (boards) =>
    set(
      {
        boards,
        areBoardsFetched: true,
      },
      false,
      "setBoards"
    ),
  setAuth: (status) =>
    set(
      {
        isLoggedIn: status,
        boards: [],
        areBoardsFetched: false,
      },
      false,
      "setAuth"
    ),
  setData: (data) =>
    set(
      {
        data: data,
      },
      false,
      "setData"
    ),
  setFiltered: (data) =>
    set({
      filtered: data,
    }),
});

const useStore = create(devtools(store));
export default useStore;
