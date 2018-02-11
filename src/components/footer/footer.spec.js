// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Component from './footer.component';

const fixtures = {
  social: {
    email: 'email',
    linkedIn: 'linkedIn',
    github: 'github',
  },
};

it('renders correctly', () => {
  const tree = renderer.create(<Component {...fixtures} />).toJSON();
  expect(tree).toMatchSnapshot();
});
