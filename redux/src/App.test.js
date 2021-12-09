import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

test('renders learn react link', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App/>,div);
  expect(div.innerHTML).toContain('Hello there');
  ReactDOM.unmountComponentAtNode(div);
});
