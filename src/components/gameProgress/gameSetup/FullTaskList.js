import "./taskList.css";
import TaskList from "./taskList";
import searchIcon from "../../../images/search-icon.png";
import noFilter from "../../../images/nofilter-icon.png";
import { Link, Outlet } from "react-router-dom";
import { categories } from "../../../utils/categoryCheck";
import { useState, useEffect, useRef } from "react";

export default function AllTasks() {
  // Variable that stores an array of strings - the category names the tasks should be filtered by. It
  // starts empty - no filter is in place when the list is first loaded.

  const [filter, setFilter] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortByFavorite, setSortByFavorite] = useState(false);
  const [sortByComplete, setSortByComplete] = useState(false);
  const noFilterBtn = useRef();
  const filterBtns = useRef();

  // !!! This is mostly working. Once the user selects the no filter button, the filter does not
  // deselect any other filters and fails to apply the right class to the no fitler button.
  // Come back to this soon
  const changeClassName = (e) => {
    // First we get the index of the added class on the selected button, on the no filter button,
    // and on all filter buttons that are not the event target.
    const getIndex = e.target.className.indexOf("filterSelected");
    const allBtnsClassIndex =
      filterBtns.current.className.indexOf("filterSelected");
    const noFilterClassIndex =
      noFilterBtn.current.className.indexOf("filterSelected");
    // console.log(noFilterBtn);
    // console.log(filterBtns.current);
    // console.log(noFilterBtn.current);

    // If the target of the event is any filter button apart from the no filter, it checks whether
    // has the filterSelected class. If it does, the class gets removed. If it doesn't, the class
    // gets added, and the no filter button gets its class removed ("deselecting" it).

    if (e.target.className.includes("filterSelected")) {
      e.target.className = e.target.className.substring(0, getIndex);
    } else {
      e.target.className += " filterSelected";
      if (noFilterBtn.current.className.includes("filterSelected")) {
        noFilterBtn.current.className = noFilterBtn.current.className.substring(
          0,
          noFilterClassIndex
        );
      }
    }

    // If the no filter button gets selected, it gains the class, and all other buttons lose the class
    // (getting "deselected").
    if (!e.target.name) {
      e.target.className += " filterSelected";
      filterBtns.current.className.substring(0, allBtnsClassIndex);
    }
  };

  // This checks if there's any filter applied to the task list. If there's no filter selected,
  // the no filter button gets automatically selected again
  useEffect(() => {
    if (filter.length === 0) noFilterBtn.current.className += " filterSelected";
  }, [filter]);

  // Adds filters to an array so the child component returns only tasks that have the same category
  // as the ones selected. Also disables filtering by completion or favorites.
  const filterByCategory = (e) => {
    setSortByFavorite(false);
    setSortByComplete(false);
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
  const checkComplete = () => {
    if (sortByFavorite) setSortByFavorite(false);
    !sortByComplete ? setSortByComplete(true) : setSortByComplete(false);
  };

  // Toggles sorting by favorite on and off
  const checkFavorite = () => {
    if (sortByComplete) setSortByComplete(false);
    !sortByFavorite ? setSortByFavorite(true) : setSortByFavorite(false);
  };

  // handleChange and handleSubmit are meant for the search function (WIP)
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ??? https://stackoverflow.com/questions/62249713/how-to-redirect-and-pass-data-as-props-on-form-submit-in-react
    // ??? It seems to be best to redirect with react router on submit instead of simply filtering the array of task
    // ??? objects. It has likely to do with passing the search as a query for a request and returning only the matches
    // ??? of a db query as the body a response. Ask to confirm.
  };

  return (
    <>
      <nav className="headerWrapper">
        <button className="profileBtn fadedBtn smallBtn">Profile</button>
        <h1 className="title">Select your tasks!</h1>
        <div className="filterWrapper">
          <ul className="filterCategory">
            <li onClick={filterByCategory}>
              <img
                ref={noFilterBtn}
                src={noFilter}
                alt="A cross icon"
                className="categoryIconFilter filterSelected"
                onClick={changeClassName}
              />
            </li>
            {categories.map((category, index) => (
              <li key={index} onClick={filterByCategory}>
                <img
                  ref={filterBtns}
                  src={category.icon}
                  alt={category.alt}
                  className={`categoryIconFilter ${category.name}`}
                  name={category.name}
                  onClick={changeClassName}
                />
              </li>
            ))}
          </ul>
          <form className="searchWrapper" onSubmit={handleSubmit}>
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
          </form>
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
      <TaskList
        filterSelection={filter}
        searchValue={searchValue}
        sortByFavorite={sortByFavorite}
        sortByComplete={sortByComplete}
      />
      <div className="navWrapper">
        <button type="button" className="fadedBtn" onClick={checkFavorite}>
          Favorites
        </button>
        <button type="button" className="fadedBtn" onClick={checkComplete}>
          Completed
        </button>
        <button type="button" className="mainBtn">
          <Link to="/mytasks">My list</Link>
        </button>
      </div>
      <div className="hidden">
        <button type="button" className="mainBtn">
          My list
        </button>
      </div>
      <Outlet />
    </>
  );
}
