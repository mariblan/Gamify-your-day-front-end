import "./animalSelection.css";
import { useRef } from "react";
import renderApples from "../../../utils/generateApples";
import { useNavigate } from "react-router-dom";
import { useTask } from "../../../taskContext";

export default function AnimalSelectionRender({ onClick, onChange, selected }) {
  const { pets, selectedPet, setSelectedPet } = useTask();
  // console.log(pets);
  let animalContainer = useRef();
  const navigate = useNavigate();

  const goToGame = () => setTimeout(navigate("../gamego"), 150);

  const selectPet = ({ currentTarget }) => {
    for (let i = 1; i < animalContainer.current.children.length; i++) {
      if (currentTarget !== animalContainer.current.children[i])
        animalContainer.current.children[i].className = "petbtn";
    }
    currentTarget.className === "petbtn"
      ? (currentTarget.className = "petbtnactive")
      : (currentTarget.className = "petbtn");
    //Get pet here
  };

  return (
    <>
      <div className="bodyselection">
        <button className="menu" type="menu">
          Menu
        </button>
        <div className="animalselection">
          <div className="petselection" ref={animalContainer}>
            <h6 className="pets">Pets</h6>
            {pets.map((pet, index) => {
              return (
                <button
                  onClick={selectPet}
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
          Confirm
        </button>
      </div>
    </>
  );
}
