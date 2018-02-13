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
          query={`
# Welcome to my Resume GraphiQL Explorer
query {
  viewer {
    title
  }
}`}
        >
          <GraphiQL.Logo>Chris Driscol</GraphiQL.Logo>
        </GraphiQL>
      </div>
    );
  }
}
