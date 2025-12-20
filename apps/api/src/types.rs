use async_graphql::{InputObject, Object, SimpleObject};

use crate::data;
use crate::email;

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

#[derive(SimpleObject, Clone)]
pub struct Skills {
    pub languages: Vec<String>,
    pub technologies: Vec<String>,
    pub tools: Vec<String>,
    pub loves: Vec<String>,
}

#[derive(SimpleObject, Clone)]
pub struct About {
    pub description: Vec<String>,
    #[graphql(name = "imageUrl")]
    pub image_url: Option<String>,
    #[graphql(name = "imageCaption")]
    pub image_caption: Option<String>,
    #[graphql(name = "imageTitle")]
    pub image_title: Option<String>,
    #[graphql(name = "tagLine")]
    pub tag_line: Option<String>,
}

#[derive(SimpleObject, Clone)]
pub struct Experience {
    pub duration: Option<String>,
    pub title: Option<String>,
    pub location: Option<String>,
    pub description: Option<String>,
    #[graphql(name = "imageUrl")]
    pub image_url: Option<String>,
}

#[derive(SimpleObject, Clone)]
pub struct Work {
    pub title: Option<String>,
    #[graphql(name = "subTitle")]
    pub sub_title: Option<String>,
    pub description: Vec<String>,
    pub location: Option<String>,
    pub link: Option<String>,
    pub video: Option<String>,
    pub date: Option<String>,
    #[graphql(name = "imageUrl")]
    pub image_url: Option<String>,
    pub technologies: Vec<String>,
}

#[derive(SimpleObject, Clone)]
pub struct Social {
    #[graphql(name = "linkedIn")]
    pub linked_in: String,
    pub github: String,
    pub email: String,
}

#[derive(SimpleObject, Clone)]
pub struct Chris {
    pub id: String,
    pub title: String,
    pub description: String,
    pub skills: Skills,
    pub experience: Vec<Experience>,
    pub about: About,
    pub work: Vec<Work>,
    pub social: Social,
}

#[Object]
impl QueryRoot {
    async fn ping(&self) -> &str {
        "pong"
    }

    async fn chris(&self) -> Chris {
        data::chris()
    }
}

#[Object]
impl MutationRoot {
    async fn contact_me(
        &self,
        input: ContactMeInput,
    ) -> Result<ContactMePayload, async_graphql::Error> {
        email::send_contact_email(&input)
            .await
            .map_err(|err| async_graphql::Error::new(err))?;
        Ok(ContactMePayload { success: true })
    }
}
