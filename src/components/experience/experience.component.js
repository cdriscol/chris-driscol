// @flow
import React from 'react';
import classNames from 'classnames';
import { createFragmentContainer, graphql } from 'react-relay';
import { ScrollLink } from '../common';
import TimeLineItem from './timeline-item.component';
import './timeline.css';
import type { experience_experiences } from './__generated__/experience_experiences.graphql';

type Props = {
  experiences: experience_experiences,
};

function Experience({ experiences }: Props) {
  const renderItem = (item: any, index: number) => {
    /* $FlowFixMe */
    return (
      <TimeLineItem key={index} inverted={index % 2 === 1} experience={item} />
    );
  };

  return (
    <section className="home-section" id="experience">
      <div className="container">
        <div className="row">
          <div className="text-center">
            <h2 className="section-heading">My Experience</h2>
            <p className={classNames('section-subheading', 'text-muted')}>
              {`Here's what I've been up to..`}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <ul className="timeline">
              {experiences.map(renderItem)}
              <li
                className={classNames('timeline-inverted', 'timeline-final')}
              >
                <div className="timeline-image">
                  <ScrollLink to="contactme">
                    <h4 className="hearmore">
                      Want to
                      <br />
                      hear
                      <br />
                      more?
                    </h4>
                  </ScrollLink>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default createFragmentContainer(
  Experience,
  graphql`
    fragment experience_experiences on Experience @relay(plural: true) {
      imageUrl
      ...timelineItem_experience
    }
  `,
);
