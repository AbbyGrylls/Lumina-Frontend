import {useAuthContext} from './useAuthContext'
//import { useUser } from "../context/UserContext";

export const useLogout = ()=>{
    const {dispatch}=useAuthContext()
    //const { setUser } = useUser();
    const logout = ()=>{
        localStorage.removeItem('user')
        dispatch({type:'LOGOUT'})
        //setUser(null)
    }
    return {logout}
}