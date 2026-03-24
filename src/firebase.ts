import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // 🔥 ADD

const firebaseConfig = {
  apiKey: "AIzaSyCTStvnkR9_koazMqLca7kwRZvIAWOqKxw",
  authDomain: "shopping-cart-app-409f5.firebaseapp.com",
  projectId: "shopping-cart-app-409f5",
  storageBucket: "shopping-cart-app-409f5.firebasestorage.app",
  messagingSenderId: "391396290360",
  appId: "1:391396290360:web:a9f302cac619ae1b4f9bcd",
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app); // 🔥 ADD

console.log("🔥 Firebase Connected:", app.name);