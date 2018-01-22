import React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { createFragmentContainer, graphql } from 'react-relay';
import { ScrollLink } from '../common';
import TimeLineItem from './timeline-item.component';
import './timeline.css';

function Experience({ experiences }) {
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
              {experiences.map((item, index) => (
                <TimeLineItem
                  key={item.imageUrl}
                  inverted={index % 2 === 1}
                  experience={item}
                />
              ))}
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

Experience.propTypes = {
  experiences: PropTypes.arrayOf(PropTypes.object),
};

export default createFragmentContainer(
  Experience,
  graphql`
    fragment experience_experiences on Experience @relay(plural: true) {
      imageUrl
      ...timelineItem_experience
    }
  `,
);
