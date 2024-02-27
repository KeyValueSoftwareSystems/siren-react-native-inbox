import React from 'react';
import { render } from '@testing-library/react-native';

import { SirenWindow } from '../../src';

describe('SirenWindow', () => {
  it('renders without crashing', () => {
    render(
      <SirenWindow
        title='Notifications'
        hideHeader={false}
        darkMode={false}
        notificationsPerPage={10}
        realTimeNotificationEnabled={true}
        onError={(error) => console.log(error)}
      />
    );
  });

  it('displays loading window when isLoading is true', () => {
    const { getByTestId } = render(
      <SirenWindow
        title='Notifications'
        hideHeader={false}
        darkMode={false}
        notificationsPerPage={10}
        realTimeNotificationEnabled={true}
        onError={(error) => console.log(error)}
      />
    );

    expect(getByTestId('loading-window')).toBeTruthy();
  });

  it('displays list footer when isLoading is true', () => {
    const { getByTestId } = render(
      <SirenWindow
        title='Notifications'
        hideHeader={false}
        darkMode={false}
        notificationsPerPage={10}
        realTimeNotificationEnabled={true}
        onError={(error) => console.log(error)}
      />
    );

    expect(getByTestId('list-footer')).toBeTruthy();
  });

  it('displays error window when isError is true', () => {
    const { getByTestId } = render(
      <SirenWindow
        title='Notifications'
        hideHeader={false}
        darkMode={false}
        notificationsPerPage={10}
        realTimeNotificationEnabled={true}
        onError={(error) => console.log(error)}
      />
    );

    expect(getByTestId('error-window')).toBeTruthy();
  });

  it('displays custom empty window when notifications array is empty', () => {
    const { getByTestId } = render(
      <SirenWindow
        title='Notifications'
        hideHeader={false}
        darkMode={false}
        notificationsPerPage={10}
        realTimeNotificationEnabled={true}
        onError={(error) => console.log(error)}
      />
    );

    expect(getByTestId('custom-empty-window')).toBeTruthy();
  });
});
