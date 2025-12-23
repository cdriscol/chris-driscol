import { useState, type FormEvent } from "react";
import { graphql } from "../../generated/graphql";
import { execute } from "../../generated/graphql/execute";
import { SectionHeader } from "../section/SectionHeader";
import { Section } from "../section/Section";
import { SectionTagline } from "../section/SectionTagline";
import { SectionTitle } from "../section/SectionTitle";
import { SiteContainer } from "../section/SiteContainer";
import { PrimaryButton } from "../ui/PrimaryButton";
import "./contact.css";

type ContactErrors = {
  name?: string;
  from?: string;
  subject?: string;
  body?: string;
};

const ContactMutationDocument = graphql(/* GraphQL */ `
  mutation ContactMe($input: ContactMeInput!) {
    contactMe(input: $input) {
      success
    }
  }
`);

export const ContactSection = () => {
  const [contactSent, setContactSent] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    from: "",
    subject: "",
    body: "",
  });
  const [contactErrors, setContactErrors] = useState<ContactErrors>({});

  const validateContact = () => {
    const nextErrors: ContactErrors = {};
    if (!contactForm.name.trim()) nextErrors.name = "Please enter your name.";
    if (!contactForm.from.trim()) nextErrors.from = "Please enter your email.";
    if (
      contactForm.from.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.from)
    ) {
      nextErrors.from = "Please enter a valid email.";
    }
    if (!contactForm.subject.trim()) nextErrors.subject = "Please enter a subject.";
    if (!contactForm.body.trim()) nextErrors.body = "Please enter a message.";
    setContactErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactError(null);
    if (!validateContact()) return;

    try {
      const result = await execute(ContactMutationDocument, {
        input: {
          name: contactForm.name,
          from: contactForm.from,
          subject: contactForm.subject,
          body: contactForm.body,
        },
      });
      if (!result.contactMe?.success) {
        throw new Error("There was an error sending your email.");
      }
      setContactSent(true);
      setContactForm({ name: "", from: "", subject: "", body: "" });
    } catch (err) {
      setContactError(err instanceof Error ? err.message : "There was an error sending your email.");
    }
  };

  return (
    <Section id="contactme" className="contact">
      <SiteContainer>
        <SectionHeader className="text-center">
          <SectionTitle>{contactSent ? "Thank you" : "Contact Me"}</SectionTitle>
          <SectionTagline className="!text-[white]">
            {contactSent
              ? "I will respond to you as soon as possible."
              : "I would love to hear from you!"}
          </SectionTagline>
        </SectionHeader>
        <div className="contact-panel mt-8">
          {!contactSent ? (
            <form onSubmit={handleContactSubmit} className="contact-form">
              <div className="contact-column">
                <div className="form-group">
                  <label htmlFor="contact-email" className="sr-only">
                    Your email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className="form-control"
                    placeholder="your email *"
                    value={contactForm.from}
                    onChange={(event) =>
                      setContactForm((prev) => ({ ...prev, from: event.target.value }))
                    }
                  />
                  {contactErrors.from ? (
                    <p className="help-block text-danger">{contactErrors.from}</p>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="contact-name" className="sr-only">
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className="form-control"
                    placeholder="your name *"
                    value={contactForm.name}
                    onChange={(event) =>
                      setContactForm((prev) => ({ ...prev, name: event.target.value }))
                    }
                  />
                  {contactErrors.name ? (
                    <p className="help-block text-danger">{contactErrors.name}</p>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="contact-subject" className="sr-only">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    className="form-control"
                    placeholder="subject *"
                    value={contactForm.subject}
                    onChange={(event) =>
                      setContactForm((prev) => ({ ...prev, subject: event.target.value }))
                    }
                  />
                  {contactErrors.subject ? (
                    <p className="help-block text-danger">{contactErrors.subject}</p>
                  ) : null}
                </div>
              </div>
              <div className="contact-column">
                <div className="form-group">
                  <label htmlFor="contact-message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={9}
                    className="form-control"
                    placeholder="this is where you say something.. *"
                    value={contactForm.body}
                    onChange={(event) =>
                      setContactForm((prev) => ({ ...prev, body: event.target.value }))
                    }
                  />
                  {contactErrors.body ? (
                    <p className="help-block text-danger">{contactErrors.body}</p>
                  ) : null}
                </div>
              </div>
              <div className="contact-actions">
                <PrimaryButton type="submit">
                  Send Message
                </PrimaryButton>
                {contactError ? <p className="help-block text-danger">{contactError}</p> : null}
              </div>
            </form>
          ) : null}
        </div>
      </SiteContainer>
    </Section>
  );
};
