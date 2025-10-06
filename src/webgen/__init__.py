from common import setup_logging
from pathlib import Path

import shutil
import logging
import argparse

from webgen.backlog import generate_backlog
from webgen.generator import Generator

log = logging.getLogger("webgen")


def parse_arguments():
    parser = argparse.ArgumentParser()

    parser.add_argument("-o", "--output-dir", default="dist")
    parser.add_argument("-d", "--data-dir", default="data")

    return parser.parse_args()


def main():
    setup_logging()

    args = parse_arguments()
    path_out = Path(args.output_dir)
    path_data = Path(args.data_dir)

    if not path_data.exists():
        log.error(f'Cannot find data dir at "{path_data.absolute()}"')
        exit(-1)

    if path_out.exists():
        shutil.rmtree(path_out)

    path_cache = Path(".cache")
    path_cache.mkdir(exist_ok=True)

    generator = Generator(
        path_outdir=path_out,
        path_data=path_data,
        path_cache=path_cache,
    )

    generator.generate()
    generate_backlog(generator)

    log.info("All Done!")
