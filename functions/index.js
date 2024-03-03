/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {
  log
} = require('firebase-functions/logger')

const {
    onDocumentCreate,
    onDocumentDelete,
    onDocumentUpdated,
} = require("firebase-functions/v2/firestore");
const { onRequest, onCall } = require("firebase-functions/v2/https");

const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { ServerValue } = require("firebase-admin/database");

initializeApp()


// exports.createGameLobby = onDocumentCreate(
//   "games/{lobbyId}",
//   async (snapshot, context) => {
//     const db = getFirestore();
//     const lobbyId = context.params.lobbyId;
//     const lobbyData = snapshot.data();

//     if (lobbyData) {
//       const { players, maxPlayers } = lobbyData;
//       if (players.length === maxPlayers) {
//         const gameData = {
//           players,
//           words: [],
//           currentWord: "",
//           currentRound: 0,
//           started: false,
//           createdAt: FieldValue.serverTimestamp(),
//         };
//         const gameRef = db.collection("games").doc(lobbyId);
//         await gameRef.set(gameData);
//       }
//     }
//   }
// );

// exports.deleteGameLobby = onDocumentDelete(
//   "games/{lobbyId}",
//   async (snapshot, context) => {
//     const db = getFirestore();
//     const lobbyId = context.params.lobbyId;
//     const gameRef = db.collection("games").doc(lobbyId);
//     await gameRef.delete();
//   }
// );

exports.startGame = onCall(async (data, context) => {
  log(data, context)

  const db = getFirestore();
  // const { gameId } = res.data.data();
  // const { gameData } = res.data();
  // if (gameData) {
  //   const gameRef = db.collection("games").doc(gameId);
  //   await gameRef.update({
  //     countdown: ServerValue.TIMESTAMP,
  //     seconds: 5,
  //   });
  // }
});
