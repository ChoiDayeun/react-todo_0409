// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbgHL5Imt0NXsDArzYZk3GOCff0MJxt5I",
  authDomain: "todo-wolf.firebaseapp.com",
  projectId: "todo-wolf",
  storageBucket: "todo-wolf.appspot.com",
  messagingSenderId: "140418682685",
  appId: "1:140418682685:web:4b609bcb360213cf5abf54",
  measurementId: "G-GGJ1HFE6GJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, db };