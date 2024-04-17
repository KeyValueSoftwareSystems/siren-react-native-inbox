import type { DimensionValue, TextStyle, ViewStyle } from 'react-native';

import type { NotificationDataType, SirenErrorType } from '@sirenapp/js-sdk/dist/esm/types';
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
  customStyles?: StyleProps;
  darkMode?: boolean;
  cardProps?: CardProps;
  listEmptyComponent?: JSX.Element;
  customFooter?: JSX.Element;
  inboxHeaderProps?: InboxHeaderProps;
  customLoader?: JSX.Element;
  customErrorWindow?: JSX.Element;
  itemsPerFetch?: number;
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
  customStyles?: StyleProps;
  notificationIcon?: JSX.Element;
  onError?: (error: SirenErrorType) => void;
  darkMode?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  hideBadge?: boolean;
};

export type InboxHeaderProps = {
  title?: string;
  hideHeader?: boolean;
  hideClearAll?: boolean;
  customHeader?: JSX.Element;
  showBackButton?: boolean;
  backButton?: JSX.Element;
  onBackPress?: () => void;
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
  onAvatarClick?: (notification: NotificationDataType) => void;
  disableAutoMarkAsRead?: boolean;
  hideDelete?: boolean;
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
 * @property {Object} [windowHeader] - Configuration for the window header.
 * @property {Object} [windowContainer] - Configuration for the window container.
 * @property {Object} [notificationCard] - Styling options for notification cards.
 */
export type ThemeProps = {
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
  badgeStyle?: {
    color?: string;
    textColor?: string;
  };
  windowHeader?: {
    background?: string;
    titleColor?: string;
    headerActionColor?: string;
    borderColor?: string;
  };
  windowContainer?: {
    background?: string;
  };
  notificationCard?: {
    borderColor?: string;
    background?: string;
    titleColor?: string;
    subTitleColor?: string;
    descriptionColor?: string;
    dateColor?: string;
  };
};

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
    titlePadding?: number;
    borderWidth?: number;
  };
  windowContainer?: {
    padding?: number;
  };
  notificationCard?: {
    padding?: number;
    borderWidth?: number;
    avatarSize?: number;
    titleFontWeight?: TextStyle['fontWeight'];
    titleSize?: number;
    subTitleFontWeight?: TextStyle['fontWeight'];
    subTitleSize?: number
    descriptionFontWeight?: TextStyle['fontWeight'];
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
  darkMode: boolean;
  styles: Partial<SirenStyleProps>;
  onDelete: (id: string, shouldUpdateList: boolean) => Promise<boolean>;
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
  clearIcon: ViewStyle;
  clearIconContainer: ViewStyle;
  cardContainer: ViewStyle;
  cardIconRound: ViewStyle;
  cardTitle: TextStyle | object;
  cardSubTitle: TextStyle | object;
  cardDescription: TextStyle | object;
  dateStyle: TextStyle;
  emptyText: TextStyle;
  errorText: TextStyle;
  errorButton: ViewStyle;
  errorButtonText: TextStyle;
  closeIcon: ViewStyle;
  closeButton: ViewStyle;
  cardWrapper: ViewStyle;
  activeCardMarker: ViewStyle;
  timerIcon: ViewStyle;
  timerIconLine: ViewStyle;
  timerIconLine2: ViewStyle;
  skeltonLoaderColor: ViewStyle;
  highlighted: ViewStyle;
  backIcon: ViewStyle;
};
