import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // အကောင့်သစ် ဖွင့်ခြင်း
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // အကောင့် ဝင်ခြင်း
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // အကောင့် ထွက်ခြင်း
  const logout = () => {
    return signOut(auth);
  };

  // User ၏ Login Status ကို စောင့်ကြည့်ခြင်း
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);