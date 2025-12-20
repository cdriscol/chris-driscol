use async_graphql::{InputObject, Object, SimpleObject};

pub struct QueryRoot;
pub struct MutationRoot;

#[derive(InputObject)]
pub struct ContactMeInput {
    pub from: String,
    pub name: String,
    pub subject: String,
    pub body: String,
}

#[derive(SimpleObject)]
pub struct ContactMePayload {
    pub success: bool,
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
