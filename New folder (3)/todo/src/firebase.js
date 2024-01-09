// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-KB6oGlWjKOKqynQHrCzBAlTaIP1NCgM",
  authDomain: "kanban-793f5.firebaseapp.com",
  projectId: "kanban-793f5",
  storageBucket: "kanban-793f5.appspot.com",
  messagingSenderId: "489094546165",
  appId: "1:489094546165:web:c6f2521104ce0f8464fbbc",
  measurementId: "G-WWV1JWF7PW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app)

export { auth, db, functions };
