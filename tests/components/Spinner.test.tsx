import React from 'react';
import { render } from '@testing-library/react-native';
import Spinner from '../../src/components/spinner';
import { ThemeMode } from '../../src/utils/constants';

describe('spinner', () => {
  const customTheme = {
    colors: {
      infiniteLoader: '#000'
    }
  };
  const mode = ThemeMode.LIGHT;

  it('renders without crashing', () => {
    render(<Spinner mode={mode} theme={customTheme} />);
  });

  it('renders ActivityIndicator', () => {
    const { getByTestId } = render(
      <Spinner  mode={mode} theme={customTheme} />
    );

    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('sets color based on theme and mode', () => {
    const { getByTestId } = render(
      <Spinner mode={mode} theme={customTheme} />
    );

    const activityIndicator = getByTestId('activity-indicator');

    // Check if color is set correctly based on the provided theme and mode
    expect(activityIndicator.props.color).toEqual(customTheme.colors?.infiniteLoader || '#000');
  });
});
