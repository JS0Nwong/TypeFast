// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMaZMXIcRzxAvWEJAGh71tOSBg2hPg3T4",
  authDomain: "fasttype-e735d.firebaseapp.com",
  projectId: "fasttype-e735d",
  storageBucket: "fasttype-e735d.appspot.com",
  messagingSenderId: "190286210454",
  appId: "1:190286210454:web:9d923a8706d53474ff29b7",
  measurementId: "G-29ZW2ZF37G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app)

export { auth, db, functions };
