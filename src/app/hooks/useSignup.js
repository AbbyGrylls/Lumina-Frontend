"use client";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

//import { useUser } from "../context/UserContext";
export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Corrected the initial state
  const { dispatch } = useAuthContext();
  
  //const { setUser } = useUser();
  const signup = async (username, password,name) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password,name }),
      });
      
      const json = await res.json();
      if (!res.ok) {
        setIsLoading(false);
        setError(json.error);
        return;
      }

      // Fixed typo: `serItem` -> `setItem`
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      //setUser({ username: json.username,token: json.token });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      setError("Failed to connect to the server.");
    }
  };

  return { signup, isLoading, error };
};