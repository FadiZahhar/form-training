// import { render, screen } from '@testing-library/react';
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  // tesing by npm run test to see if the component is working as expect
  expect(div.innerHTML).toContain('Hi there!')

  ReactDOM.unmountComponentAtNode(div)
})
