// @flow
jest.mock('react-relay', () => ({
  createFragmentContainer: component => component,
}));
