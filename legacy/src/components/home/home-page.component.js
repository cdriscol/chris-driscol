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
import type { homePage_chris } from './__generated__/homePage_chris.graphql';

type Props = {
  chris: homePage_chris,
};

function HomePage({ chris }: Props) {
  return (
    <div>
      {
        /* $FlowIssue: https://github.com/facebook/relay/issues/2316 */
        <Navigation social={chris.social} />
      }
      <Header />
      {
        /* $FlowIssue */
        <About about={chris.about} />
      }
      <BuiltWith />
      {
        /* $FlowIssue */
        <Skills skills={chris.skills} />
      }
      {
        /* $FlowIssue */
        <Experience experiences={chris.experience} />
      }
      {
        /* $FlowIssue */
        <Portfolio works={chris.work} />
      }
      {
        /* $FlowIssue */
        <Contact chris={chris} />
      }
      {
        /* $FlowIssue */
        <Footer social={chris.social} />
      }
    </div>
  );
}

export default createFragmentContainer(
  HomePage,
  graphql`
    fragment homePage_chris on Chris {
      title
      ...contact_chris
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
