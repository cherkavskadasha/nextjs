"use client";

import { useEffect } from "react";

export default function EnvLogger() {
  useEffect(() => {
    console.log("БРАУЗЕРНА КОНСОЛЬ:");
    console.log("Публічна змінна (NEXT_PUBLIC_APP_NAME):", process.env.NEXT_PUBLIC_APP_NAME);
    
    console.log("Секретна змінна (SECRET_SERVER_KEY):", process.env.SECRET_SERVER_KEY); 
  }, []);

  return null; 
}