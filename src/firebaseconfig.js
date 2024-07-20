import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBHzg-LzvMPvktxxmYzaGL0veBVeTg2ZSw",
  authDomain: "smash-badminton-1312.firebaseapp.com",
  projectId: "smash-badminton-1312",
  storageBucket: "smash-badminton-1312.appspot.com",
  messagingSenderId: "594020941603",
  appId: "1:594020941603:web:03840dc0da0cdb5b65d696",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore if using Firestore
const db = getFirestore(app);

export {  db };
