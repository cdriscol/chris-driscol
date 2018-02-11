// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Component from './app.component';

const fixtures = {
  viewer: {
    title: 'title',
    description: 'description',
  },
};

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Component {...fixtures}>
        <div />
      </Component>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
