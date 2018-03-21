// tslint:disable:no-implicit-dependencies
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import SpecialButton from './SpecialButton';

storiesOf('SpecialButton', module)
  .add('with text', () => (
    <SpecialButton onClick={action('clicked')}>Hello</SpecialButton>
  ))
  .add('with some emoji', () => (
    <SpecialButton onClick={action('clicked')}>😀 😎 👍 💯</SpecialButton>
  ));
