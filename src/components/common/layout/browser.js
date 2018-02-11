// @flow
import { detect } from 'detect-browser';

const browser = detect();

export const isIE = () => browser && browser.name === 'ie';
export const getBrowserMajorVersion = () =>
  browser && browser.version && browser.version.split('.')[0];
