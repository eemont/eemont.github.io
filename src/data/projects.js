export const projects = [
  {
    title: "PC Build Generator",
    description:
      "PC Build Generator is a full-stack web application that helps users create and customize PC builds based on budget or component selection.",
    details:
      "A full-stack web application where users can either enter a budget to receive recommended component combinations, or manually select individual parts with live compatibility validation. The backend is powered by Node.js connected to a Supabase PostgreSQL database that stores component specs and pricing, with the frontend deployed on Vercel via a CI/CD pipeline.",
    features: [
      "Budget-based or manual component selection",
      "Real-time compatibility checking between parts",
      "Supabase PostgreSQL database for component catalog",
      "Automated CI/CD deployment via GitHub Actions to Vercel",
    ],
    tags: ["React", "Vite", "NodeJS", "Supabase", "Vercel", "PostgreSQL", "HTML", "CSS", "CI/CD"],
    links: {
      live: "https://pc-bg.vercel.app/",
      code: "https://github.com/eemont/PC-Build-Generator",
    },
    image: "/projects/PCBG_LOGO.webp",
  },
  {
    title: "LEXER",
    description:
      "Project is a data processing application that reads data from an input .txt file, processes the data, removes excess space and comments from the code, tokenizes the remaining code, and prints the output in a tabular format.",
    details:
      "A lexical analyzer built in C++ as part of a compiler design course. It implements the first phase of a compiler pipeline: reading raw source code, stripping noise (comments, whitespace), and emitting a structured token table. The live demo runs via GitHub Pages using WebAssembly.",
    features: [
      "Reads and tokenizes source code from .txt input files",
      "Strips block and inline comments and excess whitespace",
      "Classifies tokens into types — identifiers, operators, literals, keywords",
      "Outputs results in a clean tabular format",
    ],
    tags: ["C++"],
    links: {
      live: "https://eemont.github.io/cpsc323-project1/",
      code: "https://github.com/eemont/cpsc323-project1",
    },
    image: "/projects/LexicalAnalyzerPNG.webp",
  },
  {
    title: "Planify",
    description:
      "A Web Application that allows users to input their schedule. Once everyone adds their schedules, the program will output a finalized schedule with everyone's schedule merged together. It will display everyone's availability, for when everyone can see each other.",
    details:
      "A cross-platform mobile application built with Flutter and Firebase designed to solve the classic group scheduling problem. Each user inputs their weekly availability and the app surfaces a merged view showing exactly when everyone is free — making it easy to coordinate study sessions, meetups, or team syncs.",
    features: [
      "Multi-user schedule input with individual profiles",
      "Merged group availability view",
      "Real-time sync powered by Firebase",
      "Cross-platform support for iOS and Android via Flutter",
    ],
    tags: ["Flutter", "Firebase", "Dart", "XCode", "Android Studio", "Figma"],
    links: {
      live: "",
      code: "https://github.com/eemont/Planify",
    },
    image: "/projects/planify_appicon.webp",
  },
  {
    title: "FlexFit",
    description:
      "An application that allows users to figure out their BMR and BMI while at the same time saving it into their personal profile. Not only that but also allowing users to discover exercises needed to work out the muscle they desire.",
    details:
      "A native iOS fitness companion built with SwiftUI. Users enter their stats to calculate BMR (Basal Metabolic Rate) and BMI, which are saved to their profile for progress tracking over time. The app also includes a muscle-targeted exercise browser so users can find the right exercises for the muscle group they want to train.",
    features: [
      "BMR and BMI calculator with personal profile storage",
      "Historical metric tracking across sessions",
      "Muscle-targeted exercise discovery browser",
      "Native iOS design built with SwiftUI",
    ],
    tags: ["XCode", "SwiftUI", "iOS", "Figma"],
    links: {
      live: "",
      code: "https://github.com/jainharshul/FlexFit",
    },
    image: "/projects/flexfit_appicon.webp",
  },
];
