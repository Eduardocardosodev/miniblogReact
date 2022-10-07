import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC6erCNE1TQsdQmOZlwkO7_JIF6V-5Heek",
  authDomain: "miniblog-263f3.firebaseapp.com",
  projectId: "miniblog-263f3",
  storageBucket: "miniblog-263f3.appspot.com",
  messagingSenderId: "496184080459",
  appId: "1:496184080459:web:cbb5a400b2e330de7635ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };