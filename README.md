# docs

Documentation site.

## Build

This project utilizes [mkdocs](https://www.mkdocs.org) and generates static
HTML. A virtual environment is recommended.

The mkdocs theme is referenced through a submodule. You will need to ensure the
`--recursive` flag is set when pulling the submodule.

- `mkdocs build` - Builds the site.
- `mkdocs serve` - Runs the site in a development server.
