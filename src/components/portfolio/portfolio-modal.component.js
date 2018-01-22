import React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { createFragmentContainer, graphql } from 'react-relay';
import FaTimes from 'react-icons/lib/fa/times-circle';
import './portfolio-modal.css';

function PortfolioModal({ work, onClose }) {
  return (
    <div className={classNames('portfolio-modal')}>
      <div className="modal-content">
        <div
          role="button"
          tabIndex={-1}
          className="close-modal"
          onClick={onClose}
        >
          <div className="lr">
            <div className="rl" />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className={classNames('col-lg-8', 'col-lg-offset-2')}>
              <div className="modal-body">
                <h2 className="modal-title">{work.title}</h2>
                <p
                  className={classNames('item-intro', 'text-muted')}
                  dangerouslySetInnerHTML={{ __html: work.subTitle }}
                />
                <img
                  className={classNames('img-responsive', 'img-centered')}
                  src={work.imageUrl}
                  alt=""
                />
                {work.description.map(desc => (
                  <p key={desc} dangerouslySetInnerHTML={{ __html: desc }} />
                ))}
                <h4 className="modal-tech">technologies</h4>
                <p>{work.technologies.join(', ')}</p>
                <ul className="list-inline">
                  <li>Date: {work.date}</li>
                  <li>{work.location}</li>
                  <li>
                    {work.link && (
                      <a
                        rel="noopener noreferrer"
                        href={work.link}
                        target="_blank"
                      >
                        {work.link}
                      </a>
                    )}
                  </li>
                </ul>
                <button
                  onClick={onClose}
                  type="button"
                  className={classNames('btn btn-primary')}
                >
                  <FaTimes /> Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

PortfolioModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  work: PropTypes.shape({
    title: PropTypes.string,
    technologies: PropTypes.arrayOf(PropTypes.string),
    date: PropTypes.string,
    description: PropTypes.arrayOf(PropTypes.string),
    subTitle: PropTypes.string,
    location: PropTypes.string,
    imageUrl: PropTypes.string,
    link: PropTypes.string,
  }),
};

export default createFragmentContainer(
  PortfolioModal,
  graphql`
    fragment portfolioModal_work on Work {
      title
      technologies
      date
      description
      subTitle
      location
      imageUrl
      link
    }
  `,
);
