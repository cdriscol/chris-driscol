use async_graphql::{EmptySubscription, InputObject, Object, Schema, SimpleObject};
use async_graphql_axum::{GraphQLRequest, GraphQLResponse};
use axum::{routing::post, Extension, Router};
use std::net::SocketAddr;

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

#[tokio::main]
async fn main() {
    let schema = Schema::build(QueryRoot, MutationRoot, EmptySubscription).finish();

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
