// @flow
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Component from './home-page.component';

const fixtures = {
  chris: {
    social: {},
    about: {},
    skills: {},
    experience: [],
    work: [],
  },
};

it('renders correctly', () => {
  const renderer = new ShallowRenderer();
  const tree = renderer.render(<Component {...fixtures} />);
  expect(tree).toMatchSnapshot();
});
