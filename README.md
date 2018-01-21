# Chris Driscol
Source code for https://chrisdriscol.com

## Dependencies
I built this site with some technologies that I have come to really like, including (but not limited to):
- Docker
- Node
- MongoDB
- GraphQL
- React
- Relay Modern
- Material UI

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
