import React from 'react';
import classNames from 'classnames';
import { Link, animateScroll as scroll } from 'react-scroll';
import './navigation.css';

class Navigation extends React.Component {
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
    const scrollY = window.pageYOffset || document.documentElement;
    const shrink = scrollY >= 300;
    if (this.state.shrink !== shrink) this.setState({ shrink });
  };

  render() {
    const hideNavToggle = () => {
      const showingMobileMenu =
        this.toggleRef &&
        this.toggleRef.getAttribute('aria-expanded') === 'true';
      if (!showingMobileMenu) return;
      this.toggleRef.click();
    };

    const scrollToTop = event => {
      event.preventDefault();
      scroll.scrollToTop({
        duration: 1500,
        smooth: 'easeInOutQuart',
      });
      hideNavToggle();
    };

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
                onClick={scrollToTop}
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
                <a href="" onClick={scrollToTop}>
                  {}
                </a>
              </li>
              <li>
                <Link
                  onClick={hideNavToggle}
                  to="aboutme"
                  activeClass="active"
                  spy
                  smooth="easeInOutQuart"
                  duration={1500}
                >
                  About me
                </Link>
              </li>
              <li>
                <a href="#skills">Skills</a>
              </li>
              <li>
                <a href="#experience">Experience</a>
              </li>
              <li>
                <a href="#portfolio">My work</a>
              </li>
              <li>
                <a href="#contactme">Say hi</a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/chrisdriscol/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className={classNames('fa', 'fa-linkedin')} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;
