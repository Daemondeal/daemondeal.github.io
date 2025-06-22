from pathlib import Path
import re

from flask import Flask, render_template, request, g
import toml

from backlog.api_wrapper import ApiWrapper, escape_apicalypse_string


from rapidfuzz import fuzz

root = Path(__file__).parent.parent.parent
templates = (root / "templates").absolute()
static = (root / "data" / "static").absolute()

app = Flask(__name__, template_folder=templates, static_folder=static)


def is_acronym_match(query, target):
    target_words = re.findall(r"\b\w", target.lower())
    acronym = "".join(target_words)
    return query.lower() == acronym


def sort_by_similarity(query, list):
    def normalize(text):
        return re.sub(r"[^a-z0-9+]", "", text.lower())

    q = normalize(query)

    def score(e):
        ratio = fuzz.ratio(q, e)
        ratio_partial = fuzz.partial_ratio(q, e)
        token_sort = fuzz.token_sort_ratio(q, e)

        acronym_bonus = 20 if is_acronym_match(q, e) else 0
        return max(ratio, ratio_partial, token_sort) + acronym_bonus

    list.sort(key=lambda x: score(normalize(x["name"])), reverse=True)


def main_add_game(args):
    app.run(debug=True)


def load_game_file():
    with open("data/backlog/games.toml", "r") as infile:
        return toml.load(infile)


def save_game_file(gf):
    with open("data/backlog/games.toml", "w") as outfile:
        return toml.dump(gf, outfile)


@app.route("/")
def route_home():
    return render_template("add_game.html")


@app.route("/add-game-dialog")
def route_add_game_dialog():
    id = request.args.get("game_id", "")

    query = f"""
    fields id, name, genres.*, platforms.*, cover.*, summary, remakes.platforms.abbreviation, remasters.platforms.*;
    where id={id};
    limit 1;
    """

    wrapper = ApiWrapper.login()
    game = wrapper.api_request("games", query)[0]

    game_file = load_game_file()

    platforms = set()

    def add_platforms(arr):
        if "platforms" not in arr:
            return

        for platform in arr["platforms"]:
            if "abbreviation" in platform:
                platforms.add(platform["abbreviation"])
            else:
                platforms.add(platform["name"])

    add_platforms(game)

    if "remakes" in game:
        for remake in game["remakes"]:
            add_platforms(remake)

    if "remasters" in game:
        for remaster in game["remasters"]:
            add_platforms(remaster)

    return render_template(
        "add_game_dialog.html",
        game=game,
        statuses=game_file["statuses"],
        platforms=list(platforms),
    )


@app.route("/add-game", methods=("POST",))
def route_add_game():
    game_entry = {
        "id": request.form["id"],
        "img_id": request.form["img_id"],
        "title": request.form["title"],
        "genre": request.form["genre"],
        "series": request.form["series"],
        "rating": request.form["rating"],
        "status": request.form["status"],
        "platform": request.form["platform"],
        "hours": request.form["hours"],
        "sort_name": request.form["sort_name"],
        "owned": "owned" in request.form,
        "notes": request.form["notes"],
    }

    game_file = load_game_file()
    game_file["games"].append(game_entry)
    save_game_file(game_file)

    return ""


@app.route("/hide-game", methods=("POST",))
def route_hide_game():
    game_id = request.form["game_id"]

    game_file = load_game_file()
    game_file["hidden"].append(int(game_id))
    save_game_file(game_file)
    return ""


@app.route("/search")
def route_search():
    ignore_remakes = request.args.get("ignore_remakes", "")
    search_term = request.args.get("query", "")

    wrapper = ApiWrapper.login()

    game_file = load_game_file()
    games = set()

    for game in game_file["games"]:
        games.add(str(game["id"]))

    for hidden in game_file["hidden"]:
        games.add(hidden)

    query = f"""\
    fields id, name, summary, cover.*;
    limit 100;
    search "{escape_apicalypse_string(search_term)}";
    """

    if ignore_remakes == "on":
        query += '\nwhere game_type.type = "Main Game" & version_parent = null;'

    result = wrapper.api_request(
        "games",
        query,
    )

    res = [r for r in result if str(r["id"]) not in games]
    sort_by_similarity(query, res)

    return render_template("add_game_search.html", games=res)


@app.route("/add", methods=("POST",))
def route_add():
    return r'<button class="game-add added" disabled>✓</button>'
