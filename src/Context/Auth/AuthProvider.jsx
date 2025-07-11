import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../../Firebase/firebase.config';
import { GoogleAuthProvider } from "firebase/auth";



const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Signup
  const signup = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // Update user profile
  const updateUserProfile = (profileInfo) => {
    return updateProfile(auth.currentUser, profileInfo)
  }

  // Signin
  const signin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Signout
  const signout = () => {
    setLoading(true);
    return signOut(auth)
  }

  // Google Sign in
  const provider = new GoogleAuthProvider();
  const googleSignIn = () => {
    return signInWithPopup(auth, provider)
  }

  // Observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    }
  }, [])

  const userInfo = {
    signup,
    updateUserProfile,
    signin,
    signout,
    googleSignIn,
    user,
    loading
  }
  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;