// @flow
import BrowserProtocol from 'farce/lib/BrowserProtocol';
import createInitialFarceRouter from 'found/lib/createInitialFarceRouter';
import React from 'react';
import ReactDOM from 'react-dom';
// $FlowFixMe
import 'bootstrap/dist/css/bootstrap.css';
import 'graphiql/graphiql.css';
import 'jquery/dist/jquery';
import 'bootstrap/dist/js/bootstrap';
import './styles';

import { ClientFetcher } from './fetcher';
import {
  createResolver,
  historyMiddlewares,
  render,
  routeConfig,
} from './routes';

(async () => {
  // eslint-disable-next-line no-underscore-dangle
  const fetcher = new ClientFetcher('/graphql', window.__RELAY_PAYLOADS__);
  const resolver = createResolver(fetcher);

  const Router = await createInitialFarceRouter({
    historyProtocol: new BrowserProtocol(),
    historyMiddlewares,
    routeConfig,
    resolver,
    render,
  });

  ReactDOM.render(
    <Router resolver={resolver} />,
    document.getElementById('root'),
  );
})();
