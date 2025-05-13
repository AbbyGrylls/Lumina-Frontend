"use client";
//import  {useBloomsContext} from "../hooks/useBloomsContext";
//import { useAuthContext } from "../hooks/useAuthContext";
import PBloomList from "./Pcomps/PBloomList"
import PheroComp from "./Pcomps/PheroComp"
import {Box} from "@mui/material"
import { useAuthContext } from "../hooks/useAuthContext";
export default function Profile() {
  const {user} = useAuthContext()
    return (
      <div>
      {user?(
        <Box >
        <PheroComp />
      <PBloomList />
      </Box>
      ):(
        <Box sx={{color:"white"}}>
        <h1>To access this page, please Log In!</h1>
        </Box>
      )}
      </div>
    );
  }