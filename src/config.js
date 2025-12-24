
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
  "Teams Audio Time": 434275,
  "Teams Video Time": 405604,
  "Screen Sharing Time": 359731,
  "Proposals Worked On": 1,
  "Proposal Hours": 1.5,
  "Projects Worked On": 13,
  "Project Hours": 428.75,
  "Offices Supported": 9,
  "Markets Supported": 4,
  "Top Supported Markets": [
    "Technology Research and Software",
    "North-Central Florida",
    "Fort Tamiami",
    "National Capital Area"
  ],
  "Time Supporting Top Markets": [
    1405800,
    96300,
    31500,
    15300
  ],
  "Top Supported Offices": [
    "Software Development",
    "Research/Innovation",
    "Tallahassee",
    "Miami",
    "Orlando"
  ],
  "Time Supporting Top Offices": [
    1261800,
    144000,
    69300,
    31500,
    27000
  ],
};

// 2. The Story Configuration
export const pagesConfig = [
  {
    id: 0,
    type: 'intro',       
    title: "What a year!",
    subtitle: `In 2025 we celebrated 40 years of Kittelson & Associates.
      That kind of longevity is built by the people behind the work.`,
  },
  {
    id: 1,
    type: 'stat-big',
    dataKey: 'totalMessages',
    title: "Something Something",
    subtitle: "Something something?",
  },
  {
    id: 2,
    type: 'split-right',
    dataKey: 'Teams Video Time',
    title: "Minutes on Video",
    subtitle: "Been busy calling...",
  },
  {
    id: 3,
    type: 'stat-center',
    dataKey: 'Meetings Attended',
    title: "Meetings Attended",
    subtitle: "You live for the meetings",
  },
  {
    id: 4,
    type: 'outro',
    title: `All your contributions, big and small, added up to make an incredible year. \n
      Thank you for everything you do to keep Kittelson moving forward.`,
    subtitle: "",
  }
];