// @flow
import React from 'react';
import classNames from 'classnames';
import { createFragmentContainer, graphql } from 'react-relay';
import type { timelineItem_experience } from './__generated__/timelineItem_experience.graphql';

type Props = {
  inverted: ?boolean,
  experience: timelineItem_experience,
};

function TimelineItem({ inverted, experience }: Props) {
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

TimelineItem.defaultProps = {
  inverted: false,
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
