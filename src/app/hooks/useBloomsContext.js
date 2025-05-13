import { useContext } from "react"
import { BloomContext } from "../context/BloomContext"

export const useBloomsContext=()=>{
    const context = useContext(BloomContext)
    if(!context){
        throw Error('useBloomContext must be used inside an BloomContextProvider')
    }
    return context
}//custom hook to easily target the context, consuming made easy