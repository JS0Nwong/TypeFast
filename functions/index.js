/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {
    onDocumentCreate,
    onDocumentDelete,
} = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

initializeApp()

exports.createGameLobby = onDocumentCreate(
  "gameLobbies/{lobbyId}",
  async (snapshot, context) => {
    const db = getFirestore();
    const lobbyId = context.params.lobbyId;
    const lobbyData = snapshot.data();

    if (lobbyData) {
      const { players, maxPlayers } = lobbyData;
      if (players.length === maxPlayers) {
        const gameData = {
          players,
          words: [],
          currentWord: "",
          currentRound: 0,
          started: false,
          createdAt: FieldValue.serverTimestamp(),
        };
        const gameRef = db.collection("games").doc(lobbyId);
        await gameRef.set(gameData);
      }
    }
  }
);

exports.deleteGameLobby = onDocumentDelete(
  "gameLobbies/{lobbyId}",
  async (snapshot, context) => {
    const db = getFirestore();
    const lobbyId = context.params.lobbyId;
    const gameRef = db.collection("games").doc(lobbyId);
    await gameRef.delete();
  }
);
