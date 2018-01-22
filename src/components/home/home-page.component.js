import React from 'react';
import * as PropTypes from 'prop-types';
import { graphql, createFragmentContainer } from 'react-relay';
import Navigation from '../navigation';
import Header from '../header';
import About from '../about';

// eslint-disable-next-line
function HomePage({ viewer }) {
  return (
    <div>
      <Navigation social={viewer.social} />
      <Header />
      <About about={viewer.about} />
    </div>
  );
}

HomePage.propTypes = {
  viewer: PropTypes.shape({
    title: PropTypes.string,
    about: PropTypes.object,
    social: PropTypes.object,
  }),
};

export default createFragmentContainer(
  HomePage,
  graphql`
    fragment homePage_viewer on Viewer {
      title
      about {
        ...about_about
      }
      social {
        ...navigation_social
      }
    }
  `,
);
