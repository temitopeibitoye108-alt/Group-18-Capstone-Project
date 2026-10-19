const API_URL = "https://anurella.github.io/json/planet.json";

// Looked up in startPlanetCard(), once the card's markup is on the page
let container;
let template;

// The whole planet list is downloaded once and reused for every search.
let planetList = null;

function pick(obj, keys) {
  for (const key of keys) {
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") {
      return obj[key];
    }
  }
  return "—";
}

function normalizePlanet(raw) {
  return {
    name: pick(raw, ["name", "englishName", "planet"]),
    image: pick(raw, ["image", "imageUrl", "img", "thumbnail"]),
    type: pick(raw, ["type", "planetType", "category"]),
    description: pick(raw, ["description", "desc", "overview"]),
    distance: pick(raw, ["distanceFromSun", "distance_from_sun", "distance"]),
    mass: pick(raw, ["mass"]),
    diameter: pick(raw, ["diameter"]),
    period: pick(raw, ["orbitalPeriod", "period", "orbital_period"]),
    temperature: pick(raw, ["meanTemperature", "temperature", "temp"]),
    gravity: pick(raw, ["gravity"]),
    moons: pick(raw, ["numberOfMoons", "moons", "moon"])
  };
}

async function fetchPlanets() {
  if (planetList) {
    return planetList;
  }

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  const data = await response.json();

  const list = Array.isArray(data)
    ? data
    : Array.isArray(data.planets)
      ? data.planets
      : Array.isArray(data.data)
        ? data.data
        : [data];

  planetList = list.map(normalizePlanet);

  return planetList;
}

async function fetchPlanet(name) {
  const planets = await fetchPlanets();

  const searchName = name.trim().toLowerCase();
  const nameOf = (planet) => String(planet.name).toLowerCase();

  // Exact name first, then the first planet that starts with what was typed
  const match =
    planets.find((planet) => nameOf(planet) === searchName) ||
    planets.find((planet) => nameOf(planet).startsWith(searchName));

  if (!match) {
    throw new Error(`No planet found called "${name.trim()}".`);
  }

  return match;
}

function renderPlanetCard(planet) {
  const card = template.content.cloneNode(true);

  card.querySelectorAll("[data-field]").forEach((element) => {
    const field = element.dataset.field;
    const value = planet[field];

    if (element.tagName === "IMG") {
      if (value && value !== "—") {
        element.src = value;
        element.alt = `${planet.name} from space`;
      } else {
        element.removeAttribute("src");
        element.alt = "Planet image unavailable";
      }
    } else {
      element.textContent = value;
    }
  });

  container.replaceChildren(card);
}

function renderMessage(message) {
  const paragraph = document.createElement("p");

  paragraph.className = "planet-card__message";
  paragraph.textContent = message;

  container.replaceChildren(paragraph);
}

async function loadPlanetCard(name) {
  renderMessage("Loading...");

  try {
    const planet = await fetchPlanet(name);
    renderPlanetCard(planet);
  } catch (error) {
    console.error(error);
    renderMessage(error.message);
  }
}

function startPlanetCard() {
  container = document.getElementById("planet-card-container");
  template = document.getElementById("planet-card-template");

  if (!container || !template) {
    return;
  }

  // Navbar search (only on pages that have the search form)
  const searchForm = document.querySelector(".search");

  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = searchForm.querySelector("input").value;

      if (name.trim()) {
        loadPlanetCard(name);
      }
    });
  }

  loadPlanetCard("Earth");
}

// On index.html the card and header markup is loaded by include.js first;
// the planet-card.html demo page already has it, so start straight away there.
(window.componentsReady || Promise.resolve()).then(startPlanetCard);