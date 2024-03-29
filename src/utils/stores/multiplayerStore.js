import {
  collection,
  getDoc,
  updateDoc,
  onSnapshot,
  getDocs,
  query,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { auth, db } from "../../configs/firebase";
import { useBoundStore } from "../stores/boundStore";

const params = new URL(document.location).searchParams;
const id = params.get("room")?.toString();

export const useMultiplayerStore = (set) => ({
  currentLobbies: [],
  currentLobbyInfo: null,
  lobbyId: "EZt6IkyTqZm7aNuvUkR5",

  // game state
  gameText: [],
  startGameCountdown: 0,
  allowUserInput: false,

  // game options information
  mode: "time",
  includePunctuation: false,
  includeNumbers: false,
  maxPlayers: 2,
  isLobbyPublic: true,
  isGameEnded: false,

  // lobby state
  maxPlayers: 2,
  isLobbyPublic: true,

  // results data
  gameResults: [],

  setLobbies: (lobbies) =>
    set({
      currentLobbies: lobbies,
    }),
  createGame: (game) =>
    set((state) => ({
      currentLobbies: [game, ...state.currentLobbies],
    })),
  setLobbyInfo: (info) =>
    set({
      currentLobbyInfo: info,
    }),
  setIsGameEnded: (boolean) =>
    set({
      isGameEnded: boolean,
    }),
  setStartGameCountdown: (seconds) =>
    set({
      startGameCountdown: seconds,
    }),
  setAllowUserInput: (bool) =>
    set({
      allowUserInput: bool,
    }),

  // lobby state setters
  setLobbyMaxPlayers: (max) => set({ maxPlayers: max }),
  setLobbyPublic: (boolean) => set({ isLobbyPublic: boolean }),

  subscribeToCurrentRoom: async (id) => {
    const unsub = onSnapshot(doc(db, "games", id), (doc) => {
      set({
        currentLobbyInfo: doc.data(),
        mode: doc.data().gameMode,
        includePunctuation: doc.data().includePunctuation,
        includeNumbers: doc.data().includeNumbers,
        maxPlayers: doc.data().maxPlayers,
        isLobbyPublic: doc.data().roomPrivacy,
        lobbyId: id,
      });
    });
    return () => unsub();
  },
  fetchGame: async (id) => {
    const gameDoc = await getDoc(doc(db, "games", id));
    if (gameDoc.exists()) {
      set({
        gameText: gameDoc.data().text,
      });
    }
  },
  fetchCurrentLobbies: async () => {
    const q = query(collection(db, "games"));
    const querySnapshot = await getDocs(q);
    const lobbies = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    set({
      currentLobbies: lobbies,
    });
  },
  editRoomSettings: async (id) => {
    const privateRoom = useBoundStore.getState().isLobbyPublic === "true";
    try {
      const gameDoc = await getDoc(doc(db, "games", id));
      if (gameDoc.exists()) {
        await updateDoc(doc(db, "games", id), {
          gameMode: useBoundStore.getState().mode,
          includePunctuation: useBoundStore.getState().includePunctuation,
          includeNumbers: useBoundStore.getState().includeNumbers,
          maxPlayers: Number(useBoundStore.getState().maxPlayers),
          roomPrivacy: privateRoom,
        });
      } else {
        console.error("Game room does not exist, cannot edit settings");
      }
    } catch (error) {
      console.error("Error editing game room settings:", error);
    }
  },
  addUserToResult: async (id) => {
    try {
      const docRef = doc(db, "games", id);
      const gameDoc = await getDoc(docRef);
      if (gameDoc.exists()) {
        const results = gameDoc.data().results;
        await updateDoc(docRef, {
          results: arrayUnion({
            id: auth.currentUser.uid,
            name: auth.currentUser.displayName,
            wpm: 0,
            accuracy: 0,
          }),
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  setGameResults: async (data) =>
    set({
      gameResults: data,
    }),
});
