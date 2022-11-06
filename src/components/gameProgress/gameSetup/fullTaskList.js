import './taskList.css';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { noFilter } from '../../../images';
import { categories, changeClassName } from '../../../utils';
import TaskList from './taskList';
import { useTask } from '../../../taskContext';

export default function AllTasks() {
  // Initial states for filtering or searching functions for task selection. All filters are false/empty
  // by default, and some dom nodes are selected for purposes of changing styling upon selection.
  const [filter, setFilter] = useState([]);
  // const [searchValue, setSearchValue] = useState("");
  const [sortByFavorite, setSortByFavorite] = useState(false);
  const noFilterBtn = useRef();
  const filterContainer = useRef();
  const navigate = useNavigate();
  const {
    user,
    todaysList,
    userSettings,
    favoriteList,
    canChangePet,
    logOutConfirm,
    disabled,
    setDisabled,
  } = useTask();

  // This checks if there's any filter applied to the task list. If there's no filter selected,
  // the no filter button gets automatically selected again
  useEffect(() => {
    if (filter.length === 0) noFilterBtn.current.className += ' filterSelected';
  }, [filter]);

  // Adds filters to an array so the child component returns only tasks that have the same category
  // as the ones selected. Also disables filtering by favorites.
  const filterByCategory = (e) => {
    setSortByFavorite(false);
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

  useEffect(() => {
    setDisabled(false);
  }, []);

  // Toggles sorting by favorite on and off
  const checkFavorite = (e) => {
    // console.log(`This is the favorites list:`);
    // console.log(favoriteList);
    // console.log(sortByFavorite);
    setFilter([]);
    changeClassName(e, noFilterBtn, filterContainer, true);
    !sortByFavorite ? setSortByFavorite(true) : setSortByFavorite(false);
  };

  const goToMyList = () => {
    canChangePet
      ? setTimeout(() => navigate('../petselection'), 150)
      : setTimeout(() => navigate('../mytasks'), 150);
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
      <nav className='headerWrapper'>
        <h1 className='userWelcome'>Welcome back {user.name}!</h1>
        <button
          className='profileBtn fadedBtn smallButton'
          onClick={() => {
            logOutConfirm();
            setDisabled(true);
          }}
        >
          Log out
        </button>
        <h1 className='title'>Select your tasks!</h1>
        <div className='filterWrapper'>
          <ul className='filterCategory' ref={filterContainer}>
            {/* <li onClick={filterByCategory}> */}
            <li>
              <img
                ref={noFilterBtn}
                src={noFilter}
                alt='An x icon'
                className='categoryIconFilter filterSelected'
                onClick={(e) => {
                  changeClassName(e, noFilterBtn, filterContainer, false);
                  filterByCategory(e);
                  // setSortByFavorite(false);
                  // filterByCategory();
                }}
              />
            </li>
            {categories.map((category, index) => (
              // <li key={index} onClick={filterByCategory}>
              <li key={index}>
                <img
                  src={category.icon}
                  alt={category.alt}
                  className={`categoryIconFilter ${category.name}`}
                  name={category.name}
                  onClick={(e) => {
                    changeClassName(e, noFilterBtn, filterContainer, false);
                    filterByCategory(e);
                    // setSortByFavorite(false);
                    // filterByCategory(e);
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
      <TaskList
        filterSelection={filter}
        // searchValue={searchValue}
        sortByFavorite={sortByFavorite}
        setSortByFavorite={setSortByFavorite}
        // sortByComplete={sortByComplete}
      />
      <div className='navWrapper'>
        <button
          disabled={disabled}
          type='button'
          className='fadedBtn'
          onClick={(e) => checkFavorite(e)}
        >
          Favorites
        </button>
        <button
          disabled={disabled}
          type='button'
          className='mainBtn'
          onClick={goToMyList}
        >
          {canChangePet ? `Select pet` : `My tasks`}
        </button>
        {/* <button type="button" className="mainBtn" onClick={goToMyList}>
          {canChangePet ? `Select pet` : `My tasks`}
        </button> */}
      </div>
    </>
  );
}
