// Import the functions you need from the SDKs you need

import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Add Firebase config values
// DO NOT COMMIT THIS
const firebaseConfig = {
  apiKey: "AIzaSyDco1m2MEc8cNjwnX_FZm1A6wI1EXEIbr0",
  authDomain: "ds04-7d54b.firebaseapp.com",
  projectId: "ds04-7d54b",
  storageBucket: "ds04-7d54b.appspot.com",
  messagingSenderId: "300964238925",
  appId: "1:300964238925:web:26a8236471f06ac3012e04",
  measurementId: "G-3FGSP3MDTF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
