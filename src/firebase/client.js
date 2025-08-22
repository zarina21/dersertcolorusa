import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// ❌ PROBLEMA GRAVE: Credenciales de Firebase expuestas
const firebaseConfig = {
    apiKey: "AIzaSyBdjwEQ96iNtLAx0b2ZRbrqHZFaV7eKxIg", // ⚠️ Expuesto públicamente
    authDomain: "desertcolor-4c2db.firebaseapp.com",
    projectId: "desertcolor-4c2db",
    storageBucket: "desertcolor-4c2db.firebasestorage.app",
    messagingSenderId: "652037661806",
    appId: "1:652037661806:web:e6c934ab8ce704b8b5f27f",
    measurementId: "G-8EC22JKMM0"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);






