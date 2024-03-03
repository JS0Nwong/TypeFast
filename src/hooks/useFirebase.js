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

import { httpsCallable } from "firebase/functions";

import generateWords from "../utils/generateWords";

const useFirebase = () => {
  const {
    createGame,
    setLobbyInfo,
    setSnackbar,
    mode,
    includePunctuation,
    includeNumbers,
    time,
    wordsAmount,
  } = useBoundStore((state) => ({
    createGame: state.createGame,
    setLobbyInfo: state.setLobbyInfo,
    setSnackbar: state.setSnackbar,
    mode: state.mode,
    includePunctuation: state.includePunctuation,
    includeNumbers: state.includeNumber,
    time: state.time,
    wordsAmount: state.wordsAmount,
  }));

  const gamesCollection = collection(db, "games");
  const navigate = useNavigate();

  const createGameLobby = async ({
    mode,
    includePunctuation,
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
        includePunctuation,
        includeNumbers,
        roomPrivacy,
        roomOwner: auth.currentUser?.uid ? auth.currentUser.uid : null,
        gameStatus: "waiting-for-players",

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
        includePunctuation,
        includeNumbers,
        roomOwner: {
          id: auth.currentUser?.uid ? auth.currentUser.uid : null,
          displayName: auth.currentUser.displayName ? auth.currentUser.displayName : null
        },
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
          navigate("/lobby?room=" + id);
        }
        // if game is full
        else {
          setSnackbar('Error joining game: Room is full')
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

  const editRoomSettings = async (id) => {
    const privateRoom = roomPrivacy === 'true'
    try {
      const gameDoc = await getDoc(doc(db, "games", id));
      if (gameDoc.exists()) {
        await updateDoc(doc(db, "games", id), {
          gameMode: mode,
          includePunctuation: includePunctuation,
          includeNumbers: includeNumbers,
          maxPlayers: Number(maxPlayers),
          roomPrivacy: privateRoom,       
          
          wordsAmount: wordsAmount,
          time: time,
        });
      } else {
        console.error("Game room does not exist, cannot edit settings");
      }
    } catch (error) {
      console.error("Error editing game room settings:", error);
    }
  };

  const getLobbyInfo = (lobbyId) => {
    const unsub = onSnapshot(doc(db, "games", lobbyId), (doc) => {
      setLobbyInfo(doc.data());
    });

    return () => unsub();
  };

  const startGame = async (id) => {
    try {
      const gameDoc = await getDoc(doc(db, "games", id));
      if (gameDoc.exists()) {
        await updateDoc(doc(db, "games", id), {
          gameStatus: "starting",
          results: [],
          text: mode === "words" ? generateWords(wordsAmount) : generateWords(),
        })
        httpsCallable('startGame')({id})
        navigate("/mpgame?room=" + id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const endGame = async () => {};

  return {
    createGameLobby,
    getLobbyInfo,
    joinGameRoom,
    leaveGameRoom,
    editRoomSettings,
    startGame,
    endGame,
  };
};

export default useFirebase;
