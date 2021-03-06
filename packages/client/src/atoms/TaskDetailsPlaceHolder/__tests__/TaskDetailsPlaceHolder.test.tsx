import React from 'react';
import { create } from 'react-test-renderer';

import TaskDetailsPlaceHolder from '../TaskDetailsPlaceHolder';

jest.mock('@material-ui/lab/Skeleton', () => 'Skeleton');
jest.mock('@material-ui/core/Box', () => 'Box');

describe('Component - TaskDetailsPlaceHolder', () => {
  test('renders correctly', () => {
    const component = create(<TaskDetailsPlaceHolder />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
