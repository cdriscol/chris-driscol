import React from 'react';
import * as PropTypes from 'prop-types';
import { graphql, createFragmentContainer } from 'react-relay';

function HomePage({ viewer }) {
  return <div>{viewer.title}</div>;
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
