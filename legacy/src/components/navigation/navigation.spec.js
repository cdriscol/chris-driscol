// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Component from './navigation.component';

const fixtures = {
  social: {
    linkedIn: 'linkedIn',
    github: 'github',
  },
};

it('renders correctly', () => {
  const tree = renderer.create(<Component {...fixtures} />).toJSON();
  expect(tree).toMatchSnapshot();
});
