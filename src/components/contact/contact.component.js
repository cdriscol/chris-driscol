// @flow
import React from 'react';
import classNames from 'classnames';
import { createFragmentContainer, graphql, Environment } from 'react-relay';
import isEmail from 'validator/lib/isEmail';
import './contact.css';
import contactMutation from './contact.mutation';
import type { contact_chris } from './__generated__/contact_chris.graphql';

type Props = {
  relay?: {
    environment: Environment,
  },
  chris: contact_chris,
};

type State = {
  name: string,
  body: string,
  from: string,
  subject: string,
  sent?: ?boolean,
  nameError?: ?string,
  bodyError?: ?string,
  emailError?: ?string,
  subjectError?: ?string,
  error?: string,
};

class Contact extends React.Component<Props, State> {
  state = {
    name: '',
    body: '',
    from: '',
    subject: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, body, from, subject } = this.state;
    let nameError;
    let bodyError;
    let emailError;
    let subjectError;
    if (!name) nameError = 'Please enter your name.';
    if (!body) bodyError = 'Please enter a message.';
    if (!from) emailError = 'Please enter your email.';
    if (!isEmail(from)) {
      emailError = 'Please enter a valid email.';
    }
    if (!subject) subjectError = 'Please enter a subject.';
    this.setState({ nameError, bodyError, emailError, subjectError });
    const isError = nameError || bodyError || emailError || subjectError;
    if (isError || !this.props.relay) return;
    contactMutation.commit(
      this.props.relay.environment,
      {
        input: {
          name,
          body,
          from,
          subject,
        },
      },
      {
        onCompleted: () => this.setState({ sent: true }),
        onError: () =>
          this.setState({ error: 'There was an error sending your email.' }),
      },
    );
  };

  render() {
    return (
      <section
        className={classNames('contact', 'home-section')}
        id="contactme"
      >
        <div className="container">
          <div className="row">
            {!this.state.sent && (
              <div className={classNames('col-xs-12', 'text-center')}>
                <h2 className="section-heading">Contact Me</h2>
                <p className="section-subheading">
                  I would love to hear from you!
                </p>
              </div>
            )}
            {this.state.sent && (
              <div className={classNames('col-xs-12', 'text-center')}>
                <h2 className="section-heading">thank you</h2>
                <p className="section-subheading">
                  I will respond to you as soon as possible
                </p>
              </div>
            )}
          </div>
          <div className="row">
            {!this.state.sent && (
              <div className="col-lg-12">
                <form name="sentMessage" noValidate>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          onChange={e =>
                            this.setState({ from: e.target.value })
                          }
                          value={this.state.from}
                          id="email"
                          className="form-control"
                          placeholder="your email *"
                          required
                        />
                        {this.state.emailError && (
                          <p
                            className={classNames('help-block', 'text-danger')}
                          >
                            {this.state.emailError}
                          </p>
                        )}
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          value={this.state.name}
                          onChange={e =>
                            this.setState({ name: e.target.value })
                          }
                          placeholder="your name *"
                          id="name"
                          required
                        />
                        {this.state.nameError && (
                          <p
                            className={classNames('help-block', 'text-danger')}
                          >
                            {this.state.nameError}
                          </p>
                        )}
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          value={this.state.subject}
                          onChange={e =>
                            this.setState({ subject: e.target.value })
                          }
                          id="subject"
                          className="form-control"
                          placeholder="subject *"
                          required
                        />
                        {this.state.subjectError && (
                          <p
                            className={classNames('help-block', 'text-danger')}
                          >
                            {this.state.subjectError}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <textarea
                          rows="4"
                          value={this.state.body}
                          onChange={e =>
                            this.setState({ body: e.target.value })
                          }
                          id="message"
                          className="form-control"
                          placeholder="this is where you say something.. *"
                          required
                        />
                        {this.state.bodyError && (
                          <p
                            className={classNames('help-block', 'text-danger')}
                          >
                            {this.state.bodyError}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="clearfix" />
                    <div className={classNames('text-center')}>
                      <button
                        onClick={this.handleSubmit}
                        className={classNames('btn', 'btn-xl')}
                      >
                        Send Message
                      </button>
                      {this.state.error && (
                        <div
                          className={classNames('text-center', 'text-danger')}
                        >
                          <strong>{this.state.error}</strong>
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default createFragmentContainer(
  Contact,
  graphql`
    fragment contact_chris on Chris {
      id
    }
  `,
);
