import { useTask } from "../../../taskContext";
import renderApples from "../../../utils/generateApples";
import "./gameOver.css";
import { useNavigate } from "react-router-dom";

export default function GameOver() {
  const {
    selectedPet,
    setSelectedPet,
    logOut,
    gameFinalScreen,
    setGameFinalScreen,
  } = useTask();

  const navigate = useNavigate();

  const continueClick = () => {
    setGameFinalScreen(false);
    navigate("../gamego");
  };

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
        <button onClick={continueClick} className="mainBtn">
          Continue
        </button>
      </div>
    </div>
  );
}
