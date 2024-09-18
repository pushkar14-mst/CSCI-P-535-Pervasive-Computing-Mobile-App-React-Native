import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJyV_U7EhCe0StrJSxXOFXD6WWR7p2ttI",
  authDomain: "pervasive-lab.firebaseapp.com",
  projectId: "pervasive-lab",
  storageBucket: "pervasive-lab.appspot.com",
  messagingSenderId: "936748014049",
  appId: "1:936748014049:web:3e1ef15d0b02f6db029aa0",
  measurementId: "G-SVRJKK9TYL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, db, auth };
