/* // Define the Bloom type
interface Bloom {
  _id: string; // MongoDB document ID
  text: string; // Text field from the MongoDB document
}

// Fetch data from the backend
async function getBlooms(): Promise<Bloom[]> {
  const res = await fetch('http://localhost:4000/api/blooms');
  if (!res.ok) {
    throw new Error('Failed to fetch blooms');
  }
  return res.json();
}

// Component to render Bloom data
export default async function Home() {
  const blooms: Bloom[] = await getBlooms();
  return (
    <>
      {blooms.map((bloom) => (
        <div key={bloom._id} className="card">
          <p>{bloom.text}</p>
        </div>
      ))}
    </>
  );
}  */
"use client";
import { useEffect } from "react";
import  {useBloomsContext} from "./hooks/useBloomsContext";
//import { useAuthContext } from "./hooks/useAuthContext";
import { Typography,Box,/* Button, */ } from "@mui/material";
export default function Home() {
  const { blooms, dispatch } = useBloomsContext();
  //const {user}= useAuthContext()
  useEffect(() => {
    const getBlooms = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blooms`);
        const json = await res.json();
        //console.log(json)
        if (res.ok) {
          dispatch({ type: "SET_BLOOMS", payload: json });
        } else {
          console.log("Couldn't fetch data");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    
    getBlooms();
  }, [dispatch]);
  return (
    <Box >
      {blooms && blooms.length > 0 ? (
        blooms.map((bloom) => (
          <Box key={bloom._id}>
          <Box  className="card" style={{ padding: "10px 30px 15px 20px", }}>
            <Box sx={{display:"flex",flexDirection:"row"}}>
            <Box
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#666",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "10px",
                }}
              >
                {/* Placeholder for Profile Picture */}
                <span style={{ color: "#fff", fontWeight: "bold" }}>P</span>
              </Box>
              <Box sx={{}}>
                <span style={{ fontWeight: "bold", fontSize: "16px", color: "#fff" }}>
                  <h3>{bloom.userId?.name || "Unknown User"}</h3>
                </span>{" "}
                </Box>
                <Box>
                <span style={{ color: "rgba(255, 255, 255, 0.3)",paddingRight:"10px"}}>@{bloom.username}</span>
              </Box>
              </Box>
              <Typography sx={{paddingLeft:"50px",marginTop:"-15px"}}>{bloom.text}</Typography>
          </Box>
          </Box>
        ))
      ) : (
        <p>Loading blooms...</p>
      )}
    </Box>
  );
}
