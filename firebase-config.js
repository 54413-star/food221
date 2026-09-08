// Firebase SDK Version 10+ (Modular Import via CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// TODO: นำค่าจาก Firebase Console > Project Settings > Web App มาวางที่นี่
const firebaseConfig = {
  apiKey: "AIzaSyCHnmCw8-c3LRBoS-mmxEF4mCS6YFrNSbo",
  authDomain: "food221-fe714.firebaseapp.com",
  projectId: "food221-fe714",
  storageBucket: "food221-fe714.firebasestorage.app",
  messagingSenderId: "770341509797",
  appId: "1:770341509797:web:43fb0343a33c99b97b4b4c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };