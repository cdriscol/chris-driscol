import React from 'react';
import * as PropTypes from 'prop-types';
import { graphql, createFragmentContainer } from 'react-relay';

function HomePage({ viewer }) {
  return <div>Home Page {viewer.status}</div>;
}

HomePage.propTypes = {
  viewer: PropTypes.shape({
    status: PropTypes.string,
  }),
};

export default createFragmentContainer(
  HomePage,
  graphql`
    fragment homePage_viewer on Viewer {
      status
    }
  `,
);
