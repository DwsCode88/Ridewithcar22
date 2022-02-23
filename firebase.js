// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1o3kZHjX0Dwht7S9h3Wk1C4DEGAcXOsU",
  authDomain: "ridewithcarweb.firebaseapp.com",
  projectId: "ridewithcarweb",
  storageBucket: "ridewithcarweb.appspot.com",
  messagingSenderId: "1061637827783",
  appId: "1:1061637827783:web:07b69ad1991ae1921862e2",
  measurementId: "G-LHPEPWL94D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, provider, auth };
