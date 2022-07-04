// FonClick function to change the class name of the target (meant only for the filter buttons)
const changeClassName = (e, noFilterBtn, filterContainer, sortedByFavorite) => {
  // First we get the index of the added class on the selected button, on the no filter button,
  // and on all filter buttons that are not the event target.
  const getIndex = e.target.className.indexOf("filterSelected");
  const noFilterClassIndex =
    noFilterBtn.current.className.indexOf("filterSelected");

  // If the no filter button gets selected, it gains the class, and all other buttons lose the class
  // (getting "deselected").

  if (!e.target.name || sortedByFavorite) {
    console.log(sortedByFavorite);
    for (let i = 1; i < filterContainer.current.children.length; i++) {
      let iconClass = filterContainer.current.children[i].children[0].className;
      console.log(iconClass);
      if (iconClass.includes("filterSelected")) {
        let getClassIndex = iconClass.indexOf("filterSelected");
        filterContainer.current.children[i].children[0].className =
          iconClass.substring(0, getClassIndex - 1);
      }
    }

    if (!sortedByFavorite && !e.target.className.includes("filterSelected")) {
      e.target.className += " filterSelected";
    }
    return;
  }

  // If any other filter is selected, the no filter button gets deselected and the selected
  // button gains the class
  if (e.target.className.includes("filterSelected")) {
    e.target.className = e.target.className.substring(0, getIndex - 1);
  } else {
    e.target.className += " filterSelected";
    if (noFilterBtn.current.className.includes("filterSelected")) {
      noFilterBtn.current.className = noFilterBtn.current.className.substring(
        0,
        noFilterClassIndex - 1
      );
    }
  }
};

export { changeClassName as default };

/*
Currently the filter works like:

No filter is applied upon load
If any filter by category is selected, it filters by category of the task
If at any point of filtering the favorite filter is selected, the category
filter is cleared and all favorites show at the top of the screen.
If the no filter is selected when favorites selection is on, it returns to no
filtering.
However, when going from filtering favorites to filter any category, it is as if
the no filter had been selected instead of filtering by the selected category
But upon selecting a second category filter it filters by category as normal
The array of categories is built normally.
Also, having multiple selected filters then clicking upon filter does not remove
the selection on the multiple filters (though it adds the class on the no filter
btn)
*/
