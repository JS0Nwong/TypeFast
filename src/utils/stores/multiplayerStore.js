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
import { auth, db } from "../../configs/firebase";

const params = new URL(document.location).searchParams;
const id = params.get("room")?.toString();

export const useMultiplayerStore = (set) => ({
  currentLobbies: [],
  currentLobbyInfo: null,

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
  fetchLobbyInfo: async () => {
    const unsub = onSnapshot(doc(db, "games", id), (doc) => {
      return set({
        currentLobbyInfo: doc.data(),
      });
    });
  },
});
