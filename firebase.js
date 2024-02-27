import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtxVGCgH7X7-hx3NNvWMBJ6Rr85XlGlBc",
  authDomain: "lbejar-notes-app.firebaseapp.com",
  projectId: "lbejar-notes-app",
  storageBucket: "lbejar-notes-app.appspot.com",
  messagingSenderId: "341634691723",
  appId: "1:341634691723:web:c47fe651a83454e073da8e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes")