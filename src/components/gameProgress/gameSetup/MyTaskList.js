import TaskList from "./taskList";

export default function MyTaskList() {
  return (
    <>
      <div className="headerWrapper">
        <button className="profileBtn">Profile</button>
        <h1 className="title">Select your tasks!</h1>
      </div>
      <TaskList fullList={false} />
      <footer>
        <div className="dailyPet">
          <h3>My pet for today</h3>
          <div className="imgWrapper">
            <img src="canary-happy.png" alt="A canary" className="animal" />
            <div className="changeAnimal">
              <img src="./change-icon.png" alt="A reload icon" />
            </div>
          </div>
          <img
            src="./apple-color.png"
            alt="A red apple"
            className="appleIcon"
          />
          <img
            src="./apple-color.png"
            alt="A red apple"
            className="appleIcon"
          />
          <img
            src="./apple-bw.png"
            alt="A black and white apple"
            className="appleIcon"
          />
          <img
            src="./apple-bw.png"
            alt="A black and white apple"
            className="appleIcon"
          />
        </div>
        <div className="navWrapper">
          <button type="button" className="taskList">
            All tasks
          </button>
          <button type="button" className="customTasks">
            Custom tasks
          </button>
          <button type="button" className="petPick mainBtn">
            Pick pet
          </button>
        </div>
      </footer>
    </>
  );
}
