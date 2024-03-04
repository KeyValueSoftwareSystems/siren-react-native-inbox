import React from 'react';
import { render } from '@testing-library/react-native';
import EmptyWindow from '../../src/components/emptyWindow';
import type { SirenStyleProps } from '../../src/types';

describe('EmptyWindow', () => {
  it('renders correctly', () => {
    const customStyles: Partial<SirenStyleProps> = {
      emptyText: {
        color: '#000',
        fontSize: 18,
        fontWeight: '400',
        padding: 20
      }
    };

    const { getByText } = render(<EmptyWindow styles={customStyles} />);

    expect(getByText("You don't have any notifications!")).toBeTruthy();
  });
});
