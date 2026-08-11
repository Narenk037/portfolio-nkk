import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyApcsgFPjYtiLHRDjw4aZ6zHamC7zvdb_0",
  authDomain: "portfolio-nkk.firebaseapp.com",
  projectId: "portfolio-nkk",
  storageBucket: "portfolio-nkk.firebasestorage.app",
  messagingSenderId: "412928226936",
  appId: "1:412928226936:web:632fe3a5f6fff693aedf8d",
  measurementId: "G-NKHR41LS7F"
};

let app;
let auth;
let db;
let analytics;

const isConfigValid = Boolean(firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY");

try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }

  auth = getAuth(app);
  db = getFirestore(app);

  if (typeof window !== "undefined") {
    isSupported().then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    }).catch(() => {});
  }
} catch (error) {
  console.warn("Firebase initialization warning:", error.message);
}

export { app, auth, db, analytics, isConfigValid };
