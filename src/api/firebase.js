import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHIZXO4p7Tmqrqrl6UcnF4RGENMm5gxP4",
  authDomain: "brainspark-ai-d9284.firebaseapp.com",
  projectId: "brainspark-ai-d9284",
  storageBucket: "brainspark-ai-d9284.firebasestorage.app",
  messagingSenderId: "614815176721",
  appId: "1:614815176721:web:19b529be3da4704aa1f9b0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);