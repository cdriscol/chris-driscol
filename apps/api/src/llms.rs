use crate::data;

/// Converts HTML tags to markdown
fn html_to_markdown(text: &str) -> String {
    text.replace("<strong>", "**")
        .replace("</strong>", "**")
        .replace("<i>", "*")
        .replace("</i>", "*")
        .replace("<i class=\"fa fa-heart\"></i>", "❤️")
}

/// Generates the llms.txt content from portfolio data
pub fn generate_llms_txt() -> String {
    let chris = data::chris();
    let mut output = String::new();

    // H1 Title
    output.push_str(&format!("# {}\n\n", chris.title));

    // Blockquote Summary
    output.push_str(&format!("> {}\n\n", html_to_markdown(&chris.description)));

    // About Section
    output.push_str("## About\n\n");
    for paragraph in &chris.about.description {
        output.push_str(&format!("{}\n\n", html_to_markdown(paragraph)));
    }

    if let Some(tag_line) = &chris.about.tag_line {
        output.push_str(&format!("{}\n\n", html_to_markdown(tag_line)));
    }

    // Skills Section
    output.push_str("## Skills\n\n");

    if !chris.skills.languages.is_empty() {
        output.push_str(&format!("**Languages:** {}\n\n", chris.skills.languages.join(", ")));
    }

    if !chris.skills.technologies.is_empty() {
        output.push_str(&format!("**Technologies:** {}\n\n", chris.skills.technologies.join(", ")));
    }

    if !chris.skills.tools.is_empty() {
        output.push_str(&format!("**Tools:** {}\n\n", chris.skills.tools.join(", ")));
    }

    // Experience Section
    output.push_str("## Experience\n\n");
    for exp in &chris.experience {
        if let (Some(title), Some(location), Some(duration)) =
            (&exp.title, &exp.location, &exp.duration) {
            output.push_str(&format!(
                "### {} at {}\n\n",
                html_to_markdown(title),
                html_to_markdown(location)
            ));
            output.push_str(&format!("**Duration:** {}\n\n", html_to_markdown(duration)));

            if let Some(description) = &exp.description {
                output.push_str(&format!("{}\n\n", html_to_markdown(description)));
            }
        }
    }

    // Projects Section
    output.push_str("## Projects\n\n");
    for project in &chris.work {
        if let Some(title) = &project.title {
            let title_md = html_to_markdown(title);

            // Project title with link
            if let Some(link) = &project.link {
                output.push_str(&format!("### [{}]({})\n\n", title_md, link));
            } else {
                output.push_str(&format!("### {}\n\n", title_md));
            }

            // Sub-title
            if let Some(sub_title) = &project.sub_title {
                output.push_str(&format!("{}\n\n", html_to_markdown(sub_title)));
            }

            // Date and location
            if let (Some(date), Some(location)) = (&project.date, &project.location) {
                output.push_str(&format!("**{}** | {}\n\n", html_to_markdown(date), html_to_markdown(location)));
            } else if let Some(date) = &project.date {
                output.push_str(&format!("**{}**\n\n", html_to_markdown(date)));
            }

            // Technologies
            if !project.technologies.is_empty() {
                output.push_str(&format!("**Technologies:** {}\n\n", project.technologies.join(", ")));
            }

            // Description paragraphs
            for paragraph in &project.description {
                output.push_str(&format!("{}\n\n", html_to_markdown(paragraph)));
            }
        }
    }
    output.push_str("\n");

    // Links Section
    output.push_str("## Links\n\n");
    output.push_str("- [Resume](/resume): Interactive resume explorer\n");
    output.push_str(&format!("- [LinkedIn]({})\n", chris.social.linked_in));
    output.push_str(&format!("- [GitHub]({})\n", chris.social.github));
    output.push_str(&format!("- Email: {}\n", chris.social.email));

    output
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_html_to_markdown() {
        assert_eq!(
            html_to_markdown("This is <strong>bold</strong> and <i>italic</i>"),
            "This is **bold** and *italic*"
        );
    }

    #[test]
    fn test_generate_llms_txt() {
        let output = generate_llms_txt();

        // Check for required sections
        assert!(output.starts_with("# Chris Driscol"));
        assert!(output.contains("## About"));
        assert!(output.contains("## Skills"));
        assert!(output.contains("## Experience"));
        assert!(output.contains("## Projects"));
        assert!(output.contains("## Links"));

        // Check that HTML is converted
        assert!(!output.contains("<strong>"));
        assert!(!output.contains("<i>"));
    }
}
