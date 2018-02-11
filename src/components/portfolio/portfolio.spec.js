// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Component from './portfolio.component';

let mockWorks = 0;
const createMockWork = () => {
  mockWorks++;
  return {
    title: `title ${mockWorks}`,
    imageUrl: `https://image/url/${mockWorks}`,
    location: `location ${mockWorks}`,
    duration: `duration ${mockWorks}`,
    description: `description ${mockWorks}`,
    technologies: `technologies ${mockWorks}`,
    subTitle: `subTitle ${mockWorks}`,
    link: `link ${mockWorks}`,
  };
};

const fixtures = {
  works: [
    createMockWork(),
    createMockWork(),
    createMockWork(),
    createMockWork(),
    createMockWork(),
  ],
};

it('renders correctly', () => {
  const tree = renderer.create(<Component {...fixtures} />).toJSON();
  expect(tree).toMatchSnapshot();
});
