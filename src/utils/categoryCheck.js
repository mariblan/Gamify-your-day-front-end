import iconChores from "../images/chores-icon.png";
import iconWork from "../images/work-icon.png";
import iconSocial from "../images/social-icon.png";
// Missing errands and misc icons!!!

export default function checkCategory(name) {
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

  for (let index of categories) {
    if (index.name === name) return index;
  }
}
