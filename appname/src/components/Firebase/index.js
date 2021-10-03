import { initializeApp } from "firebase/app";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firbaseSignOut, getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBd1lC0kzGAr-BwqRbR2kkYq0dGa0Q7tHE",
    authDomain: "my-progect-react.firebaseapp.com",
    projectId: "my-progect-react",
    storageBucket: "my-progect-react.appspot.com",
    messagingSenderId: "669073397137",
    appId: "1:669073397137:web:4648dec6e70feff3627630",
    measurementId: "G-1TPJX9BV8R"
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getDatabase();

export const signUp = async (email, pass) => {
    await createUserWithEmailAndPassword(auth, email, pass);
}

export const login = async (email, pass) => {
    await signInWithEmailAndPassword(auth, email, pass);
};

export const signOut = async () => {
    await firbaseSignOut(auth);
}