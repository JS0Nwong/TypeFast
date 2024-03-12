/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { log } = require('firebase-functions/logger')
const {
    onDocumentCreate,
    onDocumentDelete,
    onDocumentUpdated,
} = require("firebase-functions/v2/firestore");
const { onRequest, onCall } = require("firebase-functions/v2/https");

const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { ServerValue } = require("firebase-admin/database");
const { onValueCreated } = require('firebase-functions/v2/database');

initializeApp()

exports.startGame = onCall(async (request) => {
  try {
    log(request.data.id);

    const db = getFirestore();
    const gameId = request.data.id;
    if (gameId) {
      const gameRef = db.collection("games").doc(gameId);
      await gameRef.update({
        countdown: {
          startTime: FieldValue.serverTimestamp(),
          seconds: 5,
        },
        gameStatus: "starting",
      });
    }
  } catch (error) {
    console.log(error);
    log(error);
  }
});