use async_graphql::{EmptySubscription, InputObject, Object, Schema, SimpleObject};
use async_graphql_axum::{GraphQLRequest, GraphQLResponse};
use axum::{routing::post, Extension, Router};
use std::net::SocketAddr;

const CONTRACT_SDL: &str = include_str!("../../../packages/contracts/schema.graphql");

struct QueryRoot;
struct MutationRoot;

#[derive(InputObject)]
struct ContactMeInput {
    from: String,
    name: String,
    subject: String,
    body: String,
}

#[derive(SimpleObject)]
struct ContactMePayload {
    success: bool,
}

#[Object]
impl QueryRoot {
    async fn ping(&self) -> &str {
        "pong"
    }
}

#[Object]
impl MutationRoot {
    async fn contact_me(&self, input: ContactMeInput) -> ContactMePayload {
        let _ = input;
        ContactMePayload { success: true }
    }
}

type AppSchema = Schema<QueryRoot, MutationRoot, EmptySubscription>;

async fn graphql_handler(
    Extension(schema): Extension<AppSchema>,
    request: GraphQLRequest,
) -> GraphQLResponse {
    schema.execute(request.into_inner()).await.into()
}

fn normalize_sdl(sdl: &str) -> String {
    sdl.chars().filter(|ch| !ch.is_whitespace()).collect()
}

#[tokio::main]
async fn main() {
    let schema = Schema::build(QueryRoot, MutationRoot, EmptySubscription).finish();
    let api_sdl = schema.sdl();
    if normalize_sdl(CONTRACT_SDL) != normalize_sdl(&api_sdl) {
        eprintln!("Warning: API schema does not match packages/contracts/schema.graphql");
    }

    let app = Router::new()
        .route("/graphql", post(graphql_handler))
        .layer(Extension(schema));

    let port = std::env::var("PORT")
        .ok()
        .and_then(|value| value.parse::<u16>().ok())
        .unwrap_or(3000);

    let addr = SocketAddr::from(([127, 0, 0, 1], port));
    println!("GraphQL listening on http://{}/graphql", addr);

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
