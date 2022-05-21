import Pet from "./Pet";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { useContext } from "react";
import PetApi from "../../api/petAPI";
import "./about.css";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function AboutPet() {
  const context = useContext(Context);
  const [pets, setPets] = useState([]);
  useEffect(() => {
    const getPets = async () => {
      try {
        const result = await PetApi.getPetAvailable();
        let Pets = result.data;
        Pets = Pets.filter((pet) => pet.id <= 99999);
        console.log(Pets);
        context.getPets(Pets);
        setPets(context.pets);
      } catch (error) {
        console.log("Failed to get pet available: ", error.message);
      }
    };
    getPets();
  }, [pets]);
  const handleDeletePet = (pets) => {
    context.getPets(pets);
    setPets(context.pets);
  };
  return (
    <div>
      <CssBaseline />
      <Stack direction="row" spacing={1}>
        <Link className="home" to="/add_pet">
          <Button variant="contained" color="success">
            Add Pet
          </Button>
        </Link>
      </Stack>
      <Box className="aboutPet" sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {pets && pets.length > 0 ? (
            pets.map((pet, item) => (
              <Grid key={item} item xs={4}>
                <Item>
                  <Pet pet={pet} handleDelete={handleDeletePet} />
                </Item>
              </Grid>
            ))
          ) : (
            <Grid>Loading....</Grid>
          )}
        </Grid>
      </Box>
    </div>
  );
}
