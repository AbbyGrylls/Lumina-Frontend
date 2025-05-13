"use client";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Button, TextField, Typography, Box, Paper, Alert } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, /* isLoading  */} = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
       // backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: "100%",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            marginBottom: 3,
            fontWeight: "bold",
            color: "#3f51b5",
          }}
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 3 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!username || !password}
            sx={{ padding: "10px 0", fontSize: "1rem" }}
          >
            Login
          </Button>
          {error && (
            <Alert severity="error" sx={{ marginTop: 1 }}>
              {error}
            </Alert>
          )}
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
