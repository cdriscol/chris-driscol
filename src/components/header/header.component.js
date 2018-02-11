// @flow
import React from 'react';
import classNames from 'classnames';
import { ScrollLink } from '../common';
import './header.css';

export default function Header() {
  return (
    <header>
      <div className="container">
        <div className="intro-text">
          <div className="intro-lead-in">Welcome To My Website!</div>
          <div className="intro-heading">{`It's Nice To Meet You`}</div>
          <ScrollLink
            to="aboutme"
            className={classNames('page-scroll', 'btn', 'btn-xl')}
          >
            Learn about me
          </ScrollLink>
        </div>
      </div>
    </header>
  );
}
