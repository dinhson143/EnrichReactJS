/* eslint-disable jsx-a11y/img-redundant-alt */
import PetsIcon from "@mui/icons-material/Pets";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import PetApi from "../../api/petAPI";
import "./style.css";
const theme = createTheme();

export default function UpdatePet() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [pet, setPet] = useState(null);
  const [images, setImages] = useState([]);
  const [petName, setPetName] = useState("");
  let location = useLocation();
  let query = new URLSearchParams(location.search);
  let id = query.get("petID");
  const handleGetPetByID = async (id) => {
    try {
      const result = await PetApi.getPetByID(id);
      setPet(result.data);
    } catch (error) {
      console.log("Failed to get Pet by ID: ", error.message);
    }
  };
  React.useEffect(() => {
    if (!pet && id > 0) {
      handleGetPetByID(id);
    }
    if (pet) {
      setImages(pet.photoUrls);
      setPetName(pet.name);
    }
  }, [pet]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let photoUrls = [];
    images.forEach((element, i) => {
      if (data.get("image" + i) === "") {
        setSuccess(null);
        setError("Please fill information !!!");
        return;
      } else {
        photoUrls.push(data.get("image" + i));
      }
    });
    console.log(photoUrls);
    const updatePet = {
      id: pet.id,
      name: data.get("name") ? data.get("name") : petName,
      category: {
        id: 0,
        name: "string",
      },
      photoUrls: photoUrls,
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
      status: "available",
    };
    const handleUpdatePet = async () => {
      try {
        const result = await PetApi.updatePet(updatePet);
        console.log(result);
        if (result.status === 200) {
          setError(null);
          setSuccess("Update successfully !!! ");
        }
      } catch (error) {
        setSuccess(null);
        setError("Failed !!!" + error.message);
      }
    };
    handleUpdatePet();
  };
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
            <PetsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Pet "{petName}"
          </Typography>
          {success ? <Alert severity="success">{success}</Alert> : <></>}
          {error ? <Alert severity="error">{error}</Alert> : <></>}
          <Box
            onSubmit={handleSubmit}
            component="form"
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            {images.map((item, i) => (
              <TextField
                key={i}
                margin="normal"
                required
                fullWidth
                id={"image" + i}
                label="Image Pet"
                name={"image" + i}
                autoComplete={"image" + i}
                autoFocus
                defaultValue={item}
              />
            ))}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </Box>
        </Box>
        <CssBaseline />
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {images.map((item, i) => (
            <ImageListItem key={i}>
              <img
                src={`${item}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt=""
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </ThemeProvider>
  );
}
