import { Button, CardActionArea, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./style.css";
export default function MultiActionAreaCard({ pet }) {
  const [image, setImage] = React.useState(
    "https://www.cdc.gov/healthypets/images/pets/cute-dog-headshot.jpg?_=42445"
  );
  const context = React.useContext(Context);
  const handleOrderPet = (id) => {
    context.orderPet(id);
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
  }, [pet]);
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
      {context.userInfo ? (
        <CardActions
          onClick={() => handleOrderPet(pet.id)}
          className="btnOrder"
        >
          <Button size="small" color="primary">
            Order
          </Button>
        </CardActions>
      ) : (
        <CardActions className="btnOrder">
          <Button size="small" color="primary">
            More
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
