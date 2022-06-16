const taskDB = [
  {
    taskId: 1,
    taskName: "Do the dishes",
    taskTime: {
      minEasy: 1,
      maxEasy: 5,
      minMedium: 6,
      maxMedium: 15,
      minHard: 16,
      maxHard: 30,
    },
    taskDescriptions: {
      easy: "Plates and cutlery for up to two people",
      medium:
        "A full dinner set, a couple pans from cooking a meal, greasy pots and tupperwares",
      hard: "Multiple pans from cooking a big meal, pans requiring scraping, dirty dishes from a party",
    },
    category: "chores",
  },
  {
    taskId: 2,
    taskName: "Declutter",
    taskTime: {
      minEasy: 1,
      maxEasy: 5,
      minMedium: 6,
      maxMedium: 15,
      minHard: 16,
      maxHard: 30,
    },
    taskDescriptions: {
      easy: "Tidy a small room or area",
      medium: "",
      hard: "",
    },
    category: "chores",
  },
  {
    taskId: 3,
    taskName: "Call mom",
    taskTime: {
      minEasy: 1,
      maxEasy: 5,
      minMedium: 6,
      maxMedium: 15,
      minHard: 16,
      maxHard: 30,
    },
    taskDescriptions: {
      easy: "",
      medium: "",
      hard: "",
    },
    category: "social",
  },
  {
    taskId: 4,
    taskName: "Prepare a presentation for work meeting",
    taskTime: {
      minEasy: 1,
      maxEasy: 5,
      minMedium: 6,
      maxMedium: 15,
      minHard: 16,
      maxHard: 30,
    },
    taskDescriptions: {
      easy: "",
      medium: "",
      hard: "",
    },
    category: "work",
  },
  {
    taskId: 5,
    taskName: "Tidy work inbox",
    taskTime: {
      minEasy: 1,
      maxEasy: 3,
      minMedium: 4,
      maxMedium: 10,
      minHard: 11,
      maxHard: 30,
    },
    taskDescriptions: {
      easy: "",
      medium: "",
      hard: "",
    },
    category: "work",
  },
];

const userDB = [
  {
    userId: 1,
    name: "Forgerlil",
    email: "myfakeemail@myfakehost.com",
    password: "notmyrealpassword",
    progress: [],
    favoriteTasks: [4, 2],
    active: true,
  },
];

export { taskDB, userDB };
