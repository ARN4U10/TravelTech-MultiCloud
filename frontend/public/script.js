const FAVORITES_URL = "http://localhost:3001";
const COMMENTS_URL = "http://localhost:3002";
const VISITED_URL = "http://localhost:3003";

let currentCountry = null;

const countryInput = document.getElementById("countryInput");
const searchBtn = document.getElementById("searchBtn");
const countryResult = document.getElementById("countryResult");

const saveFavoriteBtn = document.getElementById("saveFavoriteBtn");
const markVisitedBtn = document.getElementById("markVisitedBtn");
const saveCommentBtn = document.getElementById("saveCommentBtn");
const commentInput = document.getElementById("commentInput");

const favoritesList = document.getElementById("favoritesList");
const commentsList = document.getElementById("commentsList");
const visitedList = document.getElementById("visitedList");

searchBtn.addEventListener("click", searchCountry);
saveFavoriteBtn.addEventListener("click", saveFavorite);
markVisitedBtn.addEventListener("click", markVisited);
saveCommentBtn.addEventListener("click", saveComment);

async function searchCountry() {
  const query = countryInput.value.trim();
  if (!query) return;

  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${query}`);
    const data = await response.json();
    const country = data[0];

    currentCountry = {
      name: country.name.common,
      capital: country.capital ? country.capital[0] : "Sin capital",
      region: country.region,
      population: country.population,
      flag: country.flags.png
    };

    countryResult.innerHTML = `
      <h2>${currentCountry.name}</h2>
      <p><strong>Capital:</strong> ${currentCountry.capital}</p>
      <p><strong>Región:</strong> ${currentCountry.region}</p>
      <p><strong>Población:</strong> ${currentCountry.population}</p>
      <img src="${currentCountry.flag}" alt="Bandera de ${currentCountry.name}">
    `;

    loadCommentsByCountry(currentCountry.name);
  } catch (error) {
    countryResult.innerHTML = `<p>Error al buscar el país.</p>`;
    console.error(error);
  }
}

async function saveFavorite() {
  if (!currentCountry) {
    alert("Primero busca un país.");
    return;
  }

  try {
    await fetch(`${FAVORITES_URL}/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentCountry)
    });

    loadFavorites();
  } catch (error) {
    console.error("Error guardando favorito:", error);
  }
}

async function markVisited() {
  if (!currentCountry) {
    alert("Primero busca un país.");
    return;
  }

  try {
    await fetch(`${VISITED_URL}/visited`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        country: currentCountry.name,
        date: new Date().toISOString()
      })
    });

    loadVisited();
  } catch (error) {
    console.error("Error guardando visitado:", error);
  }
}

async function saveComment() {
  if (!currentCountry) {
    alert("Primero busca un país.");
    return;
  }

  const comment = commentInput.value.trim();
  if (!comment) {
    alert("Escribe un comentario.");
    return;
  }

  try {
    await fetch(`${COMMENTS_URL}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        country: currentCountry.name,
        comment: comment
      })
    });

    commentInput.value = "";
    loadCommentsByCountry(currentCountry.name);
  } catch (error) {
    console.error("Error guardando comentario:", error);
  }
}

async function loadFavorites() {
  try {
    const response = await fetch(`${FAVORITES_URL}/favorites`);
    const data = await response.json();

    favoritesList.innerHTML = "";
    data.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - ${item.capital}`;
      favoritesList.appendChild(li);
    });
  } catch (error) {
    console.error("Error cargando favoritos:", error);
  }
}

async function loadVisited() {
  try {
    const response = await fetch(`${VISITED_URL}/visited`);
    const data = await response.json();

    visitedList.innerHTML = "";
    data.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.country} - ${new Date(item.date).toLocaleDateString()}`;
      visitedList.appendChild(li);
    });
  } catch (error) {
    console.error("Error cargando visitados:", error);
  }
}

async function loadCommentsByCountry(countryName) {
  try {
    const response = await fetch(`${COMMENTS_URL}/comments/${countryName}`);
    const data = await response.json();

    commentsList.innerHTML = "";
    data.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.country}: ${item.comment}`;
      commentsList.appendChild(li);
    });
  } catch (error) {
    console.error("Error cargando comentarios:", error);
  }
}

loadFavorites();
loadVisited();