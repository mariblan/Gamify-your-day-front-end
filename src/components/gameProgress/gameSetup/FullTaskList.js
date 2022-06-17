import "./taskList.css";
import TaskList from "./taskList";
import searchIcon from "../../../images/search-icon.png";
import { categories } from "../../../utils/categoryCheck";
import { useState } from "react";

export default function AllTasks() {
  const [filter, setFilter] = useState(false);

  const handleClick = (e) => {
    filter === e.target.name ? setFilter(false) : setFilter(e.target.name);
  };

  return (
    <>
      <div className="headerWrapper">
        <button className="profileBtn fadedBtn smallBtn">Profile</button>
        <h1 className="title">Select your tasks!</h1>
        <div className="filterWrapper">
          <ul className="filterCategory">
            {categories.map((category, index) => (
              <li key={index} onClick={handleClick}>
                <img
                  src={category.icon}
                  alt={category.alt}
                  className="categoryIconFilter"
                  name={category.name}
                />
              </li>
            ))}
          </ul>
          <form className="searchWrapper">
            <input
              type="text"
              placeholder="Search Task"
              className="searchInput"
            />
            <button className="searchBtn" onClick={(e) => e.preventDefault()}>
              <img src={searchIcon} alt="A magnifying glass icon" />
            </button>
          </form>
        </div>
      </div>
      <div className="hidden">
        <button className="profileBtn fadedBtn smallBtn">Profile</button>
        <h1 className="title">Select your tasks!</h1>
        <div className="filterWrapper">
          <ul className="filterCategory">
            {categories.map((category, index) => (
              <li key={index}>
                <img
                  src={category.icon}
                  alt={category.alt}
                  className="categoryIconFilter"
                />
              </li>
            ))}
          </ul>
          <form tabIndex="0" className="searchWrapper">
            <input
              type="text"
              placeholder="Search Task"
              className="searchInput"
            />
            <button className="searchBtn" onClick={(e) => e.preventDefault()}>
              <img src={searchIcon} alt="A magnifying glass icon" />
            </button>
          </form>
        </div>
      </div>
      <TaskList fullList={true} filter={filter} />
      <div className="navWrapper">
        <button type="button" className="mainBtn">
          My list
        </button>
      </div>
      <div className="hidden">
        <button type="button" className="mainBtn">
          My list
        </button>
      </div>
    </>
  );
}
