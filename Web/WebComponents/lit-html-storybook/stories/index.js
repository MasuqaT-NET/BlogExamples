import {storiesOf} from '@storybook/polymer';

storiesOf('anchor', module).add(
    'simple',
    () => '<a href="http://example.com/">Foo</a>'
).add(
    'title',
    () => '<a href="http://example.com/" title="This is bar.">Bar</a>'
);