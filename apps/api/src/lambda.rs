use async_graphql::{ErrorExtensionValues, Request as GraphqlRequest, Response, ServerError, Variables};
use lambda_http::{service_fn, Body, Error, Request, Response as LambdaResponse};
use serde::Deserialize;

mod schema;
mod types;
mod data;
mod email;

use schema::AppSchema;

#[derive(Deserialize)]
struct GraphqlPayload {
    query: String,
    #[serde(default)]
    variables: Option<serde_json::Value>,
    #[serde(rename = "operationName")]
    operation_name: Option<String>,
}

fn forbidden_response() -> Response {
    let mut error = ServerError::new("Forbidden", None);
    let mut extensions = ErrorExtensionValues::default();
    extensions.set("code", "FORBIDDEN");
    error.extensions = Some(extensions);
    Response::from_errors(vec![error])
}

fn graphql_json_response(response: Response) -> Result<LambdaResponse<Body>, Error> {
    let body = serde_json::to_string(&response)?;
    let response = LambdaResponse::builder()
        .status(200)
        .header("content-type", "application/json")
        .body(Body::Text(body))?;
    Ok(response)
}

async fn handler(schema: AppSchema, request: Request) -> Result<LambdaResponse<Body>, Error> {
    if let Ok(expected) = std::env::var("GRAPHQL_ORIGIN_SECRET") {
        let provided = request
            .headers()
            .get("x-origin-secret")
            .and_then(|value| value.to_str().ok());
        if provided != Some(expected.as_str()) {
            return graphql_json_response(forbidden_response());
        }
    }

    if request.method() == http::Method::OPTIONS {
        return Ok(LambdaResponse::builder()
            .status(204)
            .body(Body::Empty)?);
    }

    if request.method() != http::Method::POST {
        return Ok(LambdaResponse::builder()
            .status(405)
            .body(Body::Text("Method Not Allowed".into()))?);
    }

    let body = match request.body() {
        Body::Text(text) => text.as_bytes().to_vec(),
        Body::Binary(bytes) => bytes.clone(),
        Body::Empty => Vec::new(),
        _ => Vec::new(),
    };

    let payload: GraphqlPayload = serde_json::from_slice(&body)?;
    let mut gql_request = GraphqlRequest::new(payload.query);
    if let Some(variables) = payload.variables {
        gql_request = gql_request.variables(Variables::from_json(variables));
    }
    if let Some(operation_name) = payload.operation_name {
        gql_request = gql_request.operation_name(operation_name);
    }

    let response = schema.execute(gql_request).await;
    graphql_json_response(response)
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    let schema = schema::build_schema();
    lambda_http::run(service_fn(|request| handler(schema.clone(), request))).await
}
