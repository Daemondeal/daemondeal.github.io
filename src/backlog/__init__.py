import argparse
from pathlib import Path
import toml

from backlog.add_game import main_add_game


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dir", default="data/backlog")
    return parser.parse_args()


def main():
    args = parse_args()

    main_add_game(args)
