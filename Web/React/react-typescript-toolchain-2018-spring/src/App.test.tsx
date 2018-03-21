// tslint:disable-next-line:no-implicit-dependencies
import * as enzyme from 'enzyme';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders the root', () => {
  const app = enzyme.shallow(<App />);
  expect(app.find('.root').exists()).toBe(true);
});

it('renders the header', () => {
  const app = enzyme.shallow(<App />);
  expect(app.find('.header').exists()).toBe(true);
});

it('renders the intro area', () => {
  const app = enzyme.shallow(<App />);
  expect(app.find('.intro-area').exists()).toBe(true);
});
