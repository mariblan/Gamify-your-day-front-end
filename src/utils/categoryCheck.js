import iconChores from "../images/chores-icon.png";
import iconWork from "../images/work-icon.png";
import iconSocial from "../images/social-icon.png";
// Missing errands and misc icons!!!

const categories = [
  {
    name: "work",
    icon: iconWork,
    alt: "A suitcase icon",
  },
  {
    name: "social",
    icon: iconSocial,
    alt: "A telephone handle icon",
  },
  {
    name: "errands",
    icon: iconSocial,
    alt: "An icon of an open package with a location flag",
  },
  {
    name: "chores",
    icon: iconChores,
    alt: "A house icon with soap bubbles around",
  },
  {
    name: "miscellaneous",
    icon: iconSocial,
    alt: "A bell icon",
  },
];

// categories[???].name = work?

function categoryCheck(type) {
  let icon = {};
  switch (type) {
    case "work":
      icon = categories.work;
      break;
    case "social":
      icon = categories.social;
      break;
    case "errands":
      icon = categories.errands;
      break;
    case "chores":
      icon = categories.chores;
      break;
    default:
      icon = categories.misc;
      break;
  }
  return icon;
}

export { categoryCheck as default, categories };
