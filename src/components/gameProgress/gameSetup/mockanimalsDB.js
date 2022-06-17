import canaryNorm from "../../../images/canary-normal.png";
import canaryHappy from "../../../images/canary-happy.png";
import canarySad from "../../../images/canary-sad.png";
import hamsterNorm from "../../../images/hamster-normal.png";
import hamsterHappy from "../../../images/hamster-happy.png";
import hamsterSad from "../../../images/hamster-sad.png";
import tortoiseNorm from "../../../images/tortoise-normal.png";
import tortoiseHappy from "../../../images/tortoise-happy.png";
import tortoiseSad from "../../../images/tortoise-sad.png";

const pets = [
  {
    petId: 1,
    name: "tortoise",
    hungerlevel: 2,
    mood: [hamsterNorm, hamsterHappy, hamsterSad],
  },
  {
    petId: 2,
    name: "canary",
    hungerlevel: 4,
    mood: [canaryNorm, canaryHappy, canarySad],
  },
  {
    petId: 3,
    name: "hamster",
    hungerlevel: 8,
    mood: [tortoiseNorm, tortoiseHappy, tortoiseSad],
  },
];

export default pets;
