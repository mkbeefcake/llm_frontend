// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCviVIlemNUjLCUn0589grfz_pY4CjyAD8",
  authDomain: "chat-automation-387710.firebaseapp.com",
  projectId: "chat-automation-387710",
  storageBucket: "chat-automation-387710.appspot.com",
  messagingSenderId: "1094964097817",
  appId: "1:1094964097817:web:de38bafbbb0d0a94000b88",
  measurementId: "G-HPBL866BET"
};

// Initialize Firebase

export const initializeFirebaseApp = () => {
  var firebaseapp = initializeApp(firebaseConfig);
}