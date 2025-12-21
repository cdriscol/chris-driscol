use async_graphql::{ErrorExtensionValues, Response, ServerError};
use async_graphql_axum::{GraphQLRequest, GraphQLResponse};
use axum::{http::HeaderMap, routing::post, Extension, Router};
use std::net::SocketAddr;

mod schema;
mod types;
mod data;
mod email;

use schema::AppSchema;

async fn graphql_handler(
    Extension(schema): Extension<AppSchema>,
    headers: HeaderMap,
    request: GraphQLRequest,
) -> GraphQLResponse {
    if let Ok(expected) = std::env::var("GRAPHQL_ORIGIN_SECRET") {
        let provided = headers
            .get("x-origin-secret")
            .and_then(|value| value.to_str().ok());
        if provided != Some(expected.as_str()) {
            let mut error = ServerError::new("Forbidden", None);
            let mut extensions = ErrorExtensionValues::default();
            extensions.set("code", "FORBIDDEN");
            error.extensions = Some(extensions);
            return Response::from_errors(vec![error]).into();
        }
    }
    schema.execute(request.into_inner()).await.into()
}

#[tokio::main]
async fn main() {
    let schema = schema::build_schema();

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
