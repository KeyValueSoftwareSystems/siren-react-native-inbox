import React from 'react';
import { render } from '@testing-library/react-native';
import ErrorWindow from '../../src/components/errorWindow';
import { Constants } from '../../src/utils';
import type { SirenStyleProps } from '../../src/types';

const { ERROR_TEXT, ERROR_DESCRIPTION } = Constants;

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
      <ErrorWindow styles={customErrorStyles} />
    );

    expect(getByText(ERROR_TEXT)).toBeTruthy();
    expect(getByText(ERROR_DESCRIPTION)).toBeTruthy();

  });
});
