import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Stack from "@mui/material/Stack";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PetApi from "../../api/petAPI";
import { Context } from "../../context/Context";
import "./style.css";
export default function MasonryImageList() {
  const context = useContext(Context);
  const [pet, setPet] = useState(null);
  const [images, setImages] = useState(itemData);
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
  function checkURL(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }
  useEffect(() => {
    if (!pet && id > 0) {
      handleGetPetByID(id);
    }
    if (pet) {
      let newImages = [];
      pet.photoUrls.forEach((url) => {
        if (checkURL(url)) {
          newImages.push(url);
        }
      });
      if (newImages.length > 0) {
        setImages(newImages);
      }
    }
  }, [pet]);
  const BtnOrder = () => {
    if (context.userInfo) {
      return (
        <Stack direction="row" spacing={1}>
          <Button
            onClick={() => handleOrderPet(pet.id)}
            variant="outlined"
            color="error"
          >
            Order
          </Button>
        </Stack>
      );
    } else return <></>;
  };
  const handleOrderPet = (id) => {
    console.log(id);
    context.orderPet(id);
  };
  return (
    <Box sx={{ width: 500, height: 450, overflowY: "scroll" }}>
      <h2>{pet ? pet.name : "Your Pet"}</h2>
      {pet ? <BtnOrder /> : <></>}
      <ImageList variant="masonry" cols={3} gap={8}>
        {images.map((item, i) => (
          <ImageListItem key={item}>
            <img
              src={`${item}?w=248&fit=crop&auto=format`}
              srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={"ImagePet"}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

const itemData = [
  "https://image.cnbcfm.com/api/v1/image/106686172-1598966433320-gettyimages-1152439648-istockalypse-home-office-00062.jpeg?v=1599013160",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoF4O1ycDDlEchgz_pnK-lnJj3_QthRdc-lrzU5_ALU2132kbcOd1HgaSLdRxX8fMac0U&usqp=CAU",
  "https://media.4rgos.it/i/Argos/5020-m0014-m007-m050-asym-m008-m022-328089830-pets?maxW=1200&qlt=75&fmt.jpeg.interlaced=true",
];
