// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt5HJ6WBmHaDIqXPuyajUYq0thBiDIhbk",
  authDomain: "neo-chatbot-f0fff.firebaseapp.com",
  projectId: "neo-chatbot-f0fff",
  storageBucket: "neo-chatbot-f0fff.appspot.com",
  messagingSenderId: "279762046044",
  appId: "1:279762046044:web:b2ed54407bb91255eeaa99",
  measurementId: "G-E7G03ND0CH"
};

// Initialize Firebase

export const initializeFirebaseApp = () => {
  var firebaseapp = initializeApp(firebaseConfig);
}