import React from 'react';
import { create } from 'react-test-renderer';
import NewbieSelect from '../NewbieSelect';

jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('../../NavBar', () => 'Navbar');
jest.mock('../../Avatar', () => 'Avatar');
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('../../PlusButton/', () => 'PlusButton');

describe('Component - NewbieSelect', () => {
  test('renders correctly', () => {
    const component = create(<NewbieSelect />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
