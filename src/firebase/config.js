// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // Replace with your Firebase project configuration
  apiKey: "AIzaSyB0U-fhpZb88srjInSfVl1Qfusp1ZbA1ws",
  authDomain: "blog-995c1.firebaseapp.com",
  projectId: "blog-995c1",
  storageBucket: "blog-995c1.firebasestorage.app",
  messagingSenderId: "23862263751",
  appId: "1:23862263751:web:c54f963ec70e9e5ce7e3e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };