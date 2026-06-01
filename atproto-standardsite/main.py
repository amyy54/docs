import json
import os
import sys

from atproto import Client, models
from keyring import get_password


def load_config():
    config_path = os.path.join(
        os.path.dirname(os.path.abspath(__file__)), "config.json"
    )
    return json.load(open(config_path))


def read_file(file_path: str) -> tuple[str, str | None, str]:
    with open(file_path, "r") as file:
        file_content = file.read()

        start_of_file_content = file_content.find("#") + 2
        title = file_content[
            start_of_file_content : file_content.find("\n", start_of_file_content)
        ]

        description = ""
        description_int = file_content.find("\n", start_of_file_content) + 2
        while (
            len(description) <= 0
            or "This was originally written" in description
            or "![" in description
        ):
            description = file_content[
                description_int : file_content.find("\n\n", description_int)
            ]
            description_int = file_content.find("\n\n", description_int) + 2

        description = description.replace("\n", " ")

        description_lst = description.split(". ")
        if len(description_lst) > 2:
            description = ". ".join(description_lst[0:2]) + "."

        if description.startswith("##"):
            description = None

        publish_date = file_content[
            file_content.find("publish_date: ") + 14 : file_content.find("\n")
        ]

    return title, description, publish_date


def main(file_path: str, dry_run: bool) -> None:
    config = load_config()

    client = Client()
    client.login(
        config["username"], get_password("mkdocs-atproto-link", config["username"])
    )

    publication_data = client.site.standard.publication.get(
        client.me.did,
        config["publication"],
    )

    file_data = read_file(file_path)
    record = models.SiteStandardDocument.Record(
        published_at=file_data[2] + "T19:00:00-05:00",
        title=file_data[0],
        description=file_data[1],
        site=publication_data.uri,
        path=f"/{file_path}".replace(".md", ""),
    )

    if dry_run:
        print("-----Publication-----")
        print(publication_data)
        print("-----Record-----")
        print(record)
        print("----------")
        print("This was a dry-run; the record was not published.")
    else:
        res = client.site.standard.document.create(
            repo=client.me.did,
            record=record,
            validate=False,
        )
        print(res)


if __name__ == "__main__":
    if len(sys.argv) <= 1:
        print("Include the path to the file to upload.")
        quit(1)

    main(sys.argv[1], "--dry-run" in sys.argv)
