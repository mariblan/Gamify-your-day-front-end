import {
  iconChores,
  iconWork,
  iconSocial,
  iconErrand,
  iconCare,
  iconMisc,
} from '../images';

const categories = [
  {
    name: 'work',
    icon: iconWork,
    alt: 'A suitcase icon',
  },
  {
    name: 'social',
    icon: iconSocial,
    alt: 'A telephone handle icon',
  },
  {
    name: 'errands',
    icon: iconErrand,
    alt: 'An icon of an open package with a location flag',
  },
  {
    name: 'chores',
    icon: iconChores,
    alt: 'A house icon with soap bubbles around',
  },
  {
    name: 'care',
    icon: iconCare,
    alt: 'Icon of a hand holding a drop of blood with a medical cross inside',
  },
  {
    name: 'miscellaneous',
    icon: iconMisc,
    alt: 'A lightbulb shining icon',
  },
];

function checkCategory(name) {
  for (let index of categories) {
    if (index.name === name) return index;
  }
}

export { checkCategory as default, categories };
