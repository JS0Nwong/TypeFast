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
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../configs/firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

import { useBoundStore } from "../utils/stores/boundStore";
import { useNavigate } from "react-router-dom";
import generateWords from "../utils/generateWords";

const useFirebase = () => {
  const functions = getFunctions();
  const startGameFunction = httpsCallable(functions, "startGame");

  const {
    createGame,
    mode,
    includePunctuation,
    includeNumbers,
    time,
    wordsAmount,
    setLobbyInfo,
    setSnackbar,
    setStartGameCountdown,
    setAllowUserInput,
    unhideElements,
    setGameStatus,
    setIsGameEnded,
    setGameResults,
    lobbyId,
  } = useBoundStore((state) => ({
    createGame: state.createGame,
    mode: state.mode,
    includePunctuation: state.includePunctuation,
    includeNumbers: state.includeNumber,
    time: state.time,
    wordsAmount: state.wordsAmount,
    setLobbyInfo: state.setLobbyInfo,
    setSnackbar: state.setSnackbar,
    setStartGameCountdown: state.setStartGameCountdown,
    setAllowUserInput: state.setAllowUserInput,
    unhideElements: state.unhideElements,
    setGameStatus: state.setGameStatus,
    setIsGameEnded: state.setIsGameEnded,
    setGameResults: state.setGameResults,
    lobbyId: state.lobbyId
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
          displayName: auth.currentUser.displayName
            ? auth.currentUser.displayName
            : null,
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
        // check if game has already started
        if(gameDoc.data().gameStatus !== 'waiting') return setSnackbar("Error joining game: Game has already started")
        // check if game is full
        if (gameDoc.data().maxPlayers > gameDoc.data().players.length) {
          await updateDoc(doc(db, "games", id), {
            players: arrayUnion({
              name: auth.currentUser.displayName,
              id: auth.currentUser.uid,
              playerStatus: 'loading',
            }),
          });
          navigate("/lobby?room=" + id);
        }
        // if game is full
        else {
          setSnackbar("Error joining game: Room is full");
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
    const privateRoom = roomPrivacy === "true";
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
          results: [],
          text: mode === "words" ? generateWords(wordsAmount) : generateWords(),
          countdown: {
            startTime: serverTimestamp(),
            seconds: 5,
          },
        });
        startGameFunction({ id: id })
        navigate("/mpgame?room=" + id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const startCountdown = async (id) => {
    try {
      const gameDoc = onSnapshot(doc(db, "games", id), (doc) => {
        if (doc.exists()) {
          if(Object.values(doc.data().players).every(player => player.playerStatus === 'ready')) {
            const startAt = doc.data().countdown.startTime || {seconds: 0, nanoseconds: 0};
            const seconds = doc.data().countdown.seconds;
    
            const timeStamp = new Timestamp(startAt.seconds, startAt.nanoseconds);
            const date = timeStamp.toDate();
  
            const startTime = new Date(new Date(date).setSeconds(date.getSeconds()));
  
            const interval = setInterval(() => {
              const timeLeft = seconds * 1000 - (Date.now() - startTime);
              if (timeLeft < 0) {
                clearInterval(interval);
                setAllowUserInput(true);
                setGameStatus('ready')
                unhideElements()
              } else {
                const secondsRemaining = Math.floor(
                  (timeLeft % (1000 * 60)) / 1000
                );
                setStartGameCountdown(secondsRemaining);
              }
            }, 500);
          }
          else {
            setStartGameCountdown('waiting for players...')
          }
        }
      });
      return () => gameDoc();
    } catch (error) {
      console.log(error);
    }
  };

  const setPlayerStatus = async(id) => {
    try {
      const docRef = doc(db, "games", id)
      const gameDoc = await getDoc(docRef);
      if (gameDoc.exists()) {
        await updateDoc(docRef, {
          players: gameDoc.data().players.map(player => {
            if(player.id === auth.currentUser.uid) {
              return {
                ...player,
                playerStatus: 'ready'
              }
            } else {
              return player
            }
          })
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
 
  const endMultiplayerGame = async () => {
    try {
      const docRef = doc(db, "games", lobbyId);
      const gameDoc = onSnapshot(docRef, (doc) => {
        if(doc.exists()) {
          if(doc.data().players.length === doc.data().results.length 
          || doc.data().players.length <= doc.data().results.length) {   
            const results = doc.data().results;
            setGameResults(results)
            setIsGameEnded(true)
          }
        }
      })
      return () => gameDoc()
    } catch (error) {
      console.log(error)
    }
  };

  return {
    createGameLobby,
    getLobbyInfo,
    joinGameRoom,
    leaveGameRoom,
    editRoomSettings,
    startGame,
    startCountdown,
    endMultiplayerGame,
    setPlayerStatus
  };
};

export default useFirebase;
