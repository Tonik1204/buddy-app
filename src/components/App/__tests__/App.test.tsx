import React from 'react';
import { create } from 'react-test-renderer';

import App from '../App';

jest.mock('buddy-app-schema', () => {});
jest.mock('@material-ui/core/CssBaseline', () => 'CssBaseline');
jest.mock('@material-ui/styles/ThemeProvider', () => 'ThemeProvider');
jest.mock('styles/theme.ts', () => {});
jest.mock('components/AppRouter', () => 'AppRouter');

describe('Component - App', () => {
  test('renders correctly', () => {
    const component = create(<App />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
