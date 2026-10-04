const API_URL = "https://anurella.github.io/json/planet.json";

const container = document.getElementById("planet-card-container");
const template = document.getElementById("planet-card-template");

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

async function fetchPlanet(name) {
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

  const searchName = name.trim().toLowerCase();

  const match = list.find((planet) => {
    const normalized = normalizePlanet(planet);

    return String(normalized.name).toLowerCase() === searchName;
  });

  if (!match) {
    throw new Error(`No planet found called "${name}".`);
  }

  return normalizePlanet(match);
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

loadPlanetCard("Earth");

