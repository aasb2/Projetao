



// mudar o nome do arquivo para 'firebaseConfig.ts' e add configurações do Firebase SDK e 

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "XXX",
  authDomain: "XXX",
  projectId: "XXX",
  storageBucket: "XXX",
  messagingSenderId: "XXX",
  appId: "XXX",
  measurementId: "XXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Initialize auth
const auth = getAuth(app);
// Initialize firestore
const db = getFirestore(app);
// Initialize auth
const storage = getStorage(app);

export { app, auth, db, storage };