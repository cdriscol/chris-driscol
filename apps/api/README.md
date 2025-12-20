# API (Rust + Axum + async-graphql)

This service exposes a JSON-only GraphQL endpoint at `/graphql`.

## Commands

```
cargo build -p chris-driscol-api
cargo run -p chris-driscol-api --bin api
```

## Windows build notes

The AWS SDK uses native crypto. On Windows you may need:

- CMake
- NASM (or set `AWS_LC_SYS_NO_ASM=1` to skip ASM)

## Schema generation

The GraphQL SDL is generated from Rust code:

```
cargo run -p chris-driscol-api --bin schema_gen
```

## Email (SES)

`contactMe` sends email via Amazon SES v2. Required environment variables:

- `SES_FROM` (verified sender on your domain)
- `SES_TO` (your inbox address)
