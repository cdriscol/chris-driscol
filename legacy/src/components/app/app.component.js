//@flow
import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Helmet from 'react-helmet';
import { ErrorBoundary } from '../common';
import { Analytics } from '../analytics';
import type { app_chris } from './__generated__/app_chris.graphql';

type Props = {
  chris: app_chris,
  children: React.Node,
};

const App = ({ children, chris }: Props) => (
  <div>
    <Helmet title={chris.title} titleTemplate="%s">
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="noindex, nofollow" />

      <meta name="description" content={chris.description} />
      <meta
        name="google-site-verification"
        content="R2ugoW2o9U7kLx2-Xtmmb-kA8lJGqsqvqvGv2NKCxrI"
      />

      <meta property="og:site_name" content={chris.title} />
      <meta property="og:title" content={chris.title} />
      <meta property="og:description" content={chris.description} />
      <meta property="og:url" content="https://chrisdriscol.com" />
      <meta
        property="og:image"
        content="https://chrisdriscol.com/public/images/header-bg.jpg"
      />
      <meta property="og:type" content="website" />

      <meta name="twitter:title" content={chris.title} />
      <meta name="twitter:description" content={chris.description} />
      <meta name="twitter:url" content="https://chrisdriscol.com" />
      <meta
        name="twitter:image"
        content="https://chrisdriscol.com/public/images/header-bg.jpg"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.23.0/theme/solarized.css"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700|Source+Code+Pro:400,700"
        rel="stylesheet"
      />
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="public/images/favicon/apple-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="public/images/favicon/apple-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="public/images/favicon/apple-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="public/images/favicon/apple-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="public/images/favicon/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="public/images/favicon/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="public/images/favicon/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="public/images/favicon/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="public/images/favicon/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="public/images/favicon/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="public/images/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="public/images/favicon/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="public/images/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="public/images/favicon/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-TileImage"
        content="img/favicon/ms-icon-144x144.png"
      />
      <meta name="theme-color" content="#ffffff" />

      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js" />
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js" />
    </Helmet>
    <Analytics>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Analytics>
  </div>
);

export default createFragmentContainer(
  App,
  graphql`
    fragment app_chris on Chris {
      title
      description
    }
  `,
);
