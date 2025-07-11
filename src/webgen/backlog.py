from pathlib import Path
from webgen.generator import Generator

import toml
import shutil
import logging
import requests

log = logging.getLogger("backlog")


def cache_cover(game: dict, path_coverdir: Path):
    img_id = game["img_id"]

    path_cover = path_coverdir / f"cover_{img_id}.jpg"

    if not path_cover.exists():
        url = f"https://images.igdb.com/igdb/image/upload/t_cover_big/{img_id}.jpg"
        log.info(f"Downloading {url}...")

        response = requests.get(url)
        with open(path_cover, "wb") as outfile:
            outfile.write(response.content)


def generate_backlog(generator: Generator):
    with open(generator.path_data / "backlog" / "games.toml", "r") as infile:
        game_file = toml.load(infile)

    path_cover = generator.path_cache / "covers"
    path_cover.mkdir(exist_ok=True)

    for game in game_file["games"]:
        cache_cover(game, path_cover)

    path_backlog = generator.path_outdir / "backlog"
    path_backlog.mkdir()

    shutil.copytree(path_cover, generator.path_outdir / "backlog" / "covers")

    games = sorted(game_file["games"], key=lambda x: x["title"])

    game_statuses = game_file["statuses"]
    statuses = {status: 0 for status in game_statuses}
    platforms = set()
    print(statuses)

    for game in games:
        statuses[game["status"]] += 1
        platforms.add(game["platform"])

    count_games_finished = statuses["Finished"] + statuses["Dropped"]

    platforms = sorted(list(platforms))

    with open(path_backlog / "index.html", "w") as outfile:
        template = generator.env.get_template("backlog.html")
        outfile.write(
            template.render(
                stats=statuses.items(),
                count_games_finished=count_games_finished,
                games=games,
                game_statuses=game_statuses,
                platforms=platforms,
            )
        )
