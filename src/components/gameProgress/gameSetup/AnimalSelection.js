import "./animalSelection.css";
import { useState, useRef } from "react";
import AnimalSelectionRender from "./animalSelectionRender";
import renderApples from "../../../utils/generateApples";
import { useNavigate } from "react-router-dom";
import { useTask } from "../../../taskContext";

export default function AnimalSelection(index, id) {
  const { pets, selectedPet, setSelectedPet, userSettings } = useTask();
  let animalContainer = useRef();
  const navigate = useNavigate();
  const goToGame = () => setTimeout(navigate("../mytasks"), 150);

  const pickPetClick = ({ target, currentTarget }) => {
    //console.log(target.id);
    for (let i = 1; i < animalContainer.current.children.length; i++) {
      if (currentTarget !== animalContainer.current.children[i])
        animalContainer.current.children[i].className = "petbtn";
    }
    currentTarget.className === "petbtn"
      ? (currentTarget.className = "petbtnactive")
      : (currentTarget.className = "petbtn");
    pets.forEach((pet) => {
      if (pet.name === target.name) {
        setSelectedPet(pet);
      }
      return selectedPet;
    });
    selectedPet && console.log(target);
    selectedPet && console.log(currentTarget);
  };

  const navigateToTasks = () => setTimeout(navigate("/alltasks"), 150);

  return (
    console.log(selectedPet) || (
      <>
        <div className="bodyselection">
          <button className="menu" type="menu" onClick={navigateToTasks}>
            Tasks
          </button>
          <div className="animalselection">
            <div className="petselection" ref={animalContainer}>
              <h6 className="pets">Pets</h6>
              {pets.map((pet, index) => {
                return (
                  <button
                    onClick={pickPetClick}
                    selected={pet.petId}
                    key={pet.id}
                    className={`petbtn`}
                    name={pet.name}
                    id={pet.btn}
                  >
                    <img
                      key={pet.id}
                      className="petselect"
                      id={pet.id}
                      name={pet.name}
                      src={pet.mood[0]}
                      alt={pet.name}
                    />
                  </button>
                );
              })}
            </div>
            <div className="hungerlevel">
              <h6 className="class">Hunger level</h6>
              <div className="petfoodtortoise">
                {renderApples("applehunger", pets[0].hungerlevel)}
              </div>
              <div className="petfoodcanary">
                {renderApples("applehunger", pets[1].hungerlevel)}
              </div>
              <div className="petfoodwrap">
                {renderApples("applehungerwrap", pets[2].hungerlevel)}
              </div>
            </div>
          </div>
          <button className="confirmbtn" onClick={goToGame}>
            My task list
          </button>
        </div>
      </>
    )
  );
}
