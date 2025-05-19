import { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register a new user
  async function signup(email, password, displayName) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name
      await updateProfile(userCredential.user, { displayName });
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        displayName,
        watchlist: []
      });
      
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  // Login user
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Google Sign In
  async function signInWithGoogle(autoRegister = true) {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if user document exists
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        // If user doesn't exist and autoRegister is false, throw error
        if (!autoRegister) {
          throw new Error('User not registered');
        }
        
        // Otherwise create the user document
        await setDoc(userRef, {
          email: user.email,
          displayName: user.displayName,
          watchlist: []
        });
      }
      
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Logout user
  function logout() {
    return signOut(auth).then(() => {
      // Redirect to login page after logout
      window.location.href = '/login';
    });
  }

  // Add blog to watchlist
  async function addToWatchlist(blogId) {
    if (!currentUser) return;
    
    const userRef = doc(db, 'users', currentUser.uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const watchlist = userData.watchlist || [];
      
      // Only add if not already in watchlist
      if (!watchlist.includes(blogId)) {
        const updatedWatchlist = [...watchlist, blogId];
        await setDoc(userRef, { ...userData, watchlist: updatedWatchlist }, { merge: true });
        return updatedWatchlist;
      }
      
      return watchlist;
    }
    
    return [];
  }

  // Remove blog from watchlist
  async function removeFromWatchlist(blogId) {
    if (!currentUser) return;
    
    const userRef = doc(db, 'users', currentUser.uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const watchlist = userData.watchlist || [];
      
      const updatedWatchlist = watchlist.filter(id => id !== blogId);
      await setDoc(userRef, { ...userData, watchlist: updatedWatchlist }, { merge: true });
      return updatedWatchlist;
    }
    
    return [];
  }

  // Get user's watchlist
  async function getWatchlist() {
    if (!currentUser) return [];
    
    const userRef = doc(db, 'users', currentUser.uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.watchlist || [];
    }
    
    return [];
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    signInWithGoogle,
    addToWatchlist,
    removeFromWatchlist,
    getWatchlist
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}