import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Pet from "./Pet";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { Context } from "../../context/Context";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function ListPet({ pets }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {pets && pets.length > 0 ? (
          pets.map((pet, item) => (
            <Grid key={item} item xs={4}>
              <Item>
                <Pet pet={pet} />
              </Item>
            </Grid>
          ))
        ) : (
          <>Loading....</>
        )}
      </Grid>
    </Box>
  );
}
