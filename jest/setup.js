// @flow
import React from 'react';

jest.mock('react-relay', () => ({
  createFragmentContainer: component => component,
}));

jest.mock('react-ga', () => ({
  initialize: () => {},
  pageview: () => {},
}));

jest.mock(
  'react-typed',
  () =>
    function MockTyped(props) {
      return <div {...props} />;
    },
);
