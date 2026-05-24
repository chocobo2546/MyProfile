export type Platform = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Target = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
};

export const CONFIG = {
  worldWidth: 4000,

  deadZoneLeft: 200,
  deadZoneRight: 400,

  speed: 5,
  sprintMultiplier: 2,

  gravity: 0.4,
  jumpForce: 12,
  groundY: 50,

  playerWidth: 50,
  playerHeight: 50,

  spawnX: 200,
  spawnY: 200,

  // =====================================================
  // PLATFORMS
  // =====================================================

  platforms: [
    // spawn area
    { x: 0, y: 0, width: 600, height: 50 },

    // tutorial path
    // { x: 250, y: 120, width: 120, height: 20 },
    // { x: 420, y: 200, width: 120, height: 20 },
    { x: 500, y: 150, width: 500, height: 20 },

    // backend section
    // { x: 900, y: 120, width: 180, height: 20 },
    { x: 1200, y: 220, width: 100, height: 20 },
    { x: 1300, y: 300, width: 100, height: 20 },
    { x: 1400, y: 380, width: 390, height: 20 },

    // frontend section
    // { x: 1450, y: 120, width: 180, height: 20 },
    { x: 1650, y: 260, width: 200, height: 20 },

    // tools section
    { x: 2100, y: 120, width: 1000, height: 20 },

    // experience path
    { x: 3200, y: 250, width: 180, height: 20 },
    { x: 3600, y: 160, width: 200, height: 20 },
    // { x: 2800, y: 320, width: 180, height: 20 },

    // higher jump area
    // { x: 3200, y: 180, width: 160, height: 20 },
    // { x: 3450, y: 300, width: 160, height: 20 },

    // final section
    // { x: 3900, y: 120, width: 220, height: 20 },
    // { x: 4300, y: 220, width: 220, height: 20 },

    // ending
    // { x: 4700, y: 120, width: 300, height: 20 },
  ] as Platform[],

  // =====================================================
  // TARGETS
  // =====================================================

  targets: [
    // =================================================
    // START
    // =================================================

    {
      id: "Welcome",
      x: 200,
      y: 70,
      width: 25,
      height: 25,
      text:
        "Welcome!\n\n" +
        "This game-style page is my interactive portfolio.\n" +
        "You can explore my skills, projects,\n" +
        "and experience by moving through the world.",
    },

    {
      id: "Controls",
      x: 320,
      y: 70,
      width: 25,
      height: 25,
      text:
        "Controls\n\n" +
        "A : Move Left\n" +
        "D : Move Right\n" +
        "Space : Jump\n" +
        "Shift : Sprint\n" +
        "S : Drop Through Platform",
    },

    {
      id: "ArrowUp",
      x: 550,
      y: 70,
      width: 25,
      height: 25,
      text:
        "UP",
    },

    // // =================================================
    // // BACKEND
    // // =================================================

    {
      id: "Backend",
      x: 600,
      y: 200,
      width: 25,
      height: 25,
      text:
        "Backend Skills\n\n" +
        "Node.js, Python, Java, C#\n\n" +
        "Frameworks:\n" +
        "Spring Boot\n" +
        "Express.js\n" +
        "FastAPI\n" +
        "Django\n" +
        "ASP.NET",
    },

    {
      id: "Database",
      x: 700,
      y: 200,
      width: 25,
      height: 25,
      text:
        "Database Skills\n\n" +
        "PostgreSQL\n" +
        "MySQL\n" +
        "SQLite\n\n" +
        "Experience designing relational databases\n" +
        "for web applications.",
    },

    {
      id: "ArrowJump",
      x: 900,
      y: 200,
      width: 25,
      height: 25,
      text:"Shift Hold And Jump",
    },

    // // =================================================
    // // FRONTEND
    // // =================================================

    {
      id: "Frontend",
      x: 1500,
      y: 420,
      width: 25,
      height: 25,
      text:
        "Frontend Skills\n\n" +
        "React\n" +
        "Vue\n" +
        "Angular\n" +
        "Vite\n" +
        "TypeScript\n" +
        "JavaScript\n" +
        "HTML / CSS",
    },

    // {
    //   id: "UILibrary",
    //   x: 1700,
    //   y: 300,
    //   width: 25,
    //   height: 25,
    //   text:
    //     "UI & Tools\n\n" +
    //     "Tailwind CSS\n" +
    //     "Bootstrap\n" +
    //     "Material UI\n" +
    //     "Vite",
    // },

    // // =================================================
    // // TOOLS
    // // =================================================

    {
      id: "ArrowDown",
      x: 1750,
      y: 420,
      width: 25,
      height: 25,
      text:"Press S To Drop",
    },


    {
      id: "Tools",
      x: 1750,
      y: 300,
      width: 25,
      height: 25,
      text:
        "Tools & Workflow\n\n" +
        "Git\n" +
        "GitHub\n" +
        "GitLab\n" +
        "Docker\n" +
        "GitHub Actions",
    },

    // // =================================================
    // // EXPERIENCE
    // // =================================================

    {
      id: "WorkExperience",
      x: 2200,
      y: 160,
      width: 25,
      height: 25,
      text:"This my work experience"
    },

    {
      id: "BeerTaxonomy",
      x: 2500,
      y: 160,
      width: 25,
      height: 25,
      text:
        "Project : Beer Taxonomy\n\n" +
        "A project for collecting and organizing\n" +
        "beer information using uploaded photos.",
    },

    {
      id: "SupplierDashboard",
      x: 2700,
      y: 160,
      width: 25,
      height: 25,
      text:
        "Project : Search Supplier\n\n" +
        "Dashboard system for analyzing\n" +
        "products and user data.",
    },

    {
      id: "CarCheckList",
      x: 2900,
      y: 160,
      width: 25,
      height: 25,
      text:
        "Project : Car Check List\n\n" +
        "A system that helps employees inspect\n" +
        "car conditions faster and easier.",
    },

    // // =================================================
    // // MACHINE LEARNING
    // // =================================================

    {
      id: "UsedCarPrediction",
      x: 3300,
      y: 280,
      width: 25,
      height: 25,
      text:
        "Project : Used Car Price Prediction\n\n" +
        "Machine learning project for predicting\n" +
        "used car prices using mathematical models.",
    },


    // // =================================================
    // // FINAL
    // // =================================================


    // {
    //   id: "Contact",
    //   x: 4380,
    //   y: 260,
    //   width: 25,
    //   height: 25,
    //   text:
    //     "Thank you for visiting!\n\n" +
    //     "Feel free to explore my repositories\n" +
    //     "and projects on GitHub.",
    // },

    {
      id: "End",
      x: 3700,
      y: 200,
      width: 25,
      height: 25,
      text:
        "End of Portfolio\n\n" +
        "Thank you for playing and exploring\n" +
        "my interactive portfolio!",
    },

    // // =================================================
    // // GUIDE ARROWS
    // // =================================================

    // {
    //   id: "Arrow1",
    //   x: 520,
    //   y: 80,
    //   width: 20,
    //   height: 20,
    //   text: "→ Continue Forward",
    // },

    // {
    //   id: "Arrow2",
    //   x: 1350,
    //   y: 80,
    //   width: 20,
    //   height: 20,
    //   text: "→ Frontend Section",
    // },

    // {
    //   id: "Arrow3",
    //   x: 2200,
    //   y: 80,
    //   width: 20,
    //   height: 20,
    //   text: "→ Experience Section",
    // },

    // {
    //   id: "Arrow4",
    //   x: 3100,
    //   y: 80,
    //   width: 20,
    //   height: 20,
    //   text: "↑ Jump Higher",
    // },

    // {
    //   id: "Arrow5",
    //   x: 3850,
    //   y: 80,
    //   width: 20,
    //   height: 20,
    //   text: "→ Final Area",
    // },
  ] as Target[],
};