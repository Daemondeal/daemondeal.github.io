from ghp_import import GhpError, ghp_import

import argparse
import logging


log = logging.getLogger("deploy")


def main():
    logging.basicConfig()
    parser = argparse.ArgumentParser()
    parser.add_argument("--dir", default="dist", help="the folder to deploy")
    args = parser.parse_args()

    try:
        ghp_import(
            args.dir,
            push=True,
        )
    except GhpError as e:
        log.error(e)
