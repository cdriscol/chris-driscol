# Chris Driscol [![CircleCI](https://img.shields.io/circleci/project/github/cdriscol/chris-driscol/master.svg)](https://circleci.com/gh/cdriscol/chris-driscol/tree/master) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![node](https://img.shields.io/badge/node-%3E=8.9.0-brightgreen.svg)](https://nodejs.org) [![flow](https://img.shields.io/badge/flow-%5E0.65.0-E8BD36.svg)](https://flow.org) [![graphql](https://img.shields.io/badge/graphql-%5E0.12.3-e10098.svg)](http://graphql.org/) [![graphql](https://img.shields.io/badge/relay-%5E1.5.0-f26a01.svg)](https://facebook.github.io/relay/docs/en/next/introduction-to-relay.html) [![Coverage Status](https://coveralls.io/repos/github/cdriscol/chris-driscol/badge.svg?branch=master)](https://coveralls.io/github/cdriscol/chris-driscol?branch=master)
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
