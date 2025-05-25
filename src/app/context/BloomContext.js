"use client";
import { createContext, useReducer } from "react";
export const BloomContext = createContext();
export const bloomsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BLOOMS':
            return {
                ...state,
                blooms: action.payload,
            };

        case 'CREATE_BLOOM':
            return {
                ...state,
                blooms: [action.payload, ...state.blooms],
            };

        case 'UPDATE_BLOOM':
            return {
                ...state,
                blooms: state.blooms.map(bloom =>
                    bloom._id === action.payload._id ? action.payload : bloom
                ),
            };

        case 'DELETE_BLOOM':
            return {
                ...state,
                blooms: state.blooms.filter(bloom => bloom._id !== action.payload),
            };

        case 'SET_PBLOOMS':
            return {
                ...state,
                Pblooms: action.payload,
            };

        case 'CREATE_PBLOOM':
            return {
                ...state,
                Pblooms: [action.payload, ...state.Pblooms],
            };

        case 'UPDATE_PBLOOM':
            return {
                ...state,
                Pblooms: state.Pblooms.map(bloom =>
                    bloom._id === action.payload._id ? action.payload : bloom
                ),
            };

        case 'DELETE_PBLOOM':
            return {
                ...state,
                Pblooms: state.Pblooms.filter(bloom => bloom._id !== action.payload),
            };
        case 'LIKE':
    return {
        ...state,
        blooms: state.blooms.map(b =>
            b._id === action.payload.bloomId
                ? { ...b, likesCount: action.payload.likeCount }
                : b
        ),
        Pblooms: state.Pblooms.map(b =>
            b._id === action.payload.bloomId
                ? { ...b, likesCount: action.payload.likeCount }
                : b
        ),
    };


        /* case 'UNLIKE':
            return {
                ...state,
                blooms: state.blooms.map(b =>
                    b._id === action.payload.bloomId
                        ? { ...b, likesCount: Math.max(0, b.likesCount +payload.likeCount- 1) }
                        : b
                ),
                Pblooms: state.Pblooms.map(b =>
                    b._id === action.payload.bloomId
                        ? { ...b, likesCount: Math.max(0, b.likesCount +payload.likeCount - 1) }
                        : b
                ),
            }; */
        default:
            return state;
    }
};

const BloomContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(bloomsReducer, {
        blooms: [],
        Pblooms: [],
        //redisLikeCount: null,
    })
    return (
        <BloomContext.Provider value={{ ...state, dispatch }}>
            {children}
        </BloomContext.Provider>
    )
}
export default BloomContextProvider