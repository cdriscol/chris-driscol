// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Component from './experience.component';

let mockExperiences = 0;
const createMockExperience = () => {
  mockExperiences++;
  return {
    imageUrl: `https://image/url/${mockExperiences}`,
    duration: `duration ${mockExperiences}`,
    location: `location ${mockExperiences}`,
    title: `title ${mockExperiences}`,
    description: `description ${mockExperiences}`,
  };
};

const fixtures = {
  viewer: {},
  experiences: [
    createMockExperience(),
    createMockExperience(),
    createMockExperience(),
    createMockExperience(),
    createMockExperience(),
  ],
};

it('renders correctly', () => {
  const tree = renderer.create(<Component {...fixtures} />).toJSON();
  expect(tree).toMatchSnapshot();
});
