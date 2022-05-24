import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

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

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const db = getDatabase(app);
