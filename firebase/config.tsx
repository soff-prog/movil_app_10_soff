// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOwTPVg_MfnoOP7beXUtkfWhR2A6ex8Uo",
  authDomain: "app-06-84a10.firebaseapp.com",
  databaseURL: "https://app-06-84a10-default-rtdb.firebaseio.com",
  projectId: "app-06-84a10",
  storageBucket: "app-06-84a10.firebasestorage.app",
  messagingSenderId: "433862531149",
  appId: "1:433862531149:web:281b8129e1915f8c686404"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);