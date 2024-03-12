import type { DimensionValue, ImageStyle, TextStyle, ViewStyle } from 'react-native';

import type { NotificationDataType, SirenErrorType } from 'test_notification/dist/esm/types';
/**
 * Defines the configuration options for the Siren Notification Window component.
 * @typedef {Object} SirenInboxProps
 * @property {Theme} [theme] - Object with properties to customize the notification feed's appearance.
 * @property {string} [title] - Title of the notification panel.
 * @property {boolean} [hideHeader] - Whether to hide the window header.
 * @property {boolean} [darkMode] - Enables dark theme for the notification feed.
 * @property {CardProps} [cardProps] - Customization options for the notification card.
 * @property {JSX.Element} [listEmptyComponent] - Custom UI to display when the notification list is empty.
 * @property {JSX.Element} [customFooter] - Custom UI for the notification panel's footer.
 * @property {JSX.Element} [customHeader] - Custom UI for the notification panel's header.
 * @property {(notification: NotificationResponseDataItem) => JSX.Element} [customNotificationCard] - Function to render custom notification cards.
 * @property {(notification: NotificationResponseDataItem) => void} [onNotificationCardClick] - Handler for notification card clicks.
 * @property {(error: SirenErrorType) => void} [onError] - Callback for handling errors.
 */
export type SirenInboxProps = {
  theme?: Theme;
  title?: string;
  hideHeader?: boolean;
  darkMode?: boolean;
  cardProps?: CardProps;
  listEmptyComponent?: JSX.Element;
  customFooter?: JSX.Element;
  customHeader?: JSX.Element;
  customNotificationCard?: (notification: NotificationDataType) => JSX.Element;
  onNotificationCardClick?: (notification: NotificationDataType) => void;
  onError?: (error: SirenErrorType) => void;
};

/**
 * Describes the props for the SirenInboxIcon component.
 * @typedef {Object} SirenInboxIconProps
 * @property {Theme} [theme] - Customization options for the component's theme.
 * @property {JSX.Element} [notificationIcon] - Custom icon for the notification bell.
 * @property {(error: SirenErrorType) => void} [onError] - Callback function for handling errors.
 * @property {boolean} [darkMode] - Enables dark theme for the component.
 */
export type SirenInboxIconProps = {
  theme?: Theme;
  notificationIcon?: JSX.Element;
  onError?: (error: SirenErrorType) => void;
  darkMode?: boolean;
  onPress?: () => void;
  disabled?: boolean;
};

/**
 * Defines the configuration properties required by the SirenProvider.
 *
 * @typedef {Object} SirenProviderConfigProps
 * @property {string} userToken - The authentication token for the user.
 * @property {string} recipientId - The unique identifier of the recipient.
 */
export type SirenProviderConfigProps = {
  userToken: string;
  recipientId: string;
};

/**
 * Defines the style and layout for individual notification cards.
 * @typedef {Object} CardProps
 * @property {boolean} [hideAvatar] - Determines if the avatar should be hidden.
 * @property {boolean} [showMedia] - Indicates if media content should be displayed.
 */
type CardProps = {
  hideAvatar?: boolean;
  showMedia?: boolean;
};

/**
 * Represents the theme configuration options.
 * @typedef {Object} Theme
 * @property {ThemeProps} [dark] - Theme settings for dark mode.
 * @property {ThemeProps} [light] - Theme settings for light mode.
 */
export type Theme = {
  dark: ThemeProps;
  light: ThemeProps;
};

/**
 * Defines the configuration options for theme elements.
 * @typedef {Object} ThemeProps
 * @property {Object} [colors] - Color configuration for theme elements.
 * @property {Object} [badgeStyle] - Styling options for badges.
 * @property {WindowProps} [window] - Configuration for the notification window appearance.
 * @property {WindowHeaderProps} [windowHeader] - Configuration for the window header.
 * @property {WindowContainerProps} [windowContainer] - Configuration for the window container.
 * @property {NotificationCardThemeProps} [notificationCard] - Styling options for notification cards.
 */
export type ThemeProps = {
  colors?: {
    primaryColor?: string;
    textColor?: string;
    neutralColor?: string;
    borderColor?: string;
    primaryTextColor?: string;
    activeCardColor?: string;
  };
  notificationIcon?: {
    size?: number,
  } 
  badgeStyle?: {
    size?: number;
    color?: string;
    textColor?: string;
    textSize?: number;
  };
  window?: WindowProps;
  windowHeader?: WindowHeaderProps;
  windowContainer?: WindowContainerProps;
  notificationCard?: NotificationCardThemeProps;
};

/**
 * Defines the styling and layout options for the notification window.
 * @typedef {Object} WindowProps
 * @property {DimensionValue} [width] - Width of the window.
 * @property {DimensionValue} [height] - Height of the window.
 * @property {string} [borderColor] - Color of the window's border.
 * @property {number} [borderRadius] - Radius of the window's corners.
 * @property {number} [shadowDepth] - Depth of the shadow cast by the window, affecting its blur radius.
 * @property {string} [shadowColor] - Color of the shadow cast by the window.
 */
type WindowProps = {
  width?: DimensionValue;
  height?: DimensionValue;
  borderColor?: string;
  borderRadius?: number;
  shadowDepth?: number;
  shadowColor?: string;
};

/**
 * Specifies the configuration options for the window header.
 * @typedef {Object} WindowHeaderProps
 * @property {string} [background] - Background color of the header.
 * @property {DimensionValue} [height] - Height of the header.
 * @property {string} [titleColor] - Color of the header title text.
 * @property {TextStyle['fontWeight']} [titleFontWeight] - Font weight of the header title.
 * @property {number} [titleSize] - Font size of the header title.
 * @property {string} [closeIconColor] - Color of the close icon in the header.
 * @property {number} [closeIconSize] - Size of the close icon in the header.
 */
type WindowHeaderProps = {
  background?: string;
  height?: DimensionValue;
  titleColor?: string;
  titleFontWeight?: TextStyle['fontWeight'];
  titleSize?: number;
  closeIconColor?: string;
  closeIconSize?: number;
};

/**
 * Contains styling options for the container that wraps the window content.
 * @typedef {Object} WindowContainerProps
 * @property {string} [background] - Background color of the container.
 * @property {number} [padding] - Padding inside the container.
 */
type WindowContainerProps = {
  background?: string;
  padding?: number;
};

/**
 * Describes theme-related properties for styling individual notification cards.
 * @typedef {Object} NotificationCardThemeProps
 * @property {DimensionValue} [height] - Height of the card.
 * @property {number} [padding] - Padding inside the card.
 * @property {number} [borderWidth] - Width of the card's border.
 * @property {string} [borderColor] - Color of the card's border.
 * @property {string} [background] - Background color of the card.
 * @property {string} [hoverBackground] - Background color of the card on hover.
 * @property {number} [avatarSize] - Size of the avatar displayed on the card.
 * @property {string} [titleColor] - Color of the card's title text.
 * @property {TextStyle['fontWeight']} [titleFontWeight] - Font weight of the card's title.
 * @property {number} [titleSize] - Font size of the card's title.
 * @property {number} [titlePadding] - Padding around the card's title.
 * @property {string} [descriptionColor] - Color of the card's description text.
 * @property {number} [descriptionSize] - Font size of the card's description.
 * @property {number} [descriptionPadding] - Padding around the card's description.
 * @property {DimensionValue} [mediaWidth] - Width of the media content in the card.
 * @property {DimensionValue} [mediaHeight] - Height of the media content in the card.
 * @property {string} [mediaObjectFit] - CSS object-fit value applied to the media content.
 * @property {number} [mediaRadius] - Border radius of the media content.
 * @property {string} [mediaPlaceholder] - Placeholder image URL for the media content.
 * @property {string} [dateColor] - Color of the date text on the card.
 * @property {number} [dateSize] - Font size of the date text on the card.
 */
type NotificationCardThemeProps = {
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

/**
 * Defines properties passed to a notification card component.
 * @typedef {Object} NotificationCardProps
 * @property {Function} onCardClick - Callback function invoked upon clicking the card.
 * @property {NotificationResponseDataItem} notification - The notification data for the card.
 * @property {CardProps} cardProps - Additional card properties.
 * @property {any} styles - Styling options for the card
 * @property {Function} onDelete - Callback function invoked to delete a notification.
 */
export type NotificationCardProps = {
  onCardClick: (notification: NotificationDataType) => void;
  notification: NotificationDataType;
  cardProps: CardProps;
  styles: Partial<SirenStyleProps>;
  onDelete: (id: string) => void;
};

/**
 * Represents the count of notifications that have not yet been viewed by the user.
 * @typedef {Object} UnviewedType
 * @property {number} unviewedCount - The total number of unviewed notifications.
 */
export type UnviewedType = {
  unviewedCount: number;
} | null;

export type SirenStyleProps = {
  container: ViewStyle | object;
  contentContainer: ViewStyle;
  headerContainer: ViewStyle;
  headerTitle: TextStyle | object;
  headerAction: TextStyle;
  cardContainer: ViewStyle;
  cardIconRound: ViewStyle;
  cardTitle: TextStyle | object;
  cardDescription: TextStyle;
  cardImageStyle: ImageStyle | object;
  dateStyle: TextStyle;
  emptyText: TextStyle;
  errorText: TextStyle;
  errorButton: ViewStyle;
  errorButtonText: TextStyle;
};
