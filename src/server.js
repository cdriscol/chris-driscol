// @flow
import path from 'path';
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';

import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import graphQLHTTP from 'express-graphql';

import serialize from 'serialize-javascript';
import { getFarceResult } from 'found/lib/server/index';

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

import { schema } from './graphql';
import {
  createResolver,
  historyMiddlewares,
  render,
  routeConfig,
} from './routes';
import { ServerFetcher } from './fetcher';

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(express.static(path.resolve(__dirname, '../dist/client')));

app.use('/graphql', graphQLHTTP({ schema }));
app.use('/public', express.static('public'));

// $FlowFixMe
app.use(async (req, res, next) => {
  if (req.path === '/graphql') next();
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
<!--
This site was created by..
 .d8888b.  888              d8b               8888888b.          d8b                           888
d88P  Y88b 888              Y8P               888  "Y88b         Y8P                           888
888    888 888                                888    888                                       888
888        88888b.  888d888 888 .d8888b       888    888 888d888 888 .d8888b   .d8888b .d88b.  888
888        888 "88b 888P"   888 88K           888    888 888P"   888 88K      d88P"   d88""88b 888
888    888 888  888 888     888 "Y8888b.      888    888 888     888 "Y8888b. 888     888  888 888
Y88b  d88P 888  888 888     888      X88      888  .d88P 888     888      X88 Y88b.   Y88..88P 888
 "Y8888P"  888  888 888     888  88888P'      8888888P"  888     888  88888P'  "Y8888P "Y88P"  888
feel free to take a look around!
-->
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
