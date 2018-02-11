// // @flow
import React from 'react';
import classNames from 'classnames';
import { createFragmentContainer, graphql } from 'react-relay';
import PortfolioItem from './portfolio-item.component';
import './portfolio.css';

type Props = {
  works: $ReadOnlyArray<{|
    +title: ?string,
  |}>,
};

function Portfolio({ works }: Props) {
  const workItems = works.map(work => {
    /* $FlowFixMe */
    return <PortfolioItem key={work.title} work={work} />;
  });
  const renderItems = [];
  for (let i = 0; i < workItems.length; i++) {
    renderItems.push(workItems[i]);
    if (i % 3 === 2) {
      renderItems.push(
        <div key={`clear${i}`} className={classNames('clearfix hidden-sm')} />,
      );
    }
  }
  return (
    <section
      id="portfolio"
      className={classNames('home-section', 'bg-light-gray', 'portfolio')}
    >
      <div className="container">
        <div className="row">
          <div className="text-center">
            <h2 className="section-heading">My Work</h2>
            <p className={classNames('section-subheading', 'text-muted')}>
              {`These are just some of the things I have worked on over the years, some were done with the help of extremely talented colleagues.`}
            </p>
          </div>
        </div>
        <div className="row">{renderItems}</div>
      </div>
    </section>
  );
}

export default createFragmentContainer(
  Portfolio,
  graphql`
    fragment portfolio_works on Work @relay(plural: true) {
      title
      ...portfolioItem_work
    }
  `,
);
