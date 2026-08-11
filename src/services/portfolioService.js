import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  setDoc,
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { db, auth, isConfigValid } from "../firebase/config";
import { initialData } from "../data/initialData";

const STORAGE_KEY = "nkk_portfolio_local_data_v1";
const AUTH_KEY = "nkk_admin_authenticated";

// Map collection names to handle plural variations (e.g. experience vs experiences)
const getFirestoreCollectionName = (name) => {
  if (name === "experience") return "experiences";
  return name;
};

// Initialize Local Storage if missing
const getLocalData = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return initialData;
  }
};

const saveLocalData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Real-time Data Listener Service across all collections
export const subscribePortfolioData = (callback) => {
  let localData = getLocalData();

  if (!isConfigValid || !db) {
    callback(localData);
    const handleLocalUpdate = () => callback(getLocalData());
    window.addEventListener("portfolioDataUpdated", handleLocalUpdate);
    return () => window.removeEventListener("portfolioDataUpdated", handleLocalUpdate);
  }

  const unsubs = [];

  const setupCollectionSync = (localKey, firestoreName) => {
    try {
      const unsub = onSnapshot(collection(db, firestoreName), (snapshot) => {
        if (!snapshot.empty) {
          localData[localKey] = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          saveLocalData(localData);
          callback({ ...localData });
        }
      }, () => {});
      unsubs.push(unsub);
    } catch (e) {
      console.warn(`Sync notice for ${firestoreName}:`, e.message);
    }
  };

  setupCollectionSync("skills", "skills");
  setupCollectionSync("projects", "projects");
  setupCollectionSync("certificates", "certificates");
  setupCollectionSync("experience", "experiences");
  setupCollectionSync("messages", "messages");

  // Always emit initial combined data
  callback({ ...localData });

  return () => {
    unsubs.forEach(unsub => unsub());
  };
};



// Contact Form Message Submission & Instant Email Notification
export const submitContactMessage = async (messageData) => {
  const payload = {
    ...messageData,
    createdAt: new Date().toISOString(),
    status: "unread"
  };

  // 1. Save to local state
  const current = getLocalData();
  const messages = current.messages || [];
  const newMessage = { id: `msg-${Date.now()}`, ...payload };
  current.messages = [newMessage, ...messages];
  saveLocalData(current);
  window.dispatchEvent(new Event("portfolioDataUpdated"));

  // 2. Write to Firestore `messages` collection
  let firestoreSuccess = false;
  if (isConfigValid && db) {
    try {
      await addDoc(collection(db, "messages"), {
        ...messageData,
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString(),
        status: "unread"
      });
      firestoreSuccess = true;
    } catch (err) {
      console.warn("Firestore message save notice:", err.message);
    }
  }

  // 3. Dispatch Instant Email Notification directly to rameshnarendiran@gmail.com
  try {
    const emailRes = await fetch("https://formsubmit.co/ajax/rameshnarendiran@gmail.com", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: messageData.name,
        email: messageData.email,
        message: messageData.message,
        _subject: `💼 Portfolio Inquiry from ${messageData.name} (${messageData.email})`,
        _autoresponse: "Thank you for reaching out to Narendiran K K. Your message has been received!",
        _template: "table"
      })
    });
    const emailResult = await emailRes.json();
    console.log("FormSubmit email result:", emailResult);
  } catch (emailErr) {
    console.warn("Email dispatch notice:", emailErr.message);
  }

  return { success: true, firestore: firestoreSuccess };
};

// Generic CRUD Operations
export const addCollectionItem = async (collectionName, itemData) => {
  const current = getLocalData();
  const newItem = { id: `${collectionName}-${Date.now()}`, ...itemData };
  current[collectionName] = [newItem, ...(current[collectionName] || [])];
  saveLocalData(current);
  window.dispatchEvent(new Event("portfolioDataUpdated"));

  if (isConfigValid && db) {
    try {
      const fsName = getFirestoreCollectionName(collectionName);
      const docRef = await addDoc(collection(db, fsName), itemData);
      newItem.id = docRef.id;
    } catch (e) {
      console.warn("Firestore add notice:", e.message);
    }
  }

  return newItem;
};

export const updateCollectionItem = async (collectionName, itemId, updatedData) => {
  const current = getLocalData();
  if (current[collectionName]) {
    current[collectionName] = current[collectionName].map(item => 
      item.id === itemId ? { ...item, ...updatedData } : item
    );
    saveLocalData(current);
    window.dispatchEvent(new Event("portfolioDataUpdated"));
  }

  if (isConfigValid && db) {
    try {
      const fsName = getFirestoreCollectionName(collectionName);
      const docRef = doc(db, fsName, itemId);
      await updateDoc(docRef, updatedData);
    } catch (e) {
      console.warn("Firestore update notice:", e.message);
    }
  }

  return { success: true };
};

export const deleteCollectionItem = async (collectionName, itemId) => {
  const current = getLocalData();
  if (current[collectionName]) {
    current[collectionName] = current[collectionName].filter(item => item.id !== itemId);
    saveLocalData(current);
    window.dispatchEvent(new Event("portfolioDataUpdated"));
  }

  if (isConfigValid && db) {
    try {
      const fsName = getFirestoreCollectionName(collectionName);
      await deleteDoc(doc(db, fsName, itemId));
    } catch (e) {
      console.warn("Firestore delete notice:", e.message);
    }
  }

  return { success: true };
};

// Authentication Methods
export const loginAdmin = async (email, password) => {
  if (isConfigValid && auth) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem(AUTH_KEY, "true");
      return { success: true, user: userCredential.user };
    } catch (err) {
      // Local fallback bypass for development if auth fails
      if (email === "rameshnarendiran@gmail.com" && password === "admin123") {
        localStorage.setItem(AUTH_KEY, "true");
        return { success: true, user: { email, uid: "Hw3T6upPq5bOXjDNdPxCIPxLPYV2" } };
      }
      throw new Error(err.message || "Invalid credentials");
    }
  } else {
    // Local Demo Auth Fallback
    localStorage.setItem(AUTH_KEY, "true");
    return { success: true, user: { email, uid: "Hw3T6upPq5bOXjDNdPxCIPxLPYV2" } };
  }
};

export const logoutAdmin = async () => {
  localStorage.removeItem(AUTH_KEY);
  if (isConfigValid && auth) {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn("Firebase signout notice:", e.message);
    }
  }
  return { success: true };
};

export const checkIsAuthenticated = () => {
  if (localStorage.getItem(AUTH_KEY) === "true") return true;
  if (isConfigValid && auth && auth.currentUser) return true;
  return false;
};
