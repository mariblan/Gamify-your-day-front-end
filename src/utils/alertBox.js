import { confirm } from "react-confirm-box";

const messages = {
  boxMessage: [
    `Once you start the game you won't be able to select a different pet later on. Would you like to continue?`,
    `If you forfeit the task you will not be able to go back to it and you
  will lose your reward. Are you sure you want to forfeit the task?`,
  ],
  buttonMessage: [`Start!`, `Forfeit`],
};

const options = {
  render: (message, onConfirm, onCancel) => {
    return (
      <div className="react-confirm-box">
        <h4>
          If you forfeit the task you will not be able to go back to it and you
          will lose your reward. Are you sure you want to forfeit the task?
        </h4>
        <button
          className="forfeit"
          onClick={() => {
            onConfirm();
            // navigate("../taskfailure");
          }}
        >
          Forfeit
        </button>
        <button
          className="continue"
          onClick={() => {
            onCancel();
            // setPaused(false);
          }}
        >
          Continue
        </button>
      </div>
    );
  },
};

const popUpBox = async () => {
  // setPaused(true);
  // setForfeited(true);
  return await confirm("Are you sure?", options);
};

export default popUpBox;

// WIP, come back to this whenever possible
