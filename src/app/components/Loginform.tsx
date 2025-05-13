"use client";

import { useState } from "react";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { Box, Button, Typography, Paper } from "@mui/material";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80px",
        //backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 2,
          maxWidth: 500,
          width: "100%",
          borderRadius: 2,
        }}
      >
        {isLogin ? (
          <>
            <Login />
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                marginTop: 2,
                color: "#555",
              }}
            >
              New user? Please sign up below.
            </Typography>
            <Button
              variant="text"
              color="primary"
              fullWidth
              sx={{ marginTop: 1 }}
              onClick={toggleForm}
            >
              Sign Up
            </Button>
          </>
        ) : (
          <>
            <Signup />
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                marginTop: 2,
                color: "#555",
              }}
            >
              Existing User? Please log in below.
            </Typography>
            <Button
              variant="text"
              color="primary"
              fullWidth
              sx={{ marginTop: 1 }}
              onClick={toggleForm}
            >
              Log In
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default LoginForm;
