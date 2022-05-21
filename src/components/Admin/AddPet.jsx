/* eslint-disable jsx-a11y/img-redundant-alt */
import AddBoxIcon from "@mui/icons-material/AddBox";
import PetsIcon from "@mui/icons-material/Pets";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { green, pink } from "@mui/material/colors";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import "./style.css";
import PetApi from "../../api/petAPI";
import { createRef } from "react";
const theme = createTheme();

export default function AddPet() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [countTF, setCountTF] = useState(["image"]);
  const [statusError, setStatusError] = useState(false);
  const [itemDataImage, setItemDataImage] = useState([]);
  const [image, setImage] = useState(null);
  const wrapperRef = createRef();
  const handleGetPetByID = async (id) => {
    try {
      const result = await PetApi.getPetByID(id);
      if (!result) {
        setStatusError(true);
      }
      return result;
    } catch (error) {
      console.log("Failed to find pet: ", error.message);
      setStatusError(true);
    }
  };
  const randomIDPet = async () => {
    let id = Math.floor(Math.random() * 100000 + 1);
    while (true) {
      let data = await handleGetPetByID(id);
      if (typeof data === "undefined") {
        return id;
      }
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("name") === "" || data.get("image") === "") {
      setSuccess(null);
      setError("Please fill information !!!");
      return;
    }
    const photoUrls = [];
    countTF.forEach((element) => {
      photoUrls.push(data.get(element));
    });
    let newID = await randomIDPet();
    const newPet = {
      id: newID,
      name: data.get("name"),
      photoUrls: photoUrls,
      category: {
        id: 0,
        name: "pet",
      },
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
      status: "available",
    };
    const handleAddPet = async () => {
      try {
        const result = await PetApi.addPet(newPet);
        if (result.status === 200) {
          setError(null);
          setSuccess("Add pet successfully !!! ");
        } else {
          setSuccess(null);
          setError("Failed !!!");
        }
      } catch (error) {
        setError("Failed !!!" + error.message);
      }
    };
    handleAddPet();
  };
  const addTF = () => {
    let count = countTF.length + 1;
    let textfield = "image" + count;
    let newArray = [...countTF, textfield];
    setCountTF(newArray);
  };
  const removeTF = () => {
    if (countTF.length > 1) {
      let newArray = countTF.slice(0, countTF.length - 1);
      setCountTF(newArray);
    }
  };
  const handleClick = (event) => {
    const { target } = event;
    if (!wrapperRef.current.contains(target)) {
      if (image) {
        let newImageData = [...itemDataImage, { img: image }];
        setItemDataImage(newImageData);
        setImage(null);
      }
    }
  };
  const handleChange = (e) => {
    setImage(e.target.value);
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
            Add Pet
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
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              onClick={handleClick}
            />
            {countTF.map((textfield) => (
              <TextField
                className={textfield}
                key={textfield}
                margin="normal"
                required
                fullWidth
                id={textfield}
                label="Image Pet"
                name={textfield}
                autoComplete={textfield}
                autoFocus
                ref={wrapperRef}
                onClick={handleClick}
                onChange={handleChange}
              />
            ))}
            <div onClick={handleClick} className="groupBtn">
              <Avatar onClick={addTF} sx={{ m: 1, bgcolor: green[500] }}>
                <AddBoxIcon />
              </Avatar>
              <Avatar onClick={removeTF} sx={{ m: 1, bgcolor: pink[500] }}>
                <DoDisturbOnIcon />
              </Avatar>
            </div>

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
          {itemDataImage.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </ThemeProvider>
  );
}
