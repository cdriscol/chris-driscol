import React from 'react';
import classNames from 'classnames';
import './navigation.css';

function Navigation() {
  return (
    <nav
      className={classNames('navbar', 'navbar-default', 'navbar-fixed-top')}
    >
      <div className="container">
        <div className="navbar-header page-scroll">
          <button
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
              className={classNames('navbar-brand page-scroll')}
              href="#page-top"
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
              <a href="#page-top">{}</a>
            </li>
            <li>
              <a href="#aboutme">About me</a>
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

export default Navigation;
