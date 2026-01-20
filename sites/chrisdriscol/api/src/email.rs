use aws_config::BehaviorVersion;
use aws_sdk_sesv2::types::{Body, Content, Destination, EmailContent, Message};
use aws_sdk_sesv2::Client;

use crate::types::ContactMeInput;

#[derive(Debug)]
pub struct EmailConfig {
    pub from: String,
    pub to: String,
}

impl EmailConfig {
    pub fn from_env() -> Result<Self, String> {
        let from = std::env::var("SES_FROM").map_err(|_| "SES_FROM is required")?;
        let to = std::env::var("SES_TO").map_err(|_| "SES_TO is required")?;
        Ok(Self { from, to })
    }
}

pub async fn send_contact_email(input: &ContactMeInput) -> Result<(), String> {
    let config = EmailConfig::from_env()?;
    let sdk_config = aws_config::load_defaults(BehaviorVersion::latest()).await;
    let client = Client::new(&sdk_config);

    let subject = Content::builder()
        .data(input.subject.clone())
        .charset("UTF-8")
        .build()
        .map_err(|err| format!("failed to build subject: {err}"))?;

    let body_text = format!("{}\n\nFrom: {}\nEmail: {}", input.body, input.name, input.from);
    let body = Body::builder()
        .text(
            Content::builder()
                .data(body_text)
                .charset("UTF-8")
                .build()
                .map_err(|err| format!("failed to build body: {err}"))?,
        )
        .build();

    let message = Message::builder()
        .subject(subject)
        .body(body)
        .build();

    let destination = Destination::builder()
        .to_addresses(config.to)
        .build();

    let email = EmailContent::builder().simple(message).build();

    client
        .send_email()
        .from_email_address(config.from)
        .destination(destination)
        .reply_to_addresses(input.from.clone())
        .content(email)
        .send()
        .await
        .map_err(|err| format!("ses send failed: {err}"))?;

    Ok(())
}
