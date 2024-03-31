// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// import {getStorage} from 'firebase/storage'
// import { getDatabase} from 'firebase/database'
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuOOObk9UQu7YfmO2mhOv0sVBzkfW75-s",
  authDomain: "wyvate-app.firebaseapp.com",
  projectId: "wyvate-app",
  storageBucket: "wyvate-app.appspot.com",
  messagingSenderId: "727933576737",
  appId: "1:727933576737:web:87bdd37b9cc02a8d9f2560",
  measurementId: "G-RG8S80W9Q0"
};

// Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const dbfs = firebase.firestore();

// export { app, auth, dbfs };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dbfs = getFirestore(app);

export { app, auth, dbfs };
