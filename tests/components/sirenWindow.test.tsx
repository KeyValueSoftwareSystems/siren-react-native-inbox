import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

import { SirenWindow } from '../../src';

jest.mock('react-native/Libraries/Lists/FlatList', () => 'FlatList');

describe('SirenWindow', () => {
  it('renders without crashing', () => {
    render(
      <SirenWindow
        title='Notifications'
        hideHeader={false}
        darkMode={false}
        realTimeNotificationEnabled={true}
        onError={(error) => console.log(error)}
      />
    );
  });

  test("should render custom header ", () => {
    const { getByTestId } = render(
      <SirenWindow
        customHeader={<View testID="custom-header"><Text>My notifications</Text></View>}
      />
    );

    expect(getByTestId('custom-header')).toBeTruthy();
  });
  test("should render custom footer ", () => {
    const { getByTestId } = render(
      <SirenWindow
        customHeader={<View testID="custom-footer"><Text>My notifications</Text></View>}
      />
    );

    expect(getByTestId('custom-footer')).toBeTruthy();
  });
  
});
