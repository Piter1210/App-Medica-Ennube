// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIQwaqfi90tCnhlmFRiNJLWAv__q-OFxo",
  authDomain: "miappsegura-6e043.firebaseapp.com",
  projectId: "miappsegura-6e043",
  storageBucket: "miappsegura-6e043.firebasestorage.app",
  messagingSenderId: "927132822633",
  appId: "1:927132822633:web:c4a1b5383bd7ba00c086f8",
  measurementId: "G-ESNKQ5E08E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);