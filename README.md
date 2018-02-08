# Chris Driscol
Source code for https://chrisdriscol.com

## Dependencies
I built this site with some technologies that I have come to really like, including (but not limited to):
- GraphQL
- React
- Relay Modern
- Docker
- Node
- MongoDB
- Flow

## Available Commands

1. `yarn start` - starts the development server with hot reloading enabled

1. `yarn update-schema` - updates graphql schema file

1. `yarn relay-compiler` - runs the relay compiler to generate files

1. `yarn lint` - runs linter to check for lint errors

1. `yarn bs` - bundles the code and starts the production server

## Folder structure
    .
    ├── ...
    ├── src                     # Source code for client and server
    │   ├── server.js           # Entry point for app
    │   ├── client.js           # Entry point for client app
    │   ├── components          # React components
    │   │   └── ...             # Other client app items
    │   ├── graphql             # GraphQL
    │   │   ├── index.js        # GraphQL entry point
    │   │   └── ...             # Other server app items
    │   └── ...                 # Other app things
    └── ...                     # Other project items


## Run it local
Among some other targets in the `Makefile` there is one that will spin up the entire app locally:
```bash
$ make local
```

### Docker
There are docker configurations for both development and production.

To run docker for development,
```
docker-compose -f docker-compose-development.yml build
docker-compose -f docker-compose-development.yml up
```

To run docker for production,
```
docker-compose build
docker-compose up
```
