import { ListItem } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AboutPet from "./components/Admin/AboutPet";
import UpdatePet from "./components/Admin/UpdatePet";
import Detail from "./components/Detail";
import SignIn from "./components/Form/SignIn";
import SignUp from "./components/Form/SignUp";
import Logout from "./components/Form/Logout";
import Header from "./components/Header";
import PetOverview from "./components/Pet/PetOverview";
import AddPet from "./components/Admin/AddPet";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { Context } from "./context/Context";
function App() {
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const context = React.useContext(Context);
  useEffect(() => {
    setAlert(!context.hideAlertOrder);
    setTimeout(() => {
      setSuccess(context.alertOrderSuccess);
      setError(context.alertOrderError);
    }, 1000);
    setTimeout(() => {
      offAlert();
    }, 3000);
  }, [
    context.hideAlertOrder,
    context.alertOrderSuccess,
    context.alertOrderError,
  ]);
  const offAlert = () => {
    setAlert(false);
    setSuccess(false);
    setError(false);
  };
  return (
    <div className="App">
      <Header />
      <React.Fragment>
        <CssBaseline />
        <Container fixed>
          {alert === true ? (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="info">
                <AlertTitle>Order</AlertTitle>
                This is a status your order — <strong>Pending...</strong>
              </Alert>
            </Stack>
          ) : (
            <></>
          )}
          {success === true ? (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="success">
                <AlertTitle>Order</AlertTitle>
                Your Order — <strong>Success !</strong>
              </Alert>
            </Stack>
          ) : (
            <></>
          )}
          {error === true ? (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="error">
                <AlertTitle>Order</AlertTitle>
                Your Order — <strong>Failed !</strong>
              </Alert>
            </Stack>
          ) : (
            <></>
          )}
          <Box sx={{ bgcolor: "#f6f1ea", height: "100vh" }}>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <ListItem>
                    <PetOverview />
                  </ListItem>
                }
              ></Route>
              <Route path="/detail" element={<Detail />}></Route>
              <Route path="/update" element={<UpdatePet />}></Route>
              <Route path="/order" element={<Detail />}></Route>
              <Route exact path="/Signin" element={<SignIn />}></Route>
              <Route exact path="/Signup" element={<SignUp />}></Route>
              <Route exact path="/Pets" element={<AboutPet />}></Route>
              <Route exact path="/Logout" element={<Logout />}></Route>
              <Route exact path="/add_pet" element={<AddPet />}></Route>
            </Routes>
          </Box>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default App;
