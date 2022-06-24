import "./animalSelection.css";
import renderApples from "../../../utils/generateApples";
import { Link, Outlet } from "react-router-dom";
import { useTask } from "../../../taskContext";

export default function AnimalSelectionRender({ onClick, onChange, selected }) {
  const { pets, selectedPet, setSelectedPet } = useTask();
  // console.log(pets);
  return (
    <>
      <div className="bodyselection">
        <button className="menu" type="menu">
          Menu
        </button>
        <div className="animalselection">
          <div className="petselection">
            <h6 className="pets">Pets</h6>
            {pets.map((pet, index) => {
              return (
                <button
                  onClick={onClick}
                  selected={selected.includes(item.id)}
                  key={pet.id}
                  className={petClicked ? "petbtnactive" : "petbtn"}
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
            {/* <button className="petbtn" id="tortoisebtn">
              <img
                className="petselect"
                id={pets[0].name}
                src={pets[0].mood[0]}
                alt={pets[0].name}
              />
            </button>
            <button className="petbtn" id="canarybtn">
              <img
                className="petselect"
                id={pets[1].name}
                src={pets[1].mood[0]}
                alt={pets[1].name}
              />
            </button>
            <button className="petbtn" id="hamsterbtn">
              <img
                className="petselect"
                id={pets[2].name}
                src={pets[2].mood[0]}
                alt={pets[2].name}
              />
            </button> */}
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
        <button className="confirmbtn">
          <Link to="/gamego">Confirm</Link>
        </button>
      </div>
      <Outlet />
    </>
  );
}
