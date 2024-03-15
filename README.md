<div>
    <img width="50px" style="float:left;padding-right:12px;" src="https://app.dev.sirenapp.io/assets/Siren-b2f89b52.svg" >
    <H1>Siren React Native Inbox</H1>
</div>

## Table of Contents
<!-- MarkdownTOC -->
- [Overview](#overview)
- [Quick Start Guide](#quick-start-guide)
    - [Install SDK](#1-install-sdk)
    - [Siren Provider](#2-siren-provider)
    - [Siren Notification Icon](#3-siren-notification-icon)
    - [Siren Inbox](#4-siren-inbox)
    - [useSiren](#5-usesiren)
    - [Error Codes](#6-error-codes)
    - [Complete Code Example](#complete-code-example)
- [I want to know more!](#i-want-to-know-more)

<!-- /MarkdownTOC -->


<a name="introduction"></a>
## Overview

The @siren/react-native-inbox sdk is a comprehensive and customizable React Native UI kit for displaying and managing notifications. This documentation provides comprehensive information on how to install, configure, and use the sdk effectively.

## Quick Start Guide

### 1. Install SDK
To install the @siren/react-native-inbox sdk, you can use npm or yarn.

#### Prerequisites
- React Native v0.6+
#### Steps
1. Under your app's root directory, install @siren/react-native-inbox. 
```
npm install @siren/react-native-inbox
```
2. Under your application's ios folder, run
```
pod install
``` 

### 2. Siren Provider
The SirenProvider initializes the Siren sdk with the specified configuration, which contains important parameters like the user token and recipient ID. Wrap the SirenProvider around your App's root.

```js
import { SirenProvider } from '@siren/react-native-inbox';

const config = {
  userToken: 'your_user_token',
  recipientId: 'your_recipient_id',
};

<SirenProvider config={config}>
  {/* Your app components */}
</SirenProvider>


```
The config is a prop for the SirenProvider component is authenticate and initialize sdk.

```js
type config = {
  userToken: string,
  recipientId:  string,
};
```

### 3. Siren Notification Icon
This component includes a customizable notification icon and a badge for indicating the number of un-viewed notifications in the user interface.

```js
import { SirenInboxIcon } from '@siren/react-native-inbox';

 <SirenInboxIcon
   theme={customTheme}
   customStyles={customStyles}
   notificationIcon={<CustomIcon />}
   darkMode={true}
   onError={(error) => console.error(error)}
 />

```

#### Siren Notification Icon Props
Given below are all props of Icon component.

Prop | Description | Type | Default value |
--- | --- | --- | --- |
theme | Theme object for custom color theme |  Theme | {} |
customStyles | Style object for custom styling |  StyleProps | {} |
notificationIcon | Option to use custom notification Icon |  JSX Element | null |
darkMode | Flag to enable dark mode |  boolean | false |
onError | Callback for handling errors | (error:  SirenErrorType)=> void | null |
onPress | Function for handling press of icon | ()=> void | null |
disabled | Flag to disable click handler of icon |  boolean | false |

#### Theming options
Customize the unread badge of the notification icon, and choose between dark and light theming options. 

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

#### Styling options
Customize the notification icon style properties includes size of icon, badge, etc. 

```js

    type StyleProps = {
        notificationIcon?: {
          size?: number,
        };
        badgeStyle?: {
            size?: number;
            textSize?: number;
        };
    }
```

### 4. Siren Inbox

SirenNotificationWindow is a paginated list view for displaying notifications.

```js
import { SirenInbox } from '@siren/react-native-inbox';

<SirenInbox
    theme={customTheme}
    title="Notifications"
    hideHeader={false}
    darkMode={true}
    onError={(error) => console.log(error)}
/>

```
#### Siren Notification Window Props
Given below are all props of window component.

Prop | Description | Type | Default value |
--- | --- | --- | --- |
theme | Theme object for custom styling |  Theme | {} |
title |  Title of the notification window |  string | "Notifications" |
hideHeader | Flag to hide or show the header |  boolean | false |
hideClearAll | Flag to hide or show the clear all button in header |  boolean | false |
darkMode | Flag to enable dark mode |  boolean | false |
cardProps | Props for customizing the notification cards | CardProps | null |
customNotificationCard | Custom function for rendering notification cards | (notification)=> JSX Element | null |
onNotificationCardClick | Props for customizing the notification cards | (notification)=> void | ()=>null |
listEmptyComponent | Custom component to display when the notification list is empty | JSX Element | null |
customHeader | Custom header component | JSX Element | null |
customFooter | Custom footer component | JSX Element | null |
onError | Callback for handling errors | (error:  SirenErrorType)=> void | null |

#### Theming options

Customizable UI option for notification window, with dark and light theme options. 

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
        };
        windowHeader?: {
            background?: string;
            titleColor?: string;
            headerActionColor?: string;
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

#### Theming options

Customizable Styling option for notification window.

```js
    export type StyleProps = {
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
        closeIconSize?: number;
        titlePadding?: number;
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
        titlePadding?: number;
        descriptionSize?: number;
        descriptionPadding?: number;
        dateSize?: number;
      };
      badgeStyle?: {
        size?: number;
        textSize?: number;
      };
      badgeTextStyle?: {
        textSize?: number;
      }
    };
```

### 5. useSiren
This is a hook that provides utility functions for modifying notifications.

```js
import { useSiren } from '@siren/react-native-inbox';

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

Function name | Parameters type | Description |
--- | --- | --- |
markAllNotificationsAsReadByDate | startDate: string | Set all notification read status to true until given date |
markAsRead | id: string | Set read status of a specific notification to true |
deleteNotification |  id: string  | Delete a specific notification by id |
deleteNotificationsByDate | startDate: string | Delete all notifications until given date |
markNotificationsAsViewed | startDate: string | Set all notification viewed status to true until given date |

### 6. Error codes
Given below are all possible error codes thrown by sdk.

Error code | Message | Description |
--- | --- | --- |
INVALID_TOKEN | Invalid token | Token passed in provider is invalid |
INVALID_RECIPIENT_ID | Invalid recipient id | Recipient id in provider is invalid |
TOKEN_VERIFICATION_FAILED | This operation requires a valid token | Failed to verify token and initialize sdk |
INVALID_ERROR_FUNCTION | Invalid error function | Error function is invalid |
GENERIC_API_ERROR | Api error | Failed to call a internal api |
SIREN_OBJECT_NOT_FOUND | Siren Object Not found | Was failed to initialize sdk, Siren object not created |
MISSING_PARAMETER | Missing Parameter | A parameter is missing in function call |

### Complete Code Example
Here's a runnable code example that covers everything in this quick start guide.
```js

import React from 'react';
import {SafeAreaView} from 'react-native';
import {SirenInbox,SirenInboxIcon,SirenProvider} from '@siren/react-native-inbox';

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
    <SafeAreaView style={{flex: 1}}>
      <SirenInboxIcon
        darkMode={false}
      />
      <SirenInbox
        title="Notifications"
        hideHeader={false}
        darkMode={false}
        cardProps={{hideAvatar: false, showMedia: true}}
      />
    </SafeAreaView>
  );
}

export default MyContainer;

```

### I want to know more!

No worries, here are some links that you will find useful:
* **[Advanced React Native Guide](https://reactnative.dev/docs/environment-setup)**

