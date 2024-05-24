// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdA7QKwjksDb0ppgEaGEXbcxBFymL_nus",
  authDomain: "login-todo-3899d.firebaseapp.com",
  projectId: "login-todo-3899d",
  storageBucket: "login-todo-3899d.appspot.com",
  messagingSenderId: "477260889400",
  appId: "1:477260889400:web:786d18c03c821a164655cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default  app;