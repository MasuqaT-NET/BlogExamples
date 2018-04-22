import { configure } from '@storybook/polymer';

function loadStories() {
  require('../stories/index.js');
}

configure(loadStories, module);