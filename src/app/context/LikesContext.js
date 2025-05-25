"use client";
import { useContext } from "react";
import { createContext, useReducer, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
export const LikesContext = createContext()
export const likesReducer = (state, action) => {
    switch (action.type) {
        case 'LIKED':
            return {
                ...state,
                redisLikes: action.payload || state.redisLikes,
                likeCounts: {
                    ...state.likeCounts,
                    [action.payload.bloomId]: action.payload.likeCount
                }
            };
        case 'UNLIKED':
            return {
                ...state,
                redisLikes: action.payload || state.redisLikes,
                likeCounts: {
                    ...state.likeCounts,
                    [action.payload.bloomId]: action.payload.likeCount
                }
            };
        default:
            return state;
    }
};

export const LikesContextProvider = ({ children }) => {
    const { user } = useAuthContext();
    const [state, likesDispatch] = useReducer(likesReducer, {
        redisLikes: []
    })
    useEffect(() => {
        if (user && user.LikedBlooms) {
            dispatch({ type: "LIKED", payload: user.LikedBlooms });
        }
    }, [user]);
    return (
        <LikesContext.Provider value={{ ...state, likesDispatch }}>
            {children}
        </LikesContext.Provider>
    )
}
export const useLikes = () => useContext(LikesContext)