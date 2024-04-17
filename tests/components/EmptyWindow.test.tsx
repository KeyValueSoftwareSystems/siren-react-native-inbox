import React from 'react';
import { render } from '@testing-library/react-native';
import EmptyWindow from '../../src/components/emptyWindow';
import type { SirenStyleProps } from '../../src/types';
import { Constants } from '../../src/utils';

const { LIST_EMPTY_TEXT, LIST_EMPTY_DESCRIPTION } = Constants;

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

    const { getByText } = render(<EmptyWindow styles={customStyles} darkMode={false} />);

    expect(getByText(LIST_EMPTY_TEXT)).toBeTruthy();
    expect(getByText(LIST_EMPTY_DESCRIPTION)).toBeTruthy();
  });
});
