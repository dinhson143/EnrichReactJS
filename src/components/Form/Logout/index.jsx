import HailIcon from "@mui/icons-material/Hail";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import userAPI from "../../../api/userAPI";

const theme = createTheme();

export default function Logout() {
  const [message, setMessage] = useState(null);
  const handleLogout = () => {
    const logoutUser = async () => {
      try {
        const result = await userAPI.logout();
        console.log(result);
        if (result.data.code === 200) {
          setMessage("See you again !!!");
        } else {
          setMessage("Failed !!!");
        }
      } catch (error) {
        setMessage("Failed !!!" + error.message);
      }
    };
    logoutUser();
  };
  useEffect(() => {
    handleLogout();
    setTimeout(() => {
      document.location.href = "/";
    }, 1000);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <HailIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {message}
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
