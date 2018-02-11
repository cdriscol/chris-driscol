// @flow
import * as React from 'react';
import classNames from 'classnames';
import './about.css';
import FaHeart from 'react-icons/lib/fa/heart';
import { createFragmentContainer, graphql } from 'react-relay';
import type { about_about } from './__generated__/about_about.graphql';

type Props = {
  about: about_about,
};

function About({ about }: Props) {
  const renderDescription = str => (
    <p key={str} className="large" dangerouslySetInnerHTML={{ __html: str }} />
  );

  return (
    <section className={classNames('home-section', 'aboutme')} id="aboutme">
      <div className="container">
        <div className="row">
          <div className={classNames('col-lg-12', 'text-center')}>
            <h2 className="section-heading">About Me</h2>
            <p className={classNames('section-subheading', 'text-muted')}>
              This should help you get to know more about me..
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8">
            {about.description.map(str => renderDescription(str))}
          </div>
          <div className="col-sm-4">
            <div className="me">
              <img
                src={about.imageUrl}
                className={classNames('img-responsive', 'img-circle')}
                alt={about.imageTitle}
              />
              <h1>{about.imageTitle}</h1>
              <h2 className="text-muted">{about.imageCaption}</h2>
            </div>
          </div>
          <div
            className={classNames(
              'col-lg-8',
              'col-lg-offset-2',
              'text-center',
              'about-tag',
            )}
          >
            <p className={classNames('large', 'text-muted')}>
              I <FaHeart /> working on <strong>Agile teams</strong> motivated
              by <strong>delivering customer value</strong> early and often.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default createFragmentContainer(
  About,
  graphql`
    fragment about_about on About {
      description
      tagLine
      imageUrl
      imageTitle
      imageCaption
    }
  `,
);
