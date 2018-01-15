import React from 'react';
import Helmet from 'react-helmet';
import * as PropTypes from 'prop-types';
import { ErrorBoundary } from '../common';

const App = ({ children }) => (
  <div>
    <Helmet
      title="Chris Driscol"
      titleTemplate="%s"
      meta={[
        { charset: 'utf-8' },
        {
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=edge',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
      ]}
    />
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

App.propTypes = { children: PropTypes.node };

export default App;
