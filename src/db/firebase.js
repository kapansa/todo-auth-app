import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZrzdwwC_z-N1wLD5v8_6mJDAJJRuH8c8",
  authDomain: "todo-auth-app-9f41d.firebaseapp.com",
  projectId: "todo-auth-app-9f41d",
  storageBucket: "todo-auth-app-9f41d.appspot.com",
  messagingSenderId: "656519623429",
  appId: "1:656519623429:web:55c03fce1be40c02adbd6c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const githubProvider = new GithubAuthProvider();