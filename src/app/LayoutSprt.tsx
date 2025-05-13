"use client";
import React, { useState, /* useEffect  */} from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Navbar from "./components/Navbar";
//import { AuthContextProvider } from "./context/AuthContext";
import BloomForm from "./components/Bloomform";
import "./globals.css";
import LoginForm from "./components/Loginform";
import { useAuthContext } from "./hooks/useAuthContext";
import LogoutComp from "./components/LogoutComp";

//import { useUser } from "./context/UserContext";


const theme = createTheme({
  palette: {
    primary: { main: "#1E90FF" },
    text: { primary: "#000080" },
  },
});

export default function LayoutSprt({ children }: { children: React.ReactNode }) {
  const muiTheme = useTheme();
  const isWideScreen = useMediaQuery(muiTheme.breakpoints.up("md")); // a hook from material UI
  const [showOverlay, setShowOverlay] = useState(false);
  //const [showLoginform, setLoginform] = useState(Boolean);
  const { user } = useAuthContext();

  // const { user } = useUser();

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <Box sx={{ display: "flex", height: "100vh", paddingRight: "-50px" }}>

            {/* Navbar Section */}
            <Box
              sx={{
                width: { xs: "60px", sm: "120px", md: "270px" },
                position: "relative",
                top: 0,
                color: "#fff",
                padding: "10px",
                overflowY: "auto", // Allow scrolling if content overflows
                transition: "width 0.3s", // Smoothly animate width changes
                "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar
              }}
            >
              <Navbar showIconsOnly={!isWideScreen} />
            </Box>

            {/* Middle Section */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                padding: "20px",
                position: "relative",
                borderLeft: "1px solid rgba(255, 255, 255, 0.3)",
                borderRight: "1px solid rgba(255, 255, 255, 0.3)",
                maxHeight: "100vh", // Fix height to prevent growth
                "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar
              }}
            >
              {children}

              {/* Overlay for BloomForm */}
              {showOverlay && (
                <Box
                  sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    //zIndex: 10,
                  }}
                > {user ? (
                  <Box>
                    <Box sx={{ display: "flex", flexDirection: 'column' }}>
                      <BloomForm />
                    </Box>
                  </Box>
                ) : (
                  <LoginForm />
                )}
                  <Button
                    sx={{
                      position: "fixed",
                      top: "10px",
                      right: "10px",
                      color: "white",
                      backgroundColor: "text.primary",
                      marginTop:"150px"
                    }}
                    onClick={() => setShowOverlay(false)}
                  >
                    Close
                  </Button>
                </Box>
              )}
            </Box>
            {/* BloomForm Section or Button */}
            {isWideScreen && !showOverlay ? (
              <Box
                sx={{
                  width: { xs: "10px", sm: "10px", md: "370px" },
                  position: "sticky", 
                  top: 20,
                  paddingTop: "0px",
                  marginTop: "90px",
                  overflowY: "auto", // Allow scrolling if content overflows
                  "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar
                }}
              >
                {user ? (

                  <Box sx={{ display: "flex", flexDirection: 'column', gap: 5 }}>
                    <Typography sx={{ color: "white",marginLeft:"70px" }}> Welcome Back  {user.name}!!</Typography>
                    <BloomForm />
                    <Box sx={{ marginLeft: "300px" }}>
                      <LogoutComp />
                    </Box>
                  </Box>
                ) : (
                  <LoginForm />
                )}
              </Box>
            ) : (
              !showOverlay && (
                <Box sx={{
                  marginBottom: "500px",
                  position: "sticky",
                  bottom: "10px",
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "10px",
                  right: "5px",
                  "@media (max-width: 575px)": {
                    marginLeft: { xs: "-80px" },
                  },
                  "@media (min-width: 575px)": {
                    right: "23px"
                  },
                  //zIndex: 5,
                }}>
                  {user && (
                    <Box sx={{ left: "10px"}}>
                    <LogoutComp />
                  </Box>)}
                  
                  <Box sx={{marginTop:"475px"}}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setShowOverlay(true)}
                      sx={{
                        "@media (max-width: 575px)": {
                          width: "80px",
                          height: "80px",
                          borderRadius: "50%", // Makes it circular
                          textTransform: "none",
                          fontSize: "12px",
                          //position: "absolute",
                          background: `
                      radial-gradient(circle, #1E90FF 60%, transparent 60%),
                      repeating-radial-gradient(circle at center, #1E90FF, #1E90FF 10px, transparent 10px, transparent 20px)
                    `,
                          boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
                          color: "white",
                          "&:hover": {
                            background: `
                        radial-gradient(circle, #104E8B 60%, transparent 60%),
                        repeating-radial-gradient(circle at center, #104E8B, #104E8B 10px, transparent 10px, transparent 20px)
                      `,
                          },
                          overflow: "hidden",
                        },
                        // backgroundColor:"white"
                      }}
                    >
                      Bloom
                    </Button>
                  </Box>
                </Box>
              )
            )}
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}