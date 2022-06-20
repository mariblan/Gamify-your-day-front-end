import applecolor from "../../../images/apple-color.png";
import canary from "../../../images/canary-normal.png";
import hamster from "../../../images/hamster-normal.png";
import tortoise from "../../../images/tortoise-normal.png";
import pets from "./mockanimalsDB";
import "./animalSelection.css";
import renderApples from "../../../utils/generateApples";
import { Link, Outlet } from "react-router-dom";

export default function AnimalSelection() {
  console.log(pets);
  return (
    <>
      <div className="bodyselection">
        <button className="menu" type="menu">
          Menu
        </button>
        <div className="animalselection">
          <div className="petselection">
            <h6 className="pets">Pets</h6>
            <button className="petbtn" id="tortoisebtn">
              <img
                className="petselect"
                id="tortoise"
                src={tortoise}
                alt="tortoise"
              />
            </button>
            <button className="petbtn" id="canarybtn">
              <img
                className="petselect"
                id="canary"
                src={canary}
                alt="canary"
              />
            </button>
            <button className="petbtn" id="hamsterbtn">
              <img
                className="petselect"
                id="hamster"
                src={hamster}
                alt="hamster"
              />
            </button>
          </div>
          <div className="hungerlevel">
            <h6 className="class">Hunger level</h6>
            <div className="petfoodtortoise">
              {renderApples(pets[0].hungerlevel, "applehunger")}
            </div>
            <div className="petfoodcanary">
              {renderApples(pets[1].hungerlevel, "applehunger")}
            </div>
            <div className="petfoodwrap">
              {renderApples(pets[2].hungerlevel, "applehungerwrap")}
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
