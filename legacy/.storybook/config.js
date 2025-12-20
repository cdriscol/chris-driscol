// @flow
import React from 'react';
import { configure, setAddon } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import infoAddon, { setDefaults } from '@storybook/addon-info';

setAddon(infoAddon);

// $FlowFixMe
const req = require.context('../src', true, /\.story\.jsx?$/);

const loadStories = () => {
  req.keys().forEach((filename) => req(filename));
};

setDefaults({
  inline: true,
  header:false,
});


setOptions({
  name: 'Chris Driscol',
  url: 'https://github.com/cdriscol/chris-driscol',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: true,
  sortStoriesByKind: true,
});

configure(loadStories, module);
