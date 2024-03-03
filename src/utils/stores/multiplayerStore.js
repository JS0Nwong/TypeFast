import {
  addDoc,
  collection,
  getDoc,
  updateDoc,
  serverTimestamp,
  setDoc,
  onSnapshot,
  arrayUnion,
  getDocs,
  query,
  doc,
} from "firebase/firestore";
import { db } from "../../configs/firebase";
import { useBoundStore } from "../stores/boundStore";

const params = new URL(document.location).searchParams;
const id = params.get("room")?.toString();

export const useMultiplayerStore = (set) => ({
  currentLobbies: [],
  currentLobbyInfo: null,

  // game state
  gameText: [],

  // game options information
  mode: "time",
  includePunctuation: false,
  includeNumbers: false,
  maxPlayers: 2,
  isLobbyPublic: true,  

  // lobby state
  maxPlayers: 2,
  isLobbyPublic: true,

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
  editRoomSettings: async (roomID) => {
    const privateRoom = useBoundStore.getState().isLobbyPublic === "true";
    try {
      const gameDoc = await getDoc(doc(db, "games", roomID));
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
});
