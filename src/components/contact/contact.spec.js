// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Component from './contact.component';

const fixtures = {
  viewer: {},
  relay: {
    environment: {},
  },
};

it('renders correctly', () => {
  const tree = renderer.create(<Component {...fixtures} />).toJSON();
  expect(tree).toMatchSnapshot();
});
