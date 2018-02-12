// @flow
import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import Navigation from '../navigation';
import Header from '../header';
import About from '../about';
import Skills from '../skills';
import Experience from '../experience';
import Portfolio from '../portfolio';
import Contact from '../contact';
import Footer from '../footer';
import BuiltWith from '../built-with';
import type { homePage_viewer } from './__generated__/homePage_viewer.graphql';

type Props = {
  viewer: homePage_viewer,
};

function HomePage({ viewer }: Props) {
  return (
    <div>
      {
        /* $FlowIssue: https://github.com/facebook/relay/issues/2316 */
        <Navigation social={viewer.social} />
      }
      <Header />
      {
        /* $FlowIssue */
        <About about={viewer.about} />
      }
      <BuiltWith />
      {
        /* $FlowIssue */
        <Skills skills={viewer.skills} />
      }
      {
        /* $FlowIssue */
        <Experience experiences={viewer.experience} />
      }
      {
        /* $FlowIssue */
        <Portfolio works={viewer.work} />
      }
      {
        /* $FlowIssue */
        <Contact viewer={viewer} />
      }
      {
        /* $FlowIssue */
        <Footer social={viewer.social} />
      }
    </div>
  );
}

export default createFragmentContainer(
  HomePage,
  graphql`
    fragment homePage_viewer on Viewer {
      title
      ...contact_viewer
      about {
        ...about_about
      }
      social {
        ...navigation_social
        ...footer_social
      }
      skills {
        ...skills_skills
      }
      experience {
        ...experience_experiences
      }
      work {
        ...portfolio_works
      }
    }
  `,
);
