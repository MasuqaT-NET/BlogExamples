import {storiesOf} from '@storybook/polymer';

import '../src/lhs-button';

storiesOf('anchor', module).add(
    'simple',
    () => '<a href="http://example.com/">Foo</a>'
).add(
    'title',
    () => '<a href="http://example.com/" title="This is bar.">Bar</a>'
);

storiesOf('lhs-button', module).add(
    'simple',
    () => '<lhs-button>a</lhs-button>'
).add(
    'with link',
    () => '<lhs-button link="http://google.com/">Google</lhs-button>'
).add(
    'wide with stylesheet',
    () => '<style>lhs-button { width: 100px; }</style><lhs-button>a</lhs-button>'
).add(
    'wide with stylesheet x2',
    () => '<style>lhs-button { width: 100px; }</style><lhs-button>a</lhs-button><lhs-button>b</lhs-button>'
);

import {html, render} from 'lit-html';

storiesOf('Dynamic', module).add(
    'wrap',
    () => {
      const root = document.createElement('div');
      render(html`<lhs-button link="http://google.com/">a</lhs-button>`, root);
      const button = root.querySelector("lhs-button");
      // do something here.
      return root;
    }
);