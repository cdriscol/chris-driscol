import React from 'react';
import classNames from 'classnames';
import './header.css';

export default function Header() {
  return (
    <header>
      <div className="container">
        <div className="intro-text">
          <div className="intro-lead-in">Welcome To My Website!</div>
          <div className="intro-heading">{`It's Nice To Meet You`}</div>
          <a
            href="#aboutme"
            className={classNames('page-scroll', 'btn', 'btn-xl')}
          >
            Learn about me
          </a>
        </div>
      </div>
    </header>
  );
}
