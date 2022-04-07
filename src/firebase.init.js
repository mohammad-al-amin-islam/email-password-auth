// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8x4Ijw7h1rtOrKta5Q9UnkNL1DnMU63s",
    authDomain: "email-password-auth-654f1.firebaseapp.com",
    projectId: "email-password-auth-654f1",
    storageBucket: "email-password-auth-654f1.appspot.com",
    messagingSenderId: "464605874810",
    appId: "1:464605874810:web:b6119b5ec137195bdb09c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app