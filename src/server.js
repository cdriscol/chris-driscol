// @flow
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import path from 'path';

// Webpack Requirements
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';

import config from './config';

// Initialize the Express App
const app = express();

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
    }),
  );
  app.use(webpackHotMiddleware(compiler));
}

import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { schema } from './graphql';
import graphQLHTTP from 'express-graphql';
import {
  createResolver,
  historyMiddlewares,
  render,
  routeConfig,
} from './routes';
import serialize from 'serialize-javascript';
import { ServerFetcher } from './fetcher';
import { getFarceResult } from 'found/lib/server/index';

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(express.static(path.resolve(__dirname, '../dist/client')));

app.use('/graphql', graphQLHTTP({ schema, graphiql: true }));
app.use('/public', express.static('public'));

// $FlowFixMe
app.use(async (req, res) => {
  const head = Helmet.rewind();
  const fetcher = new ServerFetcher(`http://localhost:${config.port}/graphql`);

  const { redirect, status, element } = await getFarceResult({
    url: req.url,
    historyMiddlewares,
    routeConfig,
    resolver: createResolver(fetcher),
    render,
  });

  if (redirect) {
    res.redirect(302, redirect.url);
    return;
  }

  const assetsManifest = process.env.webpackAssets
    ? JSON.parse(process.env.webpackAssets)
    : {};
  const chunkManifest =
    process.env.webpackChunkAssets &&
    JSON.parse(process.env.webpackChunkAssets);

  res.status(status).send(`
<!DOCTYPE html>
  <html>
    <head>
      ${head.base.toString()}
      ${head.title.toString()}
      ${head.meta.toString()}
      ${head.link.toString()}
      ${head.script.toString()}
      ${
        process.env.NODE_ENV === 'production'
          ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />`
          : ''
      }
    </head>
    <body>
      <div id="root">${ReactDOMServer.renderToString(element)}</div>
      <script>
        window.__RELAY_PAYLOADS__ = ${serialize(fetcher, { isJSON: true })};
        ${
          process.env.NODE_ENV === 'production'
            ? `//<![CDATA[
                      window.webpackManifest = ${JSON.stringify(
                        chunkManifest,
                      )};
                    //]]>`
            : ''
        }
      </script>
      <script src='${
        process.env.NODE_ENV === 'production'
          ? assetsManifest['/vendor.js']
          : '/vendor.js'
      }'></script>
      <script src='${
        process.env.NODE_ENV === 'production'
          ? assetsManifest['/app.js']
          : '/app.js'
      }'></script>
    </body>
</html>
`);
});

app.listen(config.port, (error: ?Error) => {
  if (!error) console.log(`App is listening on port ${config.port}..`);
});

export default app;
