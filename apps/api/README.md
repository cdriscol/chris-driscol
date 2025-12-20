# API (Rust + Axum + async-graphql)

This service exposes a JSON-only GraphQL endpoint at `/graphql`.

## Commands

```
cargo build -p chris-driscol-api
cargo run -p chris-driscol-api --bin api
```

## Schema generation

The GraphQL SDL is generated from Rust code:

```
cargo run -p chris-driscol-api --bin schema_gen
```
