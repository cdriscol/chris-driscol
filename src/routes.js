// @flow
import queryMiddleware from 'farce/lib/queryMiddleware';
import createRender from 'found/lib/createRender';
import makeRouteConfig from 'found/lib/makeRouteConfig';
import Route from 'found/lib/Route';
import { Resolver } from 'found-relay';
import React from 'react';
import { graphql } from 'react-relay';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

export const historyMiddlewares = [queryMiddleware];

import { App, HomePage, ResumePage } from './components';

export function createResolver(fetcher: any) {
  const environment = new Environment({
    network: Network.create((...args) => fetcher.fetch(...args)),
    store: new Store(new RecordSource()),
  });

  return new Resolver(environment);
}

export const routeConfig = makeRouteConfig(
  <Route
    path="/"
    Component={App}
    query={graphql`
      query routes_App_Query {
        viewer {
          ...app_viewer
        }
      }
    `}
  >
    <Route
      path=""
      Component={HomePage}
      query={graphql`
        query routes_HomePage_Query {
          viewer {
            ...homePage_viewer
          }
        }
      `}
    />
    <Route path="resume" Component={ResumePage} />
  </Route>,
);

export const render = createRender({});
