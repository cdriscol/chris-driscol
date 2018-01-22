import React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { createFragmentContainer, graphql } from 'react-relay';

function TimelineItem({ inverted, experience }) {
  return (
    <li className={inverted ? 'timeline-inverted' : ''}>
      <div className="timeline-image">
        <img
          className={classNames('img-circle', 'img-responsive')}
          src={experience.imageUrl}
          alt={experience.location}
        />
      </div>
      <div className="timeline-panel">
        <div className="timeline-heading">
          <h4 className="timeline-year">{experience.duration}</h4>
          <h5 className="subheading">{experience.location}</h5>
        </div>
        <div className={classNames('timeline-body', 'text-muted')}>
          <p
            className="text-muted"
            dangerouslySetInnerHTML={{ __html: experience.description }}
          />
        </div>
      </div>
    </li>
  );
}

TimelineItem.propTypes = {
  inverted: PropTypes.bool,
  experience: PropTypes.shape({
    duration: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }),
};

export default createFragmentContainer(
  TimelineItem,
  graphql`
    fragment timelineItem_experience on Experience {
      duration
      location
      title
      description
      imageUrl
    }
  `,
);
