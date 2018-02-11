// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Component from './skills.component';

const fixtures = {
  skills: {
    loves: ['loves1', 'loves2', 'loves3'],
    languages: ['languages1', 'languages2', 'languages3'],
    tools: ['tools1', 'tools2', 'tools3'],
    technologies: ['technologies1', 'technologies2', 'technologies3'],
  },
};

it('renders correctly', () => {
  const tree = renderer.create(<Component {...fixtures} />).toJSON();
  expect(tree).toMatchSnapshot();
});
