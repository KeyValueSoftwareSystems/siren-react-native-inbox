import React from 'react';
import { render } from '@testing-library/react-native';
import {SirenWindow} from '../../src';
import { View } from 'react-native';
import type { Theme } from '../../src/types';

describe('SirenWindow', () => {
  const customTheme: Theme = { dark:{}, light:{} };

  it('renders without crashing', () => {
    render(
      <SirenWindow
        theme={customTheme}
        title="Notifications"
        hideHeader={false}
        darkMode={false}
        notificationsPerPage={10}
        cardProps={{ hideAvatar: false, showMedia: true }}
        listEmptyComponent={<View />}
        customHeader={<View />}
        customFooter={<View />}
        customNotificationCard={()=> <View/>}
        onNotificationCardClick={() => {}}
        realTimeNotificationEnabled={false}
        onError={() => {}}
      />
    );
  });

});
