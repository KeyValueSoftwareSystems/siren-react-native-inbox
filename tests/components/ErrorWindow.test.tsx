import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import ErrorWindow from '../../src/components/errorWindow';
import { Constants } from '../../src/utils';
import type { SirenStyleProps } from '../../src/types';

describe('ErrorWindow', () => {
  it('renders correctly', () => {
    const customErrorStyles: Partial<SirenStyleProps> = {
      errorText: {
        color: '#FF0000',
        fontSize: 18,
        fontWeight: '400',
        marginBottom: 10
      },
      errorButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5
      },
      errorButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
      }
    };

    const retryCallback = jest.fn();

    const { getByText } = render(
      <ErrorWindow styles={customErrorStyles} onRetry={retryCallback} />
    );

    expect(getByText(Constants.ERROR_TEXT)).toBeTruthy();

    const retryButton = getByText(Constants.RETRY_BUTTON_LABEL);

    expect(retryButton).toBeTruthy();

    fireEvent.press(retryButton);
    expect(retryCallback).toHaveBeenCalled();
  });
});
