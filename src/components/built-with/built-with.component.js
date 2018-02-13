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
                'This site is powered by GraphQL, you can query all this sites data (and more) by using my '
              }
              <a title="GraphiQL Explorer" href="/resume" target="_blank">
                GraphiQL Explorer
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
