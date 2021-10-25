# Join.me

## Development

* Start dev environment using `docker-compose up --build` command.
* Client is available at http://localhost:3000
* Server is available at http://localhost:8000

## Production

* Copy `docker-compose.override.yml` into the `docker-compose.prod.yml` file.
* Start the production server with the `docker-compose up --build -d` command.
  * `-d` flag runs it as daemon in the background.
