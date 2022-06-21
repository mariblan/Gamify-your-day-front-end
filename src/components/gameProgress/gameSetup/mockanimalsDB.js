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
    completion:
      "The tortoise chomps happily on a couple of apples. You've done well for today!",
  },
  {
    petId: 2,
    name: "canary",
    hungerlevel: 4,
    mood: [canaryNorm, canaryHappy, canarySad],
    completion:
      "The canary sings joyfully, satisfied! You've done an amazing job!",
  },
  {
    petId: 3,
    name: "hamster",
    hungerlevel: 8,
    mood: [tortoiseNorm, tortoiseHappy, tortoiseSad],
    completion:
      "After so many apples, the hamster seems to be finally full as it snoozes peacefully. It wasn't easy but you did it!",
  },
];

export default pets;

// Idea for the future: Add such motivational messages somewhere in the app
//"remember: it's not about what you have to do, but what you've done so far!"
//"remember: be kind to yourself. You deserve the best!"
//"remember: no achievement is too small. Keep it up!"
//"remember: nobody goes through what you go through. Your path is unique. Cherish it!"
//"remember: everything you go through makes you who you are. Celebrate yourself"
