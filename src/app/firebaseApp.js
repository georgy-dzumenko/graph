// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpcSQM80QP5Ir7YBHw4-JCN7525DAS5Xw",
  authDomain: "graph-87aff.firebaseapp.com",
  projectId: "graph-87aff",
  storageBucket: "graph-87aff.appspot.com",
  messagingSenderId: "903335509443",
  appId: "1:903335509443:web:d12789cf537660088b5176",
  measurementId: "G-46ZF0WYD0G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getFirestore(app)