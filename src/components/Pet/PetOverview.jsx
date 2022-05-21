import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import PetApi from "../../api/petAPI";
import { Context } from "../../context/Context";
import ListPet from "./ListPet";
import Pagination from "./Pagination";

PetOverview.propTypes = {};

function PetOverview(props) {
  const [pets, setPets] = useState([]);
  const context = useContext(Context);
  useEffect(() => {
    const getPets = async () => {
      try {
        const result = await PetApi.getPetAvailable();
        let Pets = result.data;
        Pets = Pets.filter((pet) => pet.id <= 99999);
        context.getPets(Pets);
        setPets(context.pets);
      } catch (error) {
        console.log("Failed to get pet available: ", error.message);
      }
    };
    getPets();
  }, [pets]);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 6;
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  let currentPets = pets;
  let numberOfPets = pets.length;
  if (pets && pets.length > 0) {
    currentPets = pets.slice(indexOfFirstNews, indexOfLastNews);
    numberOfPets = (pets.length / 6).toFixed();
  }
  const handleClickPage = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      {pets.length > 0 ? (
        <div>
          <ListPet pets={currentPets} />
          <Pagination
            currentPage={currentPage}
            handleClick={handleClickPage}
            numberOfPets={parseInt(numberOfPets)}
          />
        </div>
      ) : (
        <>Loading ...</>
      )}
    </>
  );
}

export default PetOverview;
