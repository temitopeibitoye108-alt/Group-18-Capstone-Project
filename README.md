# Group 18 Capstone Project: Planet

TS Academy Frontend Development capstone (Hajime cohort). Planet is a small web app that
recreates the Capstone mockup by [Amaka N](https://amakandukwu.com) in HTML, CSS and JavaScript. Search for a
planet to see its photo and key facts, fetched live from the planet API, and compare the planets of
the solar system in the facts table. The site has light and dark modes and adapts to desktop,
tablet and mobile.

**Live site:** _TODO: add the deployment link_

## Features

- **Planet search.** Type a planet name (or the start of one, e.g. "mar") and press Search. The
  card shows the planet's name, image, type, distance from the Sun, mass, diameter, orbital
  period, temperature, gravity, number of moons and description.
- **Live data with the Fetch API.** Planet data comes from
  `https://anurella.github.io/json/planet.json`. It is downloaded once, then reused for every search.
- **Light and dark mode.** The Dark/Light switch in the header changes the whole page.
- **Responsive layout.** Desktop, tablet and mobile layouts follow the mockup. On mobile the card
  stacks, and the table drops the Mass column to fit.
- **Planetary facts table.** Mass and diameter of each planet, from the
  [NASA Planetary Fact Sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/).

## Team

| Name | GitHub |
|---|---|
| Rebecca Ibitoye (team lead) | [@temitopeibitoye108-alt](https://github.com/temitopeibitoye108-alt) |
| Emmanuel Augustine Akpan | _TODO_ |
| Edeh Joshua Nduka | _TODO_ |
| Oka Chibuike Samuel | [@SamuelOka](https://github.com/SamuelOka) |
| Omotayo Oluwatosin | _TODO_ |
| Daniel Obialo | _TODO_ |
| Carrena Oladipupo | [@Liliano58](https://github.com/Liliano58) |
| Nwosu Benjamin | _TODO_ |
| Ogunkunke Benjamin | _TODO_ |
| Igomu Favour | _TODO_ |
| Adejoh Agnes | [@adejohagnes64-ops](https://github.com/adejohagnes64-ops) |

## Components and who worked on them

Each component lives in its own folder with its own HTML and CSS. The table below is based on
the commit history.

| Component | Folder | Worked on by |
|---|---|---|
| Navbar: logo, light/dark switch, search bar | `header/` | Adejoh Agnes |
| Planet card: fetches and shows planet data | `planet-card/` | Emmanuel Augustine Akpan, iambenjaminlux |
| Planetary facts table | `planet-table/` | Carrena Oladipupo |
| Footer: About and credits | `footer/` | iambenjaminlux |
| Page assembly and theme | `index.html`, `include.js`, `style.css` | _TODO_ |

## Project structure

```
index.html            Page shell: include.js fills in each component
include.js            Loads each component's HTML into index.html
style.css             Shared colours (light and dark theme), fonts and page width
logo_black.png
header/               header.html, header.css
planet-card/          planet-card.html, planet-card.css, planet-card.js
planet-table/         planet-table.html, planet-table.css
footer/               footer.html, footer.css
```

`index.html` is put together from the component files. Each `<div data-include="...">` is
replaced with the elements marked `data-component` in that component's HTML file. To change a
section, edit its component file, not `index.html`. Every component file is also a complete page
you can open on its own while working on it.

## Running the project locally

The page loads its components with `fetch()`, which browsers block for files opened straight from
disk. Run it through a local web server:

1. Clone the repository:

   ```bash
   git clone https://github.com/temitopeibitoye108-alt/Group-18-Capstone-Project.git
   cd Group-18-Capstone-Project
   ```

2. Start a local server, using either option:
   - **VS Code:** install the **Live Server** extension, right-click `index.html` and choose
     **Open with Live Server**.
   - **Node.js:** run `npx serve .` and open the address it prints.

There is no build step or install. It is plain HTML, CSS and JavaScript.

## Deployment

The site is static, so it can be hosted on Netlify, Vercel or GitHub Pages without a build step.
Use the repository root as the publish directory and leave the build command empty.

## Credits

- Design: [Amaka N](https://amakandukwu.com)
- Course: [TS Academy](https://tsacademyonline.com/)
# Group-18-Capstone-Project
TS Academy Frontend Development Capstone Project - Planet Web Application
Project Overview- The Planet Web Application is a responsive web application that allows users to explore planets and view planet information through an interactive and user-friendly interface.
## Features
- Planet information display
- Theme toggle (Light/Dark Mode)
- Responsive design for all devices
- Interactive user experience
- Modern and clean user interface
   ## Technologies Used
- HTML5
- CSS3
- JavaScript
- Git
- GitHub
 ## 👥 Team Members and Contributions
- Rebecca Ibitoye (Team Lead)-Led project planning and coordination, managed repository activities, reviewed team contributions, merged completed features into the main branch, participated in testing, and prepared project documentation.
- Oka Chibuikem Samuel (Assistant Team Lead)-Supported project coordination, monitored task progress, assisted with team communication, participated in testing, and supported the review process.
- Igomu Favour- Developed the Navigation Bar component.
- Agnes-Contributed to the development and improvement of the Navigation Bar component.
- Emmanuel Augustine Akpan-Developed the Planet Card components
-Omotayo Oluwatosin-Contributed to the development of the Planet Card component.
- Carrena Oladipupo-Developed the Table section.
- Nwosu Benjamin-Footer component.
-  Edeh Joshua Nduka- Contributed to project development and team collaboration.
- Daniel Obialo-Contributed to project development and team collaboration.
- Ogunkunle Benjamin-Contributed to project development and team collaboration.
-Testing and Quality Assurance
Rebecca Ibitoye (Team Lead) and Oka Chibuikem Samuel (Assistant Team Lead) conducted testing and quality assurance. This involved reviewing implemented features, identifying and resolving issues, verifying responsiveness across devices, and ensuring all contributions were properly integrated before final submission.
