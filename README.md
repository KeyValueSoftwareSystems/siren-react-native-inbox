<div style="display:flex;flex-direction:row:align-items:center;justify-content:center">
    <img width="50px" src="https://app.dev.sirenapp.io/assets/Siren-b2f89b52.svg" style="margin:10px;padding-top:5px">
    <H1 style="color: #000;font-size:40px;font-weight:700">Siren React Native Inbox</H1>
</div>

## Table of Contents
<!-- MarkdownTOC -->
- [Overview](#overview)
- [Quick Start Guide](#quick-start-guide)
    - [Install SDK](#1-install-sdk)
    - [Siren Provider](#2-siren-provider)
    - [Siren Notification Icon](#3-siren-notification-icon)
    - [Siren Notification Window](#4-siren-notification-window)
    - [useSiren](#5-usesiren)
    - [Error Codes](#6-error-codes)
    - [Complete Code Example](#complete-code-example)
- [I want to know more!](#i-want-to-know-more)

<!-- /MarkdownTOC -->


<a name="introduction"></a>
## Overview

The Siren SDK is a powerful tool for integrating notifications functionality into your React Native applications. This documentation provides comprehensive information on how to install, configure, and use the SDK effectively.

## Quick Start Guide

### 1. Install SDK
To install the Siren SDK, you can use npm or yarn.

#### Prerequisites
- React Native v0.6+
- @siren/core-sdk
#### Steps
1. Under your app's root directory, install @siren/rn-sdk. 
```
npm install @siren/siren-react-native-inbox
```
2. Under your application's ios folder, run
```
pod install
``` 

### 2. Siren Provider
 The SirenProvider initializes the Siren SDK with the provided configuration, which includes essential parameters such as the user token and recipient ID. SirenProvider must be wrapped above main App component.

```js
import { SirenProvider } from '@siren/siren-react-native-inbox';

const config = {
  userToken: 'your_user_token',
  recipientId: 'your_recipient_id',
};

<SirenProvider config={config}>
  {/* Your app components */}
</SirenProvider>


```
config prop attached to SirenProvider component is authenticate and initialize sdk.

```js
type config = {
  userToken: string,
  recipientId:  string,
};
```

### 3. Siren Notification Icon
This is a component have a customizable notification icon component and a badge for displaying un-viewed notification count in UI.

```js
import { SirenNotificationIcon } from '@siren/siren-react-native-inbox';

 <SirenNotificationIcon
   theme={customTheme}
   notificationIcon={<CustomIcon />}
   darkMode={true}
   realTimeUnviewedCountEnabled={true}
   onError={(error) => console.error(error)}
 />

```

#### Siren Notification Icon Props
Given below are all props of Icon component.

Prop | Description | Type | Default value |
--- | --- | --- | --- |
theme | Theme object for custom styling |  Theme | {} |
notificationIcon | Option to use Custom notification Icon |  JSX Element | null |
realTimeUnviewedCountEnabled |Flag to enable real-time un-viewed notification count |  boolean | true |
darkMode | Flag to enable dark mode |  boolean | false |
onError | Callback for handling errors | (error:  SirenErrorType)=> void | null |

#### Theming options

Customize Unread badge of notification icon and have dark and light theming options. 

```js
   type Theme = {
        dark: ThemeProps;
        light: ThemeProps;
    };

    type ThemeProps = {
        unreadBadgeCount?: {
            background?: string;
            color?: string;
            borderRadius?: number;
            fontSize?: number;
            inset?: number;
            size?: number;
        };
        badgeStyle?: {
            size?: number;
            color?: string;
            textColor?: string;
            textSize?: number;
        };
    }
```

### 4. Siren Notification Window

Siren Notification Window is a paginated list view for displaying notifications.

```js
import { SirenWindow } from '@siren/siren-react-native-inbox';

<SirenWindow
    theme={customTheme}
    title="Notifications"
    hideHeader={false}
    darkMode={true}
    notificationsPerPage={10}
    realTimeNotificationEnabled={true}
    onError={(error) => console.log(error)}
/>

```
#### Siren Notification Window Props
Given below are all props of Window component.

Prop | Description | Type | Default value |
--- | --- | --- | --- |
theme | Theme object for custom styling |  Theme | {} |
title |  Title of the notification window |  string | "Notifications" |
hideHeader | Flag to hide or show the header |  boolean | false |
darkMode | Flag to enable dark mode |  boolean | false |
realTimeNotificationEnabled | switch for on and of notification listener |  boolean | false |
notificationsPerPage | Number of notifications to fetch per page | number | 10 |
cardProps | Props for customizing the notification cards | CardProps | null |
customNotificationCard | Custom function for rendering notification cards | (notification)=> JSX Element | null |
onNotificationCardClick | Props for customizing the notification cards | (notification)=> void | ()=>null |
listEmptyComponent | Custom component to display when the notification list is empty | JSX Element | null |
customHeader | Custom header component | JSX Element | null |
customFooter | Custom footer component | JSX Element | null |
onError | Callback for handling errors | (error:  SirenErrorType)=> void | null |

#### Theming options

Customizable UI option for notification window and have dark and light theming options. 

```js
    type Theme = {
        dark: ThemeProps;
        light: ThemeProps;
    };

    type ThemeProps = {
        colors?: {
            primaryColor?: string;
            secondaryColor?: string;
            textColor?: string;
            neutralColor?: string;
            borderColor?: string;
            primaryTextColor?: string;
            activeCardColor?: string;
        };
        window?: {
            width?: DimensionValue;
            height?: DimensionValue;
            borderColor?: string;
            borderRadius?: number;
            shadowDepth?: number;
            shadowColor?: string;
        };
        windowHeader?: {
            background?: string;
            height?: DimensionValue;
            titleColor?: string;
            titleFontWeight?: TextStyle['fontWeight'];
            titleSize?: number;
            closeIconColor?: string;
            closeIconSize?: number;
        };
        windowContainer?: {
            background?: string;
            padding?: number;
        };
        notificationCard?: {
            height?: DimensionValue;
            padding?: number;
            borderWidth?: number;
            borderColor?: string;
            background?: string;
            hoverBackground?: string;
            avatarSize?: number;
            titleColor?: string;
            titleFontWeight?: TextStyle['fontWeight'];
            titleSize?: number;
            titlePadding?: number;
            descriptionColor?: string;
            descriptionSize?: number;
            descriptionPadding?: number;
            mediaWidth?: DimensionValue;
            mediaHeight?: DimensionValue;
            mediaObjectFit?: string;
            mediaRadius?: number;
            mediaPlaceholder?: string;
            dateColor?: string;
            dateSize?: number;
        };
    }
```

### 5. useSiren
This a sdk hook which contain helper functions for modify notifications.

```js
import useSiren from '@siren/siren-react-native-inbox';

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
markNotificationsAllAsRead | none | Set all notification read status to true |
markAsRead | id: string | Set read status of a specific notification to true |
deleteNotification |  id: string  | Delete a specific notification by id |
clearAllNotification | none | Delete all notifications |
markNotificationsAsViewed | none | Set all notification viewed status to true |

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
Here's a runnable code example that covers everything in this quickstart guide.
```js

import React from 'react';
import {SafeAreaView} from 'react-native';
import {SirenWindow, SirenNotificationIcon,SirenProvider} from '@siren/siren-react-native-inbox';

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
      <SirenNotificationIcon
        darkMode={false}
      />
      <SirenWindow
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

