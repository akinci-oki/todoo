// import Rebase from "re-base";

// import firebase from "firebase/compat/app";
// require("firebase/database");
// // Import the functions you need from the SDKs you need
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyC12sxWjxpKo040989XpdR6sLpW3gmhqBQ",
//     authDomain: "todoopidompie.firebaseapp.com",
//     databaseURL:
//         "https://todoopidompie-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "todoopidompie",
//     storageBucket: "todoopidompie.appspot.com",
//     messagingSenderId: "973965928303",
//     appId: "1:973965928303:web:54f671ccc23a734e5e6a9a",
// };

// // Initialize Firebase
// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const base = Rebase.createClass(firebaseApp.database());

// // named exp
// export { firebaseApp };
// // default exp
// export default base;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC12sxWjxpKo040989XpdR6sLpW3gmhqBQ",
    authDomain: "todoopidompie.firebaseapp.com",
    databaseURL:
        "https://todoopidompie-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "todoopidompie",
    storageBucket: "todoopidompie.appspot.com",
    messagingSenderId: "973965928303",
    appId: "1:973965928303:web:54f671ccc23a734e5e6a9a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
