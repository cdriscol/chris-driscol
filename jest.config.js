// @flow
module.exports = {
  testMatch: ['**/?(*.)(spec).js'],
  moduleFileExtensions: ['js', 'json'],
  setupFiles: ['<rootDir>/jest/setup.js'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/node_modules/jest-css-modules',
  },
};
