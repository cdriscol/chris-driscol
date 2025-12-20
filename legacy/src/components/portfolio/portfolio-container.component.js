// @flow
import * as React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import Portfolio from './portfolio.component';
import type { portfolioContainerQuery } from './__generated__/portfolioContainerQuery.graphql';

type Props = {
  chris: portfolioContainerQuery,
};

const { Environment, Network, RecordSource, Store } = require('relay-runtime');

const source = new RecordSource();
const store = new Store(source);
const network = Network.create(/*...*/); // see note below
const handlerProvider = null;

const environment = new Environment({
  handlerProvider, // Can omit.
  network,
  store,
});

export default function PortfolioContainer() {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query portfolioContainerQuery {
          chris {
            work {
              ...portfolio_works
            }
          }
        }
      `}
      variables={{}}
      render={({ props }) => {
        if (!props || !props.chris || !props.chris.work) return null;
        return <Portfolio works={props && props.chris && props.chris.work} />;
      }}
    />
  );
}
