import { useTask } from "../../../taskContext";
import renderApples from "../../../utils/generateApples";
import "./gameOver.css";

export default function GameOver() {
  const { selectedPet, setSelectedPet, logOut } = useTask();
  const continueClick = () => {};

  return (
    <div className="gameoverscreen">
      <button className="menu" onClick={() => logOut()}>
        Log Out
      </button>
      <div className="gameovercontainer">
        <div className="completiontext">
          <h3>{selectedPet.completion} </h3>
        </div>
        <div className="imagesend">
          <img
            src={selectedPet.mood[1]}
            className={selectedPet.name}
            alt={selectedPet.name}
          />
          {selectedPet !== "hamster" ? (
            <div className="applesendwrap">
              {renderApples("applesendwrapimg", selectedPet.hungerlevel)}
            </div>
          ) : (
            <div className="applesend">
              {renderApples("applesendimg", selectedPet.hungerlevel)}
            </div>
          )}
        </div>
      </div>
      <div className="continue">
        <button className="mainBtn">Continue</button>
      </div>
    </div>
  );
}
