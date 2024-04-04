# Siren React Native Inbox

## Overview

The `@sirenapp/react-native-inbox` sdk is a comprehensive and customizable React Native UI kit for displaying and managing notifications. This documentation provides comprehensive information on how to install, configure, and use the sdk effectively.

## 1. Installation

You can install the react sdk from npm 

```bash
npm install @sirenapp/react-native-inbox
```
or from yarn

```bash
yarn add @sirenapp/react-native-inbox
```

## 2. Configuration
### 2.1 Initialization
Initialize the sdk with user token and recipient id. Wrap the provider around your App's root.

```js
import { SirenProvider } from '@sirenapp/react-native-inbox';

const config = {
  userToken: 'your_user_token',
  recipientId: 'your_recipient_id',
};

<SirenProvider config={config}>
  {/* Your app components */}
</SirenProvider>
```

### 2.2 Configure notification icon
Once the provider is configured, next step is to configure the notification icon

This component consists of a notification icon along with a badge to display the number of unviewed notifications
```js
import { SirenInboxIcon } from '@sirenapp/react-native-inbox';

 <SirenInboxIcon />

```

#### Props for notification icon
Below are optional props available for the icon component:

Prop | Description | Type | Default value |
--- | --- | --- | --- |
theme | Object for custom themes |  Theme | {} |
customStyles | Object for custom styling |  StyleProps | {} |
notificationIcon | Option to use custom notification icon |  JSX Element | null |
darkMode | Toggle to enable dark mode |  boolean | false |
onError | Callback for handling errors | (error:  SirenErrorType)=> void | null |
onPress | Custom click handler for notification icon | ()=> void | null |
disabled | Toggle to disable click on icon |  boolean | false |
hideBadge | Toggle to  hide unviewed count badge |  boolean | false |

#### Theme customization
Here are the available theme options:

```js
   type Theme = {
        dark: ThemeProps;
        light: ThemeProps;
    };

    type ThemeProps = {
        badgeStyle?: {
            color?: string;
            textColor?: string;
        };
    }
```

#### Style customization
Here are the custom style options for the notification icon:
```js

    type StyleProps = {
        notificationIcon?: {
          size?: number,
        };
        badgeStyle?: {
            size?: number;
            textSize?: number;    
            top?: number;
            right?: number;
        };
    }
```

### 2.3. Configure notification inbox

Inbox is a paginated list view for displaying notifications.

```js
import { SirenInbox } from '@sirenapp/react-native-inbox';

<SirenInbox />

```
#### Props for the notification inbox
Below are optional props available for the inbox component:

Prop | Description | Type | Default value |
--- | --- | --- | --- |
theme | Object for custom themes |  Theme | {} |
customStyles | Object for custom styling |  StyleProps | {} |
title |  Title of the notification inbox |  string | "Notifications" |
darkMode |  Toggle to enable dark mode|  boolean | false |
itemsPerFetch | Number of notifications fetch per api request (have a max cap of 50) |  number | 20 |
cardProps | Props for customizing the notification cards | CardProps | { hideAvatar: false, disableAutoMarkAsRead: false } |
customNotificationCard | Function for rendering custom notification cards | (notification)=> JSX Element | null |
onNotificationCardClick | Custom click handler for notification cards | (notification)=> void | ()=>null |
listEmptyComponent | Custom component for empty notification list | JSX Element | null |
inboxHeaderProps | Props for customizing the header | InboxHeaderProps | { hideHeader: false, hideClearAll: false, customHeader: null, showBackButton:false, backButton: null, onBackPress: ()=> null } |
customFooter | Custom footer component | JSX Element | null |
customLoader | Custom component to display the initial loading state| JSX Element | null |
customErrorWindow | Custom error window | JSX Element | null |
onError | Callback for handling errors | (error:  SirenErrorType)=> void | null |


#### Theme customization

Here are the available theme options:

```js
    type Theme = {
        dark: ThemeProps;
        light: ThemeProps;
    };

    type ThemeProps = {
        colors?: {
            primaryColor?: string;
            textColor?: string;
            neutralColor?: string;
            borderColor?: string;
            highlightedCardColor?: string;
            dateColor?: string;
            deleteIcon?: string;
            timerIcon?: string;
            clearAllIcon?: string;
            infiniteLoader?: string;
        };
        windowHeader?: {
            background?: string;
            titleColor?: string;
            headerActionColor?: string;
            borderColor?: string;
            borderWidth?: string;
        };
        windowContainer?: {
            background?: string;
        };
        notificationCard?: {
            borderColor?: string;
            background?: string;
            titleColor?: string;
            descriptionColor?: string;
            dateColor?: string;
        };
    }
```

#### Style options

Here are the custom style options for the notification inbox:

```js
    type StyleProps = {
      notificationIcon?: {
        size?: number;
      };
      window?: {
        width?: DimensionValue;
        height?: DimensionValue;
      };
      windowHeader?: {
        height?: number;
        titleFontWeight?: TextStyle['fontWeight'];
        titleSize?: number;
      }
      windowContainer?: {
        padding?: number;
      };
      notificationCard?: {
        padding?: number;
        borderWidth?: number;
        avatarSize?: number;
        titleFontWeight?: TextStyle['fontWeight'];
        titleSize?: number;
        descriptionSize?: number;
        dateSize?: number;
      };
      badgeStyle?: {
        size?: number;
        textSize?: number;
        top?: number;
        right?: number;
      };
      deleteIcon?:{
        size?: number
      };
      dateIcon?:{
        size?: number
      };
      clearAllIcon?:{
        size?: number
      };
    };
```
#### CardProps
```js
    type CardProps = {
      hideAvatar?: boolean;
      disableAutoMarkAsRead?: boolean;
    };
```

#### InboxHeaderProps
```js
    type InboxHeaderProps = {
      hideHeader?: boolean;
      hideClearAll?: boolean;
      customHeader?: JSX.Element | null;
      showBackButton?: boolean;
      backButton?: JSX.Element;
      onBackPress?: () => void;
    };
```

## 3. Hooks

`useSiren` is a hook that provides utility functions for modifying notifications.

```js
import { useSiren } from '@sirenapp/react-native-inbox';

function MyComponent() {
  const { markAsRead, deleteNotification } = useSiren();

  function handleMarkAsRead(id) {
    markAsRead(id);
  }

  function handleDeleteNotification(id) {
    deleteNotification(id);
  }

  return (
    {/* Your component logic */}
  );
}
```
#### useSiren functions

Functions | Parameters | Type | Description |
----------|------------|-------|------------|
markNotificationsAsReadByDate | startDate | ISO date string | Sets the read status of notifications to true until the given date |
markAsRead | id | string | Set read status of a notification to true          |
deleteNotification |  id | string  | Delete a notification by id |
deleteNotificationsByDate | startDate | ISO date string | Delete all notifications until given date |
markNotificationsAsViewed | startDate | ISO date string |Sets the viewed status of notifications to true until the given date |

## 4. Error codes
Given below are all possible error codes thrown by sdk:

Error code  | Description |
--- | --- |
INVALID_TOKEN | The token passed in the provider is invalid |
INVALID_RECIPIENT_ID | The recipient id passed in the provider is invalid |
TOKEN_VERIFICATION_FAILED | Verification of the given tokens has failed |
GENERIC_API_ERROR | Occurrence of an unexpected api error |
OUTSIDE_SIREN_CONTEXT | Attempting to invoke the functions outside the siren inbox context |
MISSING_PARAMETER | The required parameter is missing |

## Example
Here's a basic example to help you get started
```js

import React from 'react';
import {SafeAreaView} from 'react-native';
import {SirenInbox,SirenInboxIcon,SirenProvider} from '@sirenapp/react-native-inbox';

function App(): React.JSX.Element {

  const config = {
    userToken: 'your_user_token',
    recipientId: 'your_recipient_id',
  };

  return (
    <SirenProvider config={config}>
      <MyContainer />
    </SirenProvider>
  );
}

export default App;

function MyContainer(): React.JSX.Element {

  return (
    <View>
      <SirenInboxIcon
        darkMode={false}
      />
      <SirenInbox
        title="Notifications"
        hideHeader={false}
        darkMode={false}
        cardProps={{hideAvatar: false, disableAutoMarkAsRead: false}}
      />
    </View>
  );
}

export default MyContainer;

```