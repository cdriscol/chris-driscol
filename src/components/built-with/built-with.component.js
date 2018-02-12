// @flow
import React from 'react';
import classNames from 'classnames';
import './built-with.css';

export default function BuiltWith() {
  return (
    <section className={classNames('built-with')} id="builtWith">
      <div className="container">
        <div className="row">
          <div className={classNames('col-lg-12', 'text-center')}>
            <p className="text-muted">
              {
                'This site is powered by GraphQL, you can query all this sites data by using my '
              }
              <a title="GraphQL Playground" href="/playground" target="_blank">
                GraphQL Playground
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
