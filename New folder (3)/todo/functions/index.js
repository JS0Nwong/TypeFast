const {
  onDocumentCreated,
  onDocumentDeleted,
} = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const crypto = require("crypto");

initializeApp();

const template = {
  Todo: {
    columnColor: "249, 65, 68",
    description: "This item hasn't been started",
    id: crypto.randomUUID(),
    tasks: [],
  },
  InProgress: {
    columnColor: "249, 199, 79",
    description: "This is actively being worked on",
    id: crypto.randomUUID(),
    tasks: [],
  },
  Completed: {
    columnColor: "144, 190, 109",
    description: "This has been completed",
    id: crypto.randomUUID(),
    tasks: [],
  },
};

exports.createBoardData = onDocumentCreated(
  'users/{uid}/boards/{id}',
  async (event) => {
    const { uid, id } = event.params;
    const firestore = getFirestore();

    return await firestore.doc(`users/${uid}/boardsData/${id}`).set({
      columns: template,
      lastUpdated: FieldValue.serverTimestamp(),
      orderBy: Object.keys(template),
      labels: [],
    });
  }
);

exports.deleteBoardData = onDocumentDeleted(
  "users/{uid}/boards/{id}",
  async (event) => {
    const { uid, id } = event.params;
    const firestore = getFirestore();

    return await firestore.doc(`users/${uid}/boardsData/${id}`).delete();
  }
);

exports.createBoardMetadata = onDocumentCreated(
  "users/{uid}/boards/{id}",
  async (event) => {
    const { uid, id } = event.params;
    const firestore = getFirestore();

    console.log(event.params)
    return await firestore.doc(`boardsMetadata/${id}`).set({
      boardOwner: uid,
      sharedToUsers: [{           
        canEdit: true,
        canView: true, 
        email: uid,
      }],
    });
  }
);

exports.deleteBoardMetadata = onDocumentDeleted(
  "users/{uid}/boards/{id}",
  async (event) => {
    const { uid, id } = event.params;
    const firestore = getFirestore();

    return await firestore.doc(`boardsMetadata/${id}`).delete()
  }
);