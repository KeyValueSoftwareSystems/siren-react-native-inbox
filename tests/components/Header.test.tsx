import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import type { SirenStyleProps } from '../../dist/typescript/types';
import Header from '../../src/components/header';

describe('Header', () => {
  it('renders with correct title', () => {
    const title = 'Notification Center';
    const styles: Partial<SirenStyleProps> = {
      container: undefined,
      contentContainer: undefined,
      headerContainer: undefined,
      headerTitle: undefined,
      headerAction: undefined,
      cardContainer: undefined,
      cardIconRound: undefined,
      cardTitle: undefined,
      cardDescription: undefined,
      cardImageStyle: undefined,
      dateStyle: undefined,
      emptyText: undefined,
      errorText: undefined,
      errorButton: undefined,
      errorButtonText: undefined,
    };
    const onPressClearAll = jest.fn();
    const clearAllDisabled = false;

    const { getByText } = render(
      <Header
        title={title}
        styles={styles}
        onPressClearAll={onPressClearAll}
        clearAllDisabled={clearAllDisabled}
      />
    );

    expect(getByText(title)).toBeTruthy();
  });

  it('renders "Clear All" action button and handles onPressClearAll', () => {
    const title = 'Notification Center';
    const styles = {
      /* custom styles */
    };
    const onPressClearAll = jest.fn();
    const clearAllDisabled = false;

    const { getByText } = render(
      <Header
        title={title}
        styles={styles}
        onPressClearAll={onPressClearAll}
        clearAllDisabled={clearAllDisabled}
      />
    );

    const clearAllButton = getByText('Clear All');

    expect(clearAllButton).toBeTruthy();

    // Simulate button click
    fireEvent.press(clearAllButton);

    // Verify that onPressClearAll is called
    expect(onPressClearAll).toHaveBeenCalled();
  });
});
