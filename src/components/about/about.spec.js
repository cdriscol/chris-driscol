// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Component from './about.component';

const fixtures = {
  about: {
    tagLine: 'tag line',
    imageUrl: 'https://fake/image',
    imageTitle: 'image title',
    imageCaption: 'image caption',
    description: ['description 1', 'description 2'],
  },
};

it('renders correctly', () => {
  const tree = renderer.create(<Component {...fixtures} />).toJSON();
  expect(tree).toMatchSnapshot();
});
