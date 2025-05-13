import { useAuthContext } from "@/app/hooks/useAuthContext";
import {Box,Typography} from "@mui/material";
export default function PheroComp(){
  const { user } = useAuthContext()
    return(
      <Box className="card" style={{ /* padding: "20px 50px 25px 40px" */ }} >
        {/* <Typography sx={{color:"white",}}> Profile Hero section coming soon</Typography> */}
        <Box sx={{display:"flex", flexDirection:"column",gap:1}}>
          <Box style={{ //banner box
                  maxWidth: "1600",
                  height: "100px",
                  backgroundColor: "#999",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "10px",
                  margin:"-45px -15px 0px -15px",
                  borderRadius: "3%",
                }}>
            <span style={{ color: "#fff", fontWeight: "bold" }}>Profile Banner</span>
          </Box>
          <Box sx={{
                  display: "flex",}}>
          <Box //profile photo box
                style={{
                  width: "80px",
                  height: "80px",
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
              <Box >
                <span style={{ fontWeight: "bold", fontSize: "25px", color: "#fff" }}>
                  <h3>{user.name }</h3>
                </span>{" "}
                </Box>
                <Box sx={{marginTop:"-6px"}}>
                <span style={{ color: "rgba(255, 255, 255, 0.3)",paddingRight:"6px"}}>@{user.username}</span>
              </Box>
              <Typography sx={{marginTop:"7px"}}>[Bio section comming soon...]</Typography>
              </Box>
              </Box>
              
              </Box>
        
      </Box>
    )
}