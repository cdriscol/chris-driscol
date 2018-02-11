// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import About from './about.component';

const mockAbout = {
  tagLine: 'tag line',
  imageUrl: 'https://fake/image',
  imageTitle: 'image title',
  imageCaption: 'image caption',
  description: ['description 1', 'description 2'],
};

it('renders correctly', () => {
  const tree = renderer.create(<About about={mockAbout} />).toJSON();
  expect(tree).toMatchSnapshot();
});
