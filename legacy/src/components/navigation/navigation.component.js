// @flow
import * as React from 'react';
import classNames from 'classnames';
import { animateScroll as scroll } from 'react-scroll';
import ReactGA from 'react-ga';
import FaLinkedIn from 'react-icons/lib/fa/linkedin';
import FaGithub from 'react-icons/lib/fa/github-alt';
import { createFragmentContainer, graphql } from 'react-relay';
import { ScrollLink } from '../common';
import './navigation.css';
import type { navigation_social } from './__generated__/navigation_social.graphql';

type Props = {
  social: navigation_social,
};

type State = {
  shrink: boolean,
};

class Navigation extends React.Component<Props, State> {
  didScroll: boolean;
  timeout: any;
  toggleRef: ?HTMLButtonElement;

  state = {
    didScroll: false,
    shrink: false,
  };

  componentDidMount() {
    window.addEventListener(
      'scroll',
      () => {
        if (!this.didScroll) {
          this.didScroll = true;
          this.timeout = setTimeout(this.scrollPage, 250);
        }
      },
      false,
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  scrollPage = () => {
    this.didScroll = false;
    const scrollY = window.pageYOffset || 0;
    const shrink = scrollY >= 300;
    if (this.state.shrink !== shrink) this.setState({ shrink });
  };

  hideNavToggle = () => {
    const showingMobileMenu =
      this.toggleRef &&
      this.toggleRef.getAttribute('aria-expanded') === 'true';
    if (!showingMobileMenu) return;
    this.toggleRef && this.toggleRef.click();
  };

  scrollToTop = event => {
    event.preventDefault();
    scroll.scrollToTop({
      duration: 1500,
      smooth: 'easeInOutQuart',
    });
    this.hideNavToggle();
  };

  renderNavLink = (to, label) => {
    const handleClick = () => {
      ReactGA.event({
        category: 'Navigation',
        action: label,
      });
      this.hideNavToggle();
    };
    return (
      <ScrollLink onClick={handleClick} to={to} activeClass="active" spy>
        {label}
      </ScrollLink>
    );
  };

  render() {
    const { social } = this.props;

    return (
      <nav
        className={classNames(
          'navbar',
          'navbar-default',
          'navbar-fixed-top',
          this.state.shrink && 'navbar-shrink',
        )}
      >
        <div className="container">
          <div className="navbar-header page-scroll">
            <button
              ref={e => {
                this.toggleRef = e;
              }}
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <h1>
              <a
                tabIndex={0}
                role="button"
                className={classNames('navbar-brand page-scroll')}
                onClick={this.scrollToTop}
              >
                Chris Driscol
              </a>
            </h1>
          </div>
          <div
            className={classNames('collapse', 'navbar-collapse')}
            id="bs-example-navbar-collapse-1"
          >
            <ul className={classNames('nav', 'navbar-nav', 'navbar-right')}>
              <li className="hidden">
                <a href="" onClick={this.scrollToTop}>
                  {}
                </a>
              </li>
              <li>{this.renderNavLink('aboutme', 'About me')}</li>
              <li>{this.renderNavLink('skills', 'Skills')}</li>
              <li>{this.renderNavLink('experience', 'Experience')}</li>
              <li>{this.renderNavLink('portfolio', 'My work')}</li>
              <li>{this.renderNavLink('contactme', 'Say hi')}</li>
              <li>
                <a
                  href={social.linkedIn}
                  rel="noopener noreferrer"
                  target="_blank"
                  title="LinkedIn"
                >
                  <FaLinkedIn />
                </a>
              </li>
              <li>
                <a
                  href={social.github}
                  rel="noopener noreferrer"
                  target="_blank"
                  title="Github"
                >
                  <FaGithub />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default createFragmentContainer(
  Navigation,
  graphql`
    fragment navigation_social on Social {
      github
      linkedIn
    }
  `,
);
