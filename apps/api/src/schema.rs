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
        let chris = data.get_field_value("chris").expect("missing chris");
        let id = chris
            .get_field_value("id")
            .and_then(Value::as_str)
            .expect("missing id");
        assert_eq!(id, "guest");
    }
}
