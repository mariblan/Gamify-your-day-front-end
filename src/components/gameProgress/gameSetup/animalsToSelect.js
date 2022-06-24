import "./animalSelection.css";
import renderApples from "../../../utils/generateApples";
import { Link, Outlet } from "react-router-dom";
import { useTask } from "../../../taskContext";

export default function AnimalsToSelect() {
  const { pets } = useTask();
  console.log(pets);
  return (
    <>
      {pets.map((pet, index) => {
        return (
          <button
            className={petClicked ? "petbtnActive" : "petbtn"}
            id={pet.btn}
          >
            <img
              className="petselect"
              id={pet.name}
              src={pet.mood[0]}
              alt={pet.name}
            />
          </button>
        );
      })}
    </>
  );
}
