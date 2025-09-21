import requests
import logging
import pickle
import time
import json
import re
import os

from pathlib import Path
from typing import Self

from requests.models import HTTPError

log = logging.getLogger("api_wrapper")

# Hoping the script doesn't take more than 5 minutes to generate everything
GRACE_TIME_SECONDS = 60 * 5


BASE_URL = "https://api.igdb.com/v4"


class ApiWrapper:
    client_id: str
    token: str

    TOKEN_FILE = Path(".cache/token.pkl")

    def __init__(self, client_id: str, token: str):
        self.client_id = client_id
        self.token = token

    @staticmethod
    def _login_from_env() -> Self:
        client_id = os.getenv("IGDB_CLIENT_ID")
        client_secret = os.getenv("IGDB_CLIENT_SECRET")

        if client_id is None:
            raise RuntimeError("IGDB_CLIENT_ID env variable not set")

        if client_secret is None:
            raise RuntimeError("IGDB_CLIENT_SECRET env variable not set")

        log.debug("Sending login request")
        result = requests.post(
            "https://id.twitch.tv/oauth2/token",
            params={
                "client_id": client_id,
                "client_secret": client_secret,
                "grant_type": "client_credentials",
            },
        )

        if result.status_code != 200:
            raise RuntimeError(f"Login failed with code {result.status_code}")

        response = result.json()

        if "access_token" not in response:
            raise RuntimeError(f"Unexpected response type: {json.dumps(response)}")

        token = response["access_token"]
        expiry = time.time() + response["expires_in"]

        to_save = {
            "client_id": client_id,
            "token": token,
            "expiry": expiry,
        }

        with open(ApiWrapper.TOKEN_FILE, "wb") as token_file:
            pickle.dump(to_save, token_file)

        log.debug(
            "Login successful! Storing token in %s", ApiWrapper.TOKEN_FILE.as_posix()
        )

        return ApiWrapper(client_id, token)

    @staticmethod
    def login() -> Self:
        ApiWrapper.TOKEN_FILE.parent.mkdir(exist_ok=True)

        if not ApiWrapper.TOKEN_FILE.exists():
            log.debug("Token file not found, logging with credentials")
            return ApiWrapper._login_from_env()

        with open(ApiWrapper.TOKEN_FILE, "rb") as token_file:
            token = pickle.load(token_file)

            if token["expiry"] <= time.time() + GRACE_TIME_SECONDS:
                log.debug("Past token expired, logging with credentials")
                return ApiWrapper._login_from_env()

        log.debug("Using past token")
        return ApiWrapper(client_id=token["client_id"], token=token["token"])

    def api_request(self, endpoint: str, query: str) -> dict:
        url = f"{BASE_URL}/{endpoint}"
        headers = {
            "Client-ID": self.client_id,
            "Authorization": f"Bearer {self.token}",
        }

        log.debug('Sending request "%s"', url)
        log.debug("Query: %s", query)
        response = requests.post(url, headers=headers, data=query)

        if response.status_code != 200:
            raise HTTPError(f"API answered with status code {response.status_code}")

        return response.json()


# FIXME: Make this more robust
def escape_apicalypse_string(s: str) -> str:
    escaped = s.replace("\\", "\\\\").replace('"', '\\"')
    escaped = re.sub(r"[\r\n\t]", " ", escaped)
    return escaped
