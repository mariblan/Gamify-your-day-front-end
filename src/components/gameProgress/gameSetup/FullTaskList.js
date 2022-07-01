import "./taskList.css";
import { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import searchIcon from "../../../images/search-icon.png";
import noFilter from "../../../images/nofilter-icon.png";
import { categories } from "../../../utils/categoryCheck";
import changeClassName from "../../../utils/filterBtnsClassChange";
import TaskList from "./taskList";
import { useTask } from "../../../taskContext";

export default function AllTasks() {
  // Initial states for filtering or searching functions for task selection. All filters are false/empty
  // by default, and some dom nodes are selected for purposes of changing styling upon selection.
  const [filter, setFilter] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortByFavorite, setSortByFavorite] = useState(false);
  // const [sortByComplete, setSortByComplete] = useState(false);
  const noFilterBtn = useRef();
  let filterContainer = useRef();
  const navigate = useNavigate();
  const { favoriteList, logOut } = useTask();

  // This checks if there's any filter applied to the task list. If there's no filter selected,
  // the no filter button gets automatically selected again
  useEffect(() => {
    if (filter.length === 0) noFilterBtn.current.className += " filterSelected";
  }, [filter]);

  // Adds filters to an array so the child component returns only tasks that have the same category
  // as the ones selected. Also disables filtering by completion or favorites.
  const filterByCategory = (e) => {
    setSortByFavorite(false);
    // setSortByComplete(false);
    // If the button that has no name is selected for the filter selection to be cleared,
    // the filtering array is set to empty
    if (!e.target.name) return setFilter([]);
    // Then the filter array is checked whether the chosen filter is already being used (by being present
    // in the filter array
    filter.includes(e.target.name)
      ? // If it is, then the category is spliced/filtered off the array, deselecting the filter)
        setFilter((prev) => {
          // ??? Splicing was working but for some reason was running twice (when console.logging it ran
          // ??? once on the file, and once on react_devtools_backend). Why?
          // const spliceOff = prev.indexOf(e.target.name);
          // prev.splice(spliceOff, 1);
          return prev.filter((eachCategory) => eachCategory !== e.target.name);
        })
      : // If it is not, then the filter is added to the array (first checking whether the array is empty
        // to see if there is a previous value to be maintained).
        setFilter((prev) => {
          if (prev.length >= 1) {
            return [...prev, e.target.name];
          } else {
            return [e.target.name];
          }
        });
  };

  // Toggles sorting by completion on and off
  // const checkComplete = () => {
  //   setFilter([]);
  //   if (sortByFavorite) setSortByFavorite(false);
  //   !sortByComplete ? setSortByComplete(true) : setSortByComplete(false);
  // };

  // Toggles sorting by favorite on and off
  const checkFavorite = () => {
    console.log(favoriteList);
    setFilter([]);
    // if (sortByComplete) setSortByComplete(false);
    !sortByFavorite ? setSortByFavorite(true) : setSortByFavorite(false);
  };

  const goToMyList = () => {
    setTimeout(() => navigate("../petselection"), 150);
  };

  // // handleChange and handleSubmit are meant for the search function (WIP)
  // const handleChange = (e) => {
  //   setSearchValue(e.target.value);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // ??? https://stackoverflow.com/questions/62249713/how-to-redirect-and-pass-data-as-props-on-form-submit-in-react
  //   // ??? It seems to be best to redirect with react router on submit instead of simply filtering the array of task
  //   // ??? objects. It has likely to do with passing the search as a query for a request and returning only the matches
  //   // ??? of a db query as the body a response. Ask to confirm.
  // };

  return (
    <>
      <nav className="headerWrapper">
        <button
          className="profileBtn fadedBtn smallButton"
          onClick={() => logOut()}
        >
          Log out
        </button>
        <h1 className="title">Select your tasks!</h1>
        <div className="filterWrapper">
          <ul className="filterCategory" ref={filterContainer}>
            <li onClick={filterByCategory}>
              <img
                ref={noFilterBtn}
                src={noFilter}
                alt="A cross icon"
                className="categoryIconFilter filterSelected"
                onClick={(e) => {
                  changeClassName(e, noFilterBtn, filterContainer);
                  setSortByFavorite(false);
                  // setSortByComplete(false);
                  // filterByCategory();
                }}
              />
            </li>
            {categories.map((category, index) => (
              <li key={index} onClick={filterByCategory}>
                {/* <li key={index}> */}
                <img
                  src={category.icon}
                  alt={category.alt}
                  className={`categoryIconFilter ${category.name}`}
                  name={category.name}
                  onClick={(e) => {
                    changeClassName(e, noFilterBtn, filterContainer);
                    setSortByFavorite(false);
                    // setSortByComplete(false);
                    // filterByCategory();
                  }}
                />
              </li>
            ))}
          </ul>
          {/* <form className="searchWrapper" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search Task"
              className="searchInput"
              value={searchValue}
              onChange={handleChange}
            />
            <button className="searchBtn">
              <img src={searchIcon} alt="A magnifying glass icon" />
            </button>
          </form> */}
        </div>
      </nav>
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
          {/* <form className="searchWrapper">
            <input
              type="text"
              placeholder="Search Task"
              className="searchInput"
            />
            <button className="searchBtn" onClick={(e) => e.preventDefault()}>
              <img src={searchIcon} alt="A magnifying glass icon" />
            </button>
          </form> */}
        </div>
      </div>
      <TaskList
        filterSelection={filter}
        searchValue={searchValue}
        sortByFavorite={sortByFavorite}
        // sortByComplete={sortByComplete}
      />
      <div className="navWrapper">
        <button type="button" className="fadedBtn" onClick={checkFavorite}>
          Favorites
        </button>
        {/* <button type="button" className="fadedBtn" onClick={checkComplete}>
          Completed
        </button> */}
        <button type="button" className="mainBtn" onClick={goToMyList}>
          Select pet
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
