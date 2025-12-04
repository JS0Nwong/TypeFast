/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {logger} = require("firebase-functions");
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
const { onSchedule } = require('firebase-functions/v2/scheduler');

initializeApp()
const PromisePool = require('es6-promise-pool').default;

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

exports.getLeaderboard = onSchedule('every 12 hours', async(e) => {
  const db = getFirestore();
  const leaderboardRef = db.collection('leaderboard');
  const playersRef = db.collection('users');

  const leaderboard = await leaderboardRef.get();
  const players = await playersRef.get();

  const playerData = players.docs.map(doc => doc.data()); 
  const sortedPlayers = playerData.sort((a, b) => b.userStats - a.userStats);

  // get first 100 top players
  const leaderboardData = sortedPlayers.slice(0, 100);

  await leaderboardRef.set(leaderboardData);

  logger.log('updated leaderboarad')
})