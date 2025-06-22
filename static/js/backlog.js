"use strict";

function getCoverImgUrl(imgId) {
  return `/backlog/covers/cover_${imgId}.jpg`;
}

function getStatusClass(status) {
  switch (status) {
    case "Playing":
      return "status-playing";
    case "Left Unfinished":
      return "status-unfinished";
    case "Dropped":
      return "status-dropped";
    case "Backlog":
      return "status-backlog";
    case "Unreleased":
      return "status-unreleased";
    case "Finished":
      return "status-finished";
    default:
      return "";
  }
}

function getSortedNameList(parameter, grouped) {
  if (parameter === "status") {
    let values = ["Playing", "Left Unfinished", "Backlog", "Finished", "Dropped"];
    for (let v in []) {
      if (grouped.hasOwnProperty(v) && grouped[v].length > 0) {
        values.append(v);
      }
    }
    return values;
  }

  let groupNames = Object.keys(grouped);
  groupNames.sort();
  return groupNames;
}

function htmlToNode(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    const nNodes = template.content.childNodes.length;
    if (nNodes !== 1) {
        throw new Error(
            `html parameter must represent a single node; got ${nNodes}. ` +
            'Note that leading or trailing spaces around an element in your ' +
            'HTML, like " <img/> ", get parsed as text nodes neighbouring ' +
            'the element; call .trim() on your input to avoid this.'
        );
    }
    return template.content.firstChild;
}

function showBy(name, parameter) {
  let grouped = {};

  for (let game of games) {
    if (name !== "" && !game["title"].match(name))
      continue;

    let param = game[parameter];

    if (!grouped.hasOwnProperty(param)) {
      grouped[param] = [];
    }

    grouped[param].push(game);
  }

  for (let group in grouped) {
    grouped[group].sort((a, b) => {
      const idx1 = a["sort_name"] || a["title"];
      const idx2 = b["sort_name"] || b["title"];

      return idx1.localeCompare(idx2);
    });
  }

  let target = document.getElementById("target");
  target.innerHTML = "";

  let groupNames = getSortedNameList(parameter, grouped);

  for (let groupName of groupNames) {
    let groupContainer = document.createElement("article");

    let finished = 0;
    for (let game of grouped[groupName]) {
      if (game["status"] === "Finished" || game["status"] == "Dropped") {
        finished++;
      }
    }

    let finishedString = "";
    if (parameter !== "status") {
      finishedString = ` - ${finished}/${grouped[groupName].length}`;

    }

    const name = groupName || "Uncategorized";
    groupContainer.appendChild(htmlToNode(
      `<h2>${name}${finishedString}</h2>`
    ));

    let gamesContainer = htmlToNode(`<div class='games-container'></div>`);

    for (let game of grouped[groupName]) {
      gamesContainer.appendChild(htmlToNode(`
        <div class='game-card' onclick='openDialog(\"${game['id']}\")'>
          <img src='${getCoverImgUrl(game['img_id'])}' >
          <div class="overlay">
            <span class="game-title">${game['title']}</span>
            <span class="game-status ${getStatusClass(game['status'])}">${game['status']}</span>
          </div>
        </div>
      `));
    }
    groupContainer.appendChild(gamesContainer);
    target.appendChild(groupContainer);
  }
}

function getGame(id) {
  for (let game of games) {
    if (game["id"] === id) {
      return game;
    }
  }

  return {};
}

function populateDialog(id) {
  const content = document.getElementById('dialog-content');

  let game = getGame(id);

  let notes = "";

  if (game["notes"] !== "") {
    notes = `
        <p>
          <strong>Notes: </strong> ${game["notes"]}
        </p>
`;
  }

  content.innerHTML = `
    <header>
      <button aria-label="Close" rel="prev" onclick="closeDialog()"></button>
      <p>
        <strong>${game["title"]}</strong>
      </p>
    </header>

    <div class="grid">
      <img
        src="${getCoverImgUrl(game['img_id'])}"
        alt="${game['title']} cover"
        style="width: 100%; border-radius: 0.25rem;">

      <div>
        <p>
          <strong>Genre:</strong> ${game["genre"]}
        </p>
        <p>
          <strong>Platform: </strong> ${game["platform"]}
        </p>
        <p>
          <strong>Estimated Hours Played: </strong> ${game["hours"]}
        </p>

        <p>
          <strong>Status: </strong> ${game["status"]}
        </p>

        <p>
          <strong>Rating:</strong> ${game["rating"]}/4
        </p>

        <p>
          <strong>Owned: </strong> ${game["owned"] ? "yes" : "no"}
        </p>

        ${notes}
      </div>
    </div>

  `;
}

function updateFilter() {
  const filterName = document.getElementById("filter-name").value;
  const filterGroupBy = document.getElementById("filter-group-by").value;

  showBy(filterName, filterGroupBy);
}

function openDialog(id) {
  populateDialog(id);

  const dialog = document.getElementById('details-dialog');
  if (!dialog.open) dialog.showModal();
}

function closeDialog() {
  const dialog = document.getElementById('details-dialog');
  if (dialog.open) {
      dialog.close();
  } }

document.addEventListener("DOMContentLoaded", () => {
  showBy("", "status");
})
