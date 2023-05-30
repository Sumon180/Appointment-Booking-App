// src/firebase/firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZivyPOcA9J8BZkjyLl-uRQfB30PJXywQ",
  authDomain: "bookingapp-4d565.firebaseapp.com",
  projectId: "bookingapp-4d565",
  storageBucket: "bookingapp-4d565.appspot.com",
  messagingSenderId: "756764685557",
  appId: "1:756764685557:web:380e6ea55d732ff2de41bc",
  measurementId: "G-FVKR4F3XDM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
