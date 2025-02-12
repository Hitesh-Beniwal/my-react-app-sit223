import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBr39-e6vGZPZhS_26W6oO0kuwmlcnm6Pg",
  authDomain: "devdeakin-3a8ea.firebaseapp.com",
  databaseURL: "https://devdeakin-3a8ea-default-rtdb.firebaseio.com",
  projectId: "devdeakin-3a8ea",
  storageBucket: "devdeakin-3a8ea.appspot.com",
  messagingSenderId: "889230420452",
  appId: "1:889230420452:web:0370b6df7ded1d13c33ff1",
  measurementId: "G-4PKH87ESXX"
};

// Initialize Firebase (without assigning to firebaseApp to avoid linting issue)
initializeApp(firebaseConfig);

// Set up authentication
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Firestore setup
export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('Error in creating user document', error.message);
    }
  }

  return userDocRef;
};

// Functions for signing in and signing up with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signinAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

