import { useState } from "react";
import AnimalSelectionRender from "./animalSelectionRender";
import { useTask } from "../../../taskContext";

export default function AnimalSelection(index, id) {
  const { pets, selectedPet, setSelectedPet } = useTask();
  //const [petClicked, setPetClicked] = useState(false);
  const [selected, setSelected] = useState([]);
  const pickPetClick = ({ target, currentTarget }, index) => {
    //console.log(target.id);
    pets.forEach((pet) => {
      if (pet.name === target.name) {
        setSelectedPet(pet);
      }
    });
    const handleChange = (id) => {
      const foundPet = pets.find((pet) => pet.petId === id);
      if (found) {
        setPet;
      }
    };

    console.log(target);
    console.log(currentTarget);
    console.log(pets.petClicked);
  };
  return (
    console.log(selectedPet) || (
      <>
        <AnimalSelectionRender
          petClicked={pets.petClicked}
          onClick={pickPetClick}
          onChange={handleChange}
        />
      </>
    )
  );
}
