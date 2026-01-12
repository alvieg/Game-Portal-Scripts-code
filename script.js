const gameslink = "https://alvieg.github.io/game-portal-revival-assets/games";
const imageslink = "https://alvieg.github.io/game-portal-revival-assets/images";
const gameslistlink = `https://alvieg.github.io/game-portal-revival-assets/games.json`;

const gameButtonsDiv = document.getElementById("game-buttons");
const modal = document.getElementById("game-modal");
const iframe = document.getElementById("game-iframe");

let games = [];
let currentgame = ""

async function fetchGames() {
  const res = await fetch(gameslistlink);
  if (!res.ok) throw new Error(res.status);
  games = await res.json();
}

async function openGameModal(url, name) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.status);

    let html = await res.text();
    currentgame = html

    iframe.srcdoc = html;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  } catch (e) {
    console.error("Failed to load game:", e);
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    modal.requestFullscreen().catch(err => console.error(err));
  } else {
    document.exitFullscreen();
  }
}

function clickOutsideClose(e) {
  // Only close if the click is directly on the modal background, not inside the content
  if (e.target === e.currentTarget) {
    closeGameModal();
  }
}

function closeGameModal() {
  iframe.srcdoc = "";
  modal.classList.remove("visible");
  document.body.style.overflow = "";
}


function closeGameModal() {
  currentgame = ""
  iframe.srcdoc = "";
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

function openInNewTab() {
  var win = window.open();
  win.document.body.style.margin = '0';
  win.document.body.style.height = '100vh';
  var iframe = win.document.createElement('iframe');
  iframe.style.border = 'none';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.margin = '0';
  iframe.srcdoc = currentgame;
  win.document.body.appendChild(iframe);
  window.close();
}

function renderGamesButtons() {
  gameButtonsDiv.innerHTML = "";
  games.forEach((game) => {
    const button = document.createElement("div");
    button.className = "game-button";

    const imglink = game.cover?.replace("{COVER_URL}", imageslink);

    button.innerHTML = `
      <img src="${imglink}" class="game-img" loading="lazy">
      <p class="game-name">${game.name}</p>
      <p class="game-author">${game.author}</p>
    `;

    button.onclick = () => {
      if (!game.url) {
        console.error("Game missing URL:", game);
        return;
      }

      const gameUrl = game.url.replace("{HTML_URL}", gameslink);
      openGameModal(gameUrl);
    };

    gameButtonsDiv.appendChild(button);
  });
}

(async () => {
  try {
    await fetchGames();
    renderGamesButtons();
  } catch (e) {
    console.error(e);
  }
})();
