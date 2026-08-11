import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initialData } from "../src/data/initialData.js";

const firebaseConfig = {
  apiKey: "AIzaSyApcsgFPjYtiLHRDjw4aZ6zHamC7zvdb_0",
  authDomain: "portfolio-nkk.firebaseapp.com",
  projectId: "portfolio-nkk",
  storageBucket: "portfolio-nkk.firebasestorage.app",
  messagingSenderId: "412928226936",
  appId: "1:412928226936:web:632fe3a5f6fff693aedf8d",
  measurementId: "G-NKHR41LS7F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  console.log("Starting Firestore seed...");

  try {
    // 1. Seed Skills
    console.log("Seeding skills...");
    for (const item of initialData.skills) {
      await setDoc(doc(db, "skills", item.id), item);
      console.log(`  Added skill: ${item.name}`);
    }

    // 2. Seed Experiences (matching rules /experiences/)
    console.log("Seeding experiences...");
    for (const item of initialData.experience) {
      await setDoc(doc(db, "experiences", item.id), item);
      console.log(`  Added experience: ${item.role}`);
    }

    // 3. Seed Certificates
    console.log("Seeding certificates...");
    for (const item of initialData.certificates) {
      await setDoc(doc(db, "certificates", item.id), item);
      console.log(`  Added certificate: ${item.title}`);
    }

    // 4. Seed Projects
    console.log("Seeding projects...");
    for (const item of initialData.projects) {
      await setDoc(doc(db, "projects", item.id), item);
      console.log(`  Added project: ${item.title}`);
    }

    console.log("🎉 Firestore seeding successfully completed!");
    process.exit(0);
  } catch (err) {
    console.error("Firestore seed error:", err.message);
    process.exit(1);
  }
}

seed();
