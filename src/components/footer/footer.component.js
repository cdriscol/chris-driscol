import React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import './footer.css';
import { createFragmentContainer, graphql } from 'react-relay';
import FaLinkedIn from 'react-icons/lib/fa/linkedin';
import FaGithub from 'react-icons/lib/fa/github-alt';

function Footer({ social }) {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <span className="copyright">
              Copyright &copy; <strong>Chris Driscol</strong>{' '}
              {new Date().getFullYear()}
            </span>
          </div>
          <div className="col-md-4">
            <ul className={classNames('list-inline', 'social-buttons')}>
              <li>
                <a href={social.linkedIn} target="_blank">
                  <FaLinkedIn />
                </a>
              </li>
              <li>
                <a href={social.github} target="_blank">
                  <FaGithub />
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <ul className={classNames('list-inline', 'quicklinks')}>
              <li>
                <a href={`mailto:${social.email}`}>{social.email}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  social: PropTypes.shape({
    github: PropTypes.string.isRequired,
    linkedIn: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
};

export default createFragmentContainer(
  Footer,
  graphql`
    fragment footer_social on Social {
      email
      linkedIn
      github
    }
  `,
);
