use async_graphql::{EmptySubscription, Schema};

use crate::types::{MutationRoot, QueryRoot};

pub type AppSchema = Schema<QueryRoot, MutationRoot, EmptySubscription>;

pub fn build_schema() -> AppSchema {
    Schema::build(QueryRoot, MutationRoot, EmptySubscription).finish()
}

#[cfg(test)]
mod tests {
    use super::build_schema;
    use async_graphql::Value;

    #[tokio::test]
    async fn chris_query_returns_expected_shape() {
        let schema = build_schema();
        let response = schema
            .execute(
                r#"
                query {
                  chris {
                    id
                    title
                    description
                    skills { languages }
                  }
                }
                "#,
            )
            .await;

        assert!(response.errors.is_empty(), "GraphQL errors: {:?}", response.errors);
        let data = response.data;
        let chris = match data {
            Value::Object(ref map) => map.get("chris"),
            _ => None,
        }
        .expect("missing chris");
        let id = match chris {
            Value::Object(ref map) => map.get("id"),
            _ => None,
        }
        .and_then(|value| match value {
            Value::String(value) => Some(value.as_str()),
            _ => None,
        })
        .expect("missing id");
        assert_eq!(id, "guest");
    }
}
