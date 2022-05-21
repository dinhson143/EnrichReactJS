import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect, useState } from "react";
import userAPI from "../../../api/userAPI";
import Alert from "@mui/material/Alert";
import { Context } from "../../../context/Context";
const theme = createTheme();

export default function SignIn() {
  const [user, setUser] = useState(null);
  // const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const context = useContext(Context);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("username") !== "" && data.get("password") !== "") {
      setUser({
        username: data.get("username"),
        password: data.get("password"),
      });
      setError(null);
      //  setUserInfo(null);
    } else {
      setSuccess(null);
      setError("Username or Password is empty !!!");
    }
  };
  useEffect(() => {
    const handleLogin = async () => {
      try {
        const result = await userAPI.login(user);
        //  setUserInfo(result.data);
        context.login(result.data, user);
        if (result.data && result.data.code === 200) {
          setSuccess("Login successfully !!! ");
        }
      } catch (error) {
        console.log("Failed to login: ", error.message);
      }
    };
    if (user) {
      if (user.username && user.password) {
        handleLogin();
      }
    }
  }, [user]);
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {context.userInfo
              ? "Hello " + context.userInfo.username
              : "Sign in"}
          </Typography>
          {success ? <Alert severity="success">{success}</Alert> : <></>}
          {error ? <Alert severity="error">{error}</Alert> : <></>}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
