import React from 'react';
import * as PropTypes from 'prop-types';
import { graphql, createFragmentContainer } from 'react-relay';
import Navigation from '../navigation';
import Header from '../header';

// eslint-disable-next-line
function HomePage({ viewer }) {
  return (
    <div>
      <Navigation />
      <Header />
    </div>
  );
}

HomePage.propTypes = {
  viewer: PropTypes.shape({
    title: PropTypes.string,
  }),
};

export default createFragmentContainer(
  HomePage,
  graphql`
    fragment homePage_viewer on Viewer {
      title
    }
  `,
);
