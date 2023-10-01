// mudar o nome do arquivo para 'firebaseConfig.ts' e add configurações do Firebase SDK e 

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence  } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAyX06Em59zeLxKu9_PbjkohhwS7M6JOiI",
    authDomain: "unityfit-af963.firebaseapp.com",
    projectId: "unityfit-af963",
    storageBucket: "unityfit-af963.appspot.com",
    messagingSenderId: "673586085697",
    appId: "1:673586085697:web:7d496fe40fac3dff36abc0",
    measurementId: "G-03EXVV5CZP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Initialize auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
// Initialize firestore
export const db = getFirestore(app);
// Initialize auth
export const storage = getStorage(app);
