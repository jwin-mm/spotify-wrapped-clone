// 1. The Raw Data (Mock Backend)
export const userData = {
  Employee: "KTW",
  Email: "jthantwin@kittelson.com",
  CustSubGroup: null,
  "Team Chat Messages": null,
  "Team Private Messages": null,
  "Teams Calls": 41,
  "Teams Meetings": 212,
  "Meetings Attended": 212,
  "Teams Audio Time": 120.63,
  "Teams Video Time": 112.67,
  "Screen Sharing Time": 99.93,
  "Proposals Worked On": 1,
  "Proposal Hours": 1.5,
  "Projects Worked On": 13,
  "Project Hours": 428.75,
  "Offices Supported": 9,
  "Markets Supported": 4,
  "Top Clients": [
    "Pennsylvania Department of Transportation",
    "Massachusetts DOT",
    "National Academy of Sciences",
    "North Carolina DOT",
    "Capital Region TPA",
  ],
  "Time with Top Clients": [843300, 325800, 144000, 92700, 69300],
  "Top Supported Markets": [
    "Technology Research and Software",
    "North-Central Florida",
    "Fort Tamiami",
    "National Capital Area",
  ],
  "Time Supporting Top Markets": [1405800, 96300, 31500, 15300],
  "Top Supported Offices": [
    "Software Development",
    "Research/Innovation",
    "Tallahassee",
    "Miami",
    "Orlando",
  ],
  "Time Supporting Top Offices": [1261800, 144000, 69300, 31500, 27000],
  "Top PMs": [
    "Alexandra Jahnle",
    "Bastian Schroeder",
    "Ryan Gallagher",
    "Franco Saraceno",
    "Spencer Maddox",
  ],
  "Time with Top PMs": [1169100, 112500, 92700, 69300, 31500],
  "Top Projects": [
    "PennDOT; FREEVAL-PA/LaneEval FY24 Support",
    "MassDOT FREEVAL Customization",
    "TCRP B-51 Floating Transit Stops",
    "NCDOT Grant Selection Tool",
    "CRTPA LRTP",
  ],
  "Time on Top Projects": [843300, 325800, 112500, 92700, 69300],
};

// 2. The Story Configuration
export const pagesConfig = [
  {
    id: 0,
    type: "welcome",
    title: "Welcome",
  },
  {
    id: 1,
    type: "intro",
    title: "What a year, NAME!",
    content: [
      {
        type: "text",
        text: `In 2025 we celebrated 40 years of Kittelson & Associates.
      That kind of milestone is because of the people behind the work.
      Let's take a look at how you spent your year making a difference!`,
      },
    ],
    animations: ["Flower"],
  },
  {
    id: 2,
    type: "stat-center",
    title: "Project Hours",
    content: [
      { type: "stat", dataKey: "Project Hours" },
      {
        type: "text",
        text: (data) =>
          `You poured ${data["Proposal Hours"]} hours supporting proposal efforts, contributing to ${data["Proposals Worked On"]} proposals throughout the year. 
          That work helped open doors, but that was just the start. 
          You pushed ${data["Projects Worked On"]} authorized projects forward, and dedicated ${data["Project Hours"]} hours bringing them to life.`,
      },
    ],
  },
  {
    id: 3,
    type: "split-right",
    title: "Top 5 Projects",
    content: [
      {
        type: "text",
        text: `You gave your all on every project, but a few stood out as highlights on your journey. 
        These are the projects that defined your year more than any others.`,
      },
      {
        type: "table",
        nameKey: "Top Projects",
        valueKey: "Time on Top Projects",
        tableTitle: "Top Projects",
      },
    ],
  },
  {
    id: 4,
    type: "split-right",
    title: "Top 5 Clients",
    content: [
      {
        type: "text",
        text: `Great projects are built on strong relationships. 
        You partnered with numerous clients this year, and a few of those partnerships were especially significant. 
        Here are the top 5 clients you collaborated with.`,
      },
      {
        type: "table",
        nameKey: "Top Clients",
        valueKey: "Time with Top Clients",
        tableTitle: "Top Clients",
      },
    ],
  },
  {
    id: 5,
    type: "split-left",
    title: "Top 5 PMs",
    content: [
      {
        type: "text",
        text: `None of this work happens alone. 
        It was a team effort with many project managers to deliver thoughtful, high-quality work. 
        Here are the PMs you collaborated with most this year.`,
      },
      {
        type: "table",
        nameKey: "Top PMs",
        valueKey: "Time with Top PMs",
        tableTitle: "Top PMs",
      },
    ],
  },
  {
    id: 6,
    type: "stat-center",
    title: "Teams Data",
    content: [
      {
        type: "text",
        text: "A lot of collaboration and project work happens in small moments.",
      },
      {
        type: "stat",
        dataKey: "Teams Audio Time",
        label: "Collaboration Audio Hours",
      },
      {
        type: "text",
        text: (data) =>
          `You spent ${data["Teams Audio Time"]} in calls keeping projects on track.`,
      },
      {
        type: "stat",
        dataKey: "Teams Video Time",
        label: "Collaboration Video Hours",
      },
      {
        type: "text",
        text: (data) =>
          `You spent ${data["Teams Video Time"]} connecting face-to-face over video.`,
      },
      {
        type: "stat",
        dataKey: "Screen Sharing Time",
        label: "Collaboration Screenshare Hours",
      },
      {
        type: "text",
        text: (data) =>
          `You spent ${data["Screen Sharing Time"]} sharing your screen and navigating through the details.`,
      },
    ],
  },
  {
    id: 7,
    type: "stat-center",
    title: "Reach of Work",
    content: [
      {
        type: "text",
        text: `Your time and expertise reached far beyond your home base. 
              In 2025, you worked with colleagues from multiple offices and supported projects across several markets. 
              You made your mark far and wide!`,
      },
      {
        type: "table",
        nameKey: "Top Supported Markets",
        valueKey: "Time Supporting Top Markets",
        tableTitle: "Top Markets",
      },
      {
        type: "table",
        nameKey: "Top Supported Offices",
        valueKey: "Time Supporting Top Offices",
        tableTitle: "Top Offices",
      },
    ],
  },
  {
    id: 8,
    type: "split-right",
    title: "Final Thoughts",
    content: [
      {
        type: "text",
        text: `All your contributions, big and small, added up to make an incredible year. 
          Thank you for everything you do to keep Kittelson moving forward, NAME!`,
      },
    ],
  },
];
