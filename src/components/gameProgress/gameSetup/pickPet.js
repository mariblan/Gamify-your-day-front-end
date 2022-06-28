import { useEffect, useState } from "react";
import { useTask } from "../../../taskContext";

export default function PickPet({ target, currentTarget }) {
  const { pets, selectedPet, setSelectedPet, userSettings } = useTask();
  //console.log(target.id);
  useEffect(() => {
    pets.forEach((pet) => {
      if (pet.name === target.name) {
        setSelectedPet(pet);
      }
    });
  }, [selectedPet]);
}


export const changePetClass = () => {
 for(let i = 1,  )
  currentTarget.className === "petbtn"
    ? (currentTarget.className = "petbtnactive")
    : (currentTarget.className = "petbtn");
}

selectedPet && console.log(target);
selectedPet && console.log(currentTarget);
selectedPet && console.log(selectedPet);