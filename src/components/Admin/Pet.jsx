import { Button, CardActionArea, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";
import PetApi from "../../api/petAPI";
import "./style.css";
export default function Pet({ pet, handleDelete }) {
  const [image, setImage] = React.useState(
    "https://www.cdc.gov/healthypets/images/pets/cute-dog-headshot.jpg?_=42445"
  );
  const handleDeletePet = async (id) => {
    try {
      const result = await PetApi.deletePet(id);
      if (result.data.code === 200) {
        const result = await PetApi.getPetAvailable();
        let Pets = result.data;
        Pets = Pets.filter((pet) => pet.id <= 99999);
        handleDelete(Pets);
        alert("Delete pet successful !!!");
      }
    } catch (error) {
      console.log("Failed to delete Pet: ", error.message);
    }
  };
  function checkURL(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }
  React.useEffect(() => {
    if (pet) {
      pet.photoUrls.forEach((url) => {
        if (checkURL(url)) {
          setImage(url);
          return;
        }
      });
    }
  }, []);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link className="home" to={"/detail?petID=" + pet.id}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            alt="green iguana"
            src={image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {pet.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {pet.category && <>{pet.category.name}</>}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button
          className="btnHandlePet"
          onClick={() => handleDeletePet(pet.id)}
          size="small"
          color="primary"
        >
          Delete
        </Button>
        <Link className="home" to={"/update?petID=" + pet.id}>
          <Button className="btnHandlePet" size="small" color="primary">
            Update
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
