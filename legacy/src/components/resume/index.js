// @flow
import React from 'react';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';
import Helmet from 'react-helmet';
import './resume.css';

function graphQLFetcher(graphQLParams) {
  return fetch('/graphql', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json());
}

type State = { render: boolean };
export default class ResumePage extends React.Component<{}, State> {
  state = { render: false };
  componentDidMount() {
    this.setState({ render: true });
  }

  render() {
    if (!this.state.render) return null;
    return (
      <div className="resume">
        <Helmet title="Chris Driscol | GraphQL Resume" />
        <GraphiQL
          fetcher={graphQLFetcher}
          editorTheme={'dracula'}
          variables={`${JSON.stringify(
            {
              input: {
                from: '',
                name: '',
                subject: '',
                body: '',
              },
            },
            null,
            '\t',
          )}`}
          query={`
# Welcome to my Resume GraphiQL Explorer.
# You can browse my schema by looking at the "Docs" on the right.
# Run a query by pressing the execute (>) button on the top bar.
query resume {
  chris {
    title
    description
    social {
      github
      linkedIn
      email
    }
    experience {
      location
      title
      duration
      description
    }
    skills {
      technologies
    }
  }
}

# Edit the "Query Variables" below, and send me an email using this mutation.
# (make sure you to include your email in the from field)
mutation contactMeMutation($input:ContactMeInput!) {
  contactMe(input:$input) {
    success
  }
}`}
        >
          <GraphiQL.Logo>
            <a href="/" title="Chris Driscol">
              Chris Driscol
            </a>
          </GraphiQL.Logo>
        </GraphiQL>
      </div>
    );
  }
}
