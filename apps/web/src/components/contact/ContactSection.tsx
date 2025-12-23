import { useState, type FormEvent } from "react";
import { graphqlUrl } from "../../lib/api";
import { contactMutation } from "../../lib/graphql";
import "./contact.css";

type ContactErrors = {
  name?: string;
  from?: string;
  subject?: string;
  body?: string;
};

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
      const response = await fetch(graphqlUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: contactMutation,
          variables: {
            input: {
              name: contactForm.name,
              from: contactForm.from,
              subject: contactForm.subject,
              body: contactForm.body,
            },
          },
        }),
      });
      const json = (await response.json()) as {
        data?: { contactMe?: { success?: boolean } };
        errors?: Array<{ message: string }>;
      };
      if (json.errors?.length) {
        throw new Error(json.errors[0]?.message ?? "There was an error sending your email.");
      }
      if (!json.data?.contactMe?.success) {
        throw new Error("There was an error sending your email.");
      }
      setContactSent(true);
      setContactForm({ name: "", from: "", subject: "", body: "" });
    } catch (err) {
      setContactError(err instanceof Error ? err.message : "There was an error sending your email.");
    }
  };

  return (
    <section className="section contact" id="contactme">
      <div className="site-container">
        <div className="section-header text-center">
          <h2 className="section-title">{contactSent ? "Thank you" : "Contact Me"}</h2>
          <p className="section-tagline">
            {contactSent ? "I will respond to you as soon as possible." : "I would love to hear from you!"}
          </p>
        </div>
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
                <button type="submit" className="btn btn-xl btn-primary">
                  Send Message
                </button>
                {contactError ? <p className="help-block text-danger">{contactError}</p> : null}
              </div>
            </form>
          ) : null}
        </div>
      </div>
    </section>
  );
};
