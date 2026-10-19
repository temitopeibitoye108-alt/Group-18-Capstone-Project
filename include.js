/* =========================================================
   COMPONENT INCLUDES
   index.html is put together from the component pages: every
   <div data-include="folder/file.html"> is replaced with the
   elements marked data-component in that file.

   Component pages are complete HTML pages, so each one can be
   opened on its own while you work on it. Only the marked
   elements are copied into index.html.

   Browsers block fetch() on pages opened straight from disk
   (file://), so view index.html through a local server, e.g.
   the VS Code "Live Server" extension, or on GitHub Pages.
   ========================================================= */

// Paths inside a component page are relative to its own folder.
// Turn them into full URLs so they still work inside index.html.
function fixRelativeUrls(element, pageUrl) {
  const elements = [element, ...element.querySelectorAll("[src], [href]")];

  elements.forEach((el) => {
    ["src", "href"].forEach((attribute) => {
      const value = el.getAttribute(attribute);

      if (value && !value.startsWith("#")) {
        el.setAttribute(attribute, new URL(value, pageUrl).href);
      }
    });
  });
}

async function includeComponent(placeholder) {
  const file = placeholder.dataset.include;
  const pageUrl = new URL(file, document.baseURI);

  try {
    const response = await fetch(pageUrl);

    if (!response.ok) {
      throw new Error(`Request failed (${response.status})`);
    }

    const page = new DOMParser().parseFromString(await response.text(), "text/html");
    const parts = [...page.querySelectorAll("[data-component]")];

    parts.forEach((part) => fixRelativeUrls(part, pageUrl));
    placeholder.replaceWith(...parts);
  } catch (error) {
    console.error(`Could not load ${file}`, error);
    placeholder.textContent =
      `Could not load ${decodeURI(file)}. Open the site through a local server ` +
      `(for example the VS Code Live Server extension).`;
  }
}

// Other scripts (e.g. planet-card.js) wait for this before using the page
window.componentsReady = Promise.all(
  [...document.querySelectorAll("[data-include]")].map(includeComponent)
);