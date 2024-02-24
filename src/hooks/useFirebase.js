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
import { auth, db } from "../configs/firebase";
import { useBoundStore } from "../utils/stores/boundStore";
import { useNavigate } from "react-router-dom";

const useFirebase = () => {
  const { createGame, setLobbyInfo } = useBoundStore();

  const gamesCollection = collection(db, "games");
  const navigate = useNavigate();

  const createGameLobby = async ({
    mode,
    includePuncuation,
    includeNumbers,
    maxPlayers,
    roomPrivacy,
  }) => {
    try {
      const lobbyDoc = await addDoc(gamesCollection, {
        players: [
          {
            name: auth.currentUser.displayName,
            id: auth.currentUser.uid,
          },
        ],
        maxPlayers: maxPlayers,
        createdAt: serverTimestamp(),
        gameMode: mode,
        includePuncuation,
        includeNumbers,
        roomPrivacy,
        roomOwner: auth.currentUser?.uid ? auth.currentUser.uid : null,
      });
      createGame({
        players: [
          {
            name: auth.currentUser.displayName,
            id: auth.currentUser.uid,
          },
        ],
        maxPlayers: maxPlayers,
        createdAt: serverTimestamp(),
        gameMode: mode,
        includePuncuation,
        includeNumbers,
        roomOwner: auth.currentUser?.uid ? auth.currentUser.uid : null,
        roomID: lobbyDoc.id,
      });
      return lobbyDoc.id;
    } catch (error) {
      console.error("Error creating game lobby:", error);
    }
  };

  const joinGameRoom = async (id) => {
    try {
      const gameDoc = await getDoc(doc(db, "games", id));
      if (gameDoc.exists()) {
        // check if game is full
        if (gameDoc.data().maxPlayers > gameDoc.data().players.length) {
          await updateDoc(doc(db, "games", id), {
            players: arrayUnion({
              name: auth.currentUser.displayName,
              id: auth.currentUser.uid,
            }),
          });
        }
        // if game is full
        else {
          console.error("Game room is full");
        }
      } else {
        console.error("Game room does not exist");
      }
    } catch (error) {
      console.error("Error joining game room:", error);
    }
  };
  const leaveGameRoom = async (id) => {
    try {
      const gameDoc = await getDoc(doc(db, "games", id));
      if (gameDoc.exists()) {
        await updateDoc(doc(db, "games", id), {
          players: gameDoc
            .data()
            .players.filter((player) => player.id !== auth.currentUser.uid),
        });
        navigate("/games");
      } else {
        console.error("Game room does not exist");
      }
    } catch (error) {
      console.error("Error leaving game room:", error);
    }
  };

  
  const editRoomSettings = async (
    id,
    gameMode,
    includeNumbers,
    includePuncuation,
    maxPlayers,
    roomPrivacy,
  ) => {
    try {
      const gameDoc = await getDoc(doc(db, "games", id));
      if (gameDoc.exists()) {
        await updateDoc(doc(db, "games", id), {
          gameMode: gameMode,
          includePuncuation: includePuncuation,
          includeNumbers: includeNumbers,
          maxPlayers: maxPlayers,
          roomPrivacy: roomPrivacy,
        });
      } else {
        console.error("Game room does not exist");
      }
    } catch (error) {
      console.error("Error editing game room settings:", error);
    }
  };
  

  const getLobbyInfo = async (lobbyId) => {
    const unsub = onSnapshot(doc(db, "games", lobbyId), (doc) => {
      setLobbyInfo(doc.data());
    });
  };

  return {
    createGameLobby,
    getLobbyInfo,
    joinGameRoom,
    leaveGameRoom,
    editRoomSettings,
  };
};

export default useFirebase;
