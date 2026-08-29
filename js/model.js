/* =====================================================================
   MODEL — the data and state of the app. Never touches the DOM.
   Edit your content here: featured projects, skills, image overrides.
   ===================================================================== */

const Model = {

  githubUser: "Numal400",

  // Where the contact form delivers (via formsubmit.co relay)
  contactEmail: "numaldas500@gmail.com",

  // App state (read/written by the Controller, displayed by the View)
  state: {
    screen: "home",        // which screen is showing
    menuIndex: 0,          // selected item on the home menu
    reposLoaded: false,
    skillsBuilt: false,
  },

  // ---- Featured projects (hand-written, shown above the GitHub feed) ----
  featured: [
    {
      title: "7th SEMESTER PROJECT",
      tag: "Live App", color: "#3dc8ff", live: true,
      url: "https://github.com/Numal400/7th_Semester_Project.git", cta: "View on GitHub →",
      img: "assets/projects/bsl.png",
      desc: "PROJECT FOR ECE",
    },
    {
      title: "OSCILLOSCOPE",
      tag: "NLP", color: "#0064e6",
      url: "https://github.com/Numal400/oscilloscope.git",
      cta: "View on GitHub →",
      img: "assets/projects/steam.png",
      desc: "Code for digital Oscilloscope on Raspberry Pi5",
    },
    {
      title: "IMPORTANT PAGE",
      tag: "Security", color: "#f1e05a",
      url: "https://github.com/Numal400/ImportantByNumal-page.git", cta: "View on GitHub →",
      img: "assets/projects/downloadguard.png",
      desc: "Just a page",
    },
  ],

  // Repos already shown in "featured" get hidden from the GitHub feed
  featuredRepoNames: [
    "7th SEMESTER PROJECT",
    "OSCILLOSCOPE",
    "IMPORTANT PAGE",
  ],

  // Shown if the GitHub API can't be reached
  fallbackRepos: [
    {
      name: "crime-analysis-montgomery-county", language: "Jupyter Notebook", stargazers_count: 0,
      html_url: "https://github.com/Omicron69/crime-analysis-montgomery-county",
      description: "Ten years of Montgomery County crime data, taken from a messy 90 MB government CSV to ten answered analytical questions, geospatial hotspot maps and a district safety ranking.",
    },
    {
      name: "asthma-worsening-prediction", language: "MATLAB", stargazers_count: 0,
      html_url: "https://github.com/Omicron69/asthma-worsening-prediction",
      description: "Predicting worsening asthma symptoms from NHS primary-care data with SQL and MATLAB, following CRISP-DM. Compares four models on a heavily imbalanced clinical dataset.",
    },
    {
      name: "Chronic-Kideney-Disease-Analyzer", language: "PHP", stargazers_count: 0,
      html_url: "https://github.com/Omicron69/Chronic-Kideney-Disease-Analyzer",
      description: "A healthcare tracking web app. I led the front-end and requirements analysis in a multidisciplinary team, and our solution improved patient diagnostics by 25%.",
    },
    {
      name: "MSc-Washington-Crime-Analysis-with-Pandas", language: "Jupyter Notebook", stargazers_count: 0,
      html_url: "https://github.com/Omicron69/MSc-Washington-Crime-Analysis-with-Pandas",
      description: "Crime trend analysis of Washington D.C. public data. Reproducible Pandas notebooks with visual summaries written for people who do not code.",
    },
  ],

  // Optional thumbnail overrides: repo name → image path.
  // Anything not listed is looked up at assets/projects/<RepoName>.png
  projectImages: {
    // "DownloadGuard": "assets/projects/downloadguard.png",
  },

  langColors: {
    JavaScript: "#5c5af1", TypeScript: "#3178c6", Python: "#3572A5",
    PHP: "#4F5D95", CSS: "#663399", HTML: "#e34c26",
    "Jupyter Notebook": "#DA5B0B", MATLAB: "#e16737", Java: "#b07219", C: "#555", "C++": "#f34b7d",
  },

  // ---- Skills screen ----
  skills: [
    { group: "AI · ML", items: [
      ["Python · Java · C++", 50], ["Chat GPT", 88],
      ["Gemini", 86], ["Meshy AI", 85],
      ["NLP & Transformers", 82], ["MediaPipe", 86],
    ]},
    { group: "Cloud & Engineering", items: [
      ["Git & GitHub", 88], ["Azure", 74],
      ["Multisim", 76], ["LT Spice", 80],
      ["Raspberry", 90], ["Bash · PowerShell", 67],
      ["Proteus · Blender", 60],
    ]},
    { group: "Spoken Languages", items: [
      ["English · Assamese · Hindi", 100], ["Japanese (JLPT N4)", 62], ["Russian", 30],
    ]},
  ],

  // ---- Data fetching ----
  async fetchRepos() {
    const skip = new Set(this.featuredRepoNames);
    try {
      const res = await fetch(
        `https://api.github.com/users/${this.githubUser}/repos?per_page=100&sort=updated`
      );
      if (!res.ok) throw new Error(res.status);
      const repos = (await res.json()).filter(r => !r.fork && !skip.has(r.name));
      return { repos, live: true };
    } catch {
      return { repos: this.fallbackRepos.filter(r => !skip.has(r.name)), live: false };
    }
  },
};
