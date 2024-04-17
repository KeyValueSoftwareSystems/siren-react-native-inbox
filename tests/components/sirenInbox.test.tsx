import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

import { SirenInbox } from '../../src';

jest.mock('react-native/Libraries/Lists/FlatList', () => 'FlatList');

describe('SirenInbox', () => {
  it('renders without crashing', () => {
    render(
      <SirenInbox
        darkMode={false}
        onError={(error) => console.log(error)}
      />
    );
  });

  test("should render custom header ", () => {
    const { getByTestId } = render(
      <SirenInbox
        inboxHeaderProps={{customHeader: <View testID="custom-header"><Text>My notifications</Text></View>}}
      />
    );

    expect(getByTestId('custom-header')).toBeTruthy();
  });
  test("should render custom footer ", () => {
    const { getByTestId } = render(
      <SirenInbox
        customFooter={<View testID="custom-footer"><Text>My notifications</Text></View>}
      />
    );

    expect(getByTestId('custom-footer')).toBeTruthy();
  });

});
