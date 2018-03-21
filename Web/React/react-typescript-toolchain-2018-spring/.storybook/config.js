import { configure } from '@storybook/react';

// automatically import all files ending in *.stories.tsx or jsx
const req = require.context('../src', true, /\.stories\.[jt]sx?$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
