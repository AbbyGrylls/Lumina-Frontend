"use client";
import { createContext, useReducer } from "react";
export const BloomContext = createContext();
export const bloomsReducer=(state,action)=>{
    switch(action.type){
        case 'SET_BLOOMS':
        return {
           ...state,
            blooms:action.payload
        }
        case 'CREATE_BLOOM':
            return {
                ...state,
                blooms:[action.payload,...state.blooms]
            }
            case "SET_PBLOOMS":
      return {
        ...state,
        Pblooms: action.payload,
      };
    case "CREATE_PBLOOM":
      return {
        ...state,
        Pblooms: [action.payload, ...state.Pblooms],
      };
            /* case 'DELETE_BLOOM':
                return{
                    blooms:
                } */
               default:
                return state
    }
}
const BloomContextProvider =({children})=>{

    const [state,dispatch]=useReducer(bloomsReducer,{
        blooms:[],
        Pblooms:[]
    })
    return(
        <BloomContext.Provider value={{...state,dispatch}}>
         {children}
        </BloomContext.Provider>
    )
}
export default BloomContextProvider