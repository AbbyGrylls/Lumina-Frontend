"use client";
import { createContext, useReducer, useEffect } from "react";
import { useLikes } from "./LikesContext";
//import { useUser } from "./UserContext";
export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    //updating global state by collecting data from local storage on every re render
    // const { setUser } = useUser();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) (
            dispatch({ type: 'LOGIN', payload: user })
        )
        // setUser(user)
    }, [])
    //console.log('AuthContext state:',state )
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
