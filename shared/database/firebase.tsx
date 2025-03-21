import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  setDoc,
  query,
  where,
  collectionGroup,
} from "firebase/firestore";
import { data } from "react-router";
import { set ,ref, getDatabase } from "firebase/database";
import { validateConfig } from "../config/validateConfig"; // Adjust the path as necessary

// import { collection, addDoc } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyAS6SmDT21sDYh2kSYgI5QOpd_U9HZjZGM",
  authDomain: "rentit-b4555.firebaseapp.com",
  databaseURL: "https://rentit-b4555-default-rtdb.firebaseio.com",
  projectId: "rentit-b4555",
  storageBucket: "rentit-b4555.firebasestorage.app",
  messagingSenderId: "866324838598",
  appId: "1:866324838598:web:0f618cb51aa1a9e227bfc7",
  measurementId: "G-PLNG6E31P1",
};

// Validate the configuration
// validateConfig(firebaseConfig);

export const FirebaseContext = createContext(null);

// export const FirebaseContext = createContext(null);
// const firebaseConfig = {
//     apiKey: "AIzaSyAS6SmDT21sDYh2kSYgI5QOpd_U9HZjZGM",
//     authDomain: "rentit-b4555.firebaseapp.com",
//     databaseURL: "https://rentit-b4555-default-rtdb.firebaseio.com",
//     projectId: "rentit-b4555",
//     storageBucket: "rentit-b4555.firebasestorage.app",
//     messagingSenderId: "866324838598",
//     appId: "1:866324838598:web:0f618cb51aa1a9e227bfc7",
//     measurementId: "G-PLNG6E31P1"
//   };


export const useFirebase = ()=> useContext(FirebaseContext);


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
// console.log("The APP IS : ",app);
// console.log("the db is :",db);
const database = getDatabase(app);
// Add a new document in collection "cities"



// try {
// const docRef = await addDoc(collection(db, "USER"), {
//   first: "manis",
//   last: "Lovelace",
//   pass: 1815
// });
// console.log("Document written with ID: ", docRef.id);
// } catch (e) {
// console.error("Error adding document: ", e);
// }

// await setDoc(doc(db, "cities", "LA"), {
//   name: "Los Angeles",
//   state: "CA",
//   country: "USA"
// });

// const querySnapshot = await getDocs(collection(db,"users"));
// querySnapshot.forEach((doc)=>{
//   console.log(`user id : ${doc.id } and user details: ${doc.data()}`)
// })

// export const putData = (key, data) => set(ref(database,key),data);
// console.log("the database is :",putData);
export  { app ,db ,database};