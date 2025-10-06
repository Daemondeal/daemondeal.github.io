from pathlib import Path

import markdown
import logging
import shutil
import jinja2

log = logging.getLogger("generator")


def url_for(folder, filename):
    if folder == "static":
        return f"/static/{filename}"
    else:
        log.error(f"Invalid folder {folder} in url_for()")
        exit(-1)


def md_to_html(md):
    return markdown.markdown(
        md,
        extensions=["extra", "md_in_html", "tables"],
    )


class Generator:
    path_outdir: Path
    path_data: Path
    path_cache: Path
    env: jinja2.Environment

    def __init__(self, path_outdir: Path, path_data: Path, path_cache: Path):
        self.path_outdir = path_outdir
        self.path_data = path_data
        self.path_cache = path_cache
        self.env = jinja2.Environment(
            loader=jinja2.FileSystemLoader(
                Path(__file__).parent.parent.parent / "templates"
            )
        )
        self.populate_env()

    def populate_env(self):
        self.env.globals["url_for"] = url_for
        self.env.filters["md_to_html"] = md_to_html

    def generate_content(self, path_out: Path, title: str, path_md: Path):
        with open(path_md, "r") as f:
            md = f.read()

        template = self.env.get_template("content.html")
        with open(path_out, "w") as out:
            out.write(template.render(title=title, content=md))

    def copy(self, path_source: Path, dest: str | Path):
        path_dest = self.path_outdir / dest

        log.info(f"Generating {path_dest}")
        shutil.copytree(path_source, path_dest)

    def generate(self):
        self.path_outdir.mkdir()

        self.copy(self.path_data / "static", "static")

        path_other = self.path_data / "other"
        for dir in path_other.iterdir():
            self.copy(dir, dir.name)

        log.info(f"Generating {self.path_outdir / 'index.html'}")
        self.generate_content(
            self.path_outdir / "index.html",
            "Hoempage",
            self.path_data / "home.md",
        )
