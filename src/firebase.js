// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbFp7qzkO9HTBdtNZP6m-O1z3Rr7azmzQ",
  authDomain: "reactflutter-3aa72.firebaseapp.com",
  projectId: "reactflutter-3aa72",
  storageBucket: "reactflutter-3aa72.appspot.com",
  messagingSenderId: "277858909",
  appId: "1:277858909:web:b040bf3180e5db1dbc5bb4",
  measurementId: "G-FQJ4ZF6SZH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);