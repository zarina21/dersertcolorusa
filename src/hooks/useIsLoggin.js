import { auth } from "../firebase/client";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

export function useIsLogin() {
    const [isLogin, setIsLogin] = useState(null);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setIsLogin(!!user);
      });

      return () => unsubscribe();
    }, []);
  
    return isLogin
  }