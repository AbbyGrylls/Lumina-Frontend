"use client";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

//import { useUser } from "../context/UserContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Corrected the initial state
  const { dispatch } = useAuthContext();
  //const { setUser } = useUser();
  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      
      const json = await res.json();
     // console.log(json);
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
    } catch (error) {
      console.error("Error during login:", error);
      setIsLoading(false);
      setError("Failed to connect to the server.");
    }
  };

  return { login, isLoading, error };
};