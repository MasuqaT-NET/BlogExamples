import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SpecialButton from './SpecialButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  // tslint:disable-next-line:no-empty
  ReactDOM.render(<SpecialButton onClick={() => {}} children="a" />, div);
});
