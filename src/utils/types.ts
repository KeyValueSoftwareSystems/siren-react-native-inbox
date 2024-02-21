import type { DimensionValue, ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type { SirenErrorType } from 'bilta-sdk/dist/types';

/**
 * Siren Notification Window Props
 * These props define the configuration options for the Siren Notification Window component.
 */
type SirenInboxProps = {
  theme?: Theme; // Object with multiple properties to customize the look and feel of notification feed.
  title?: string; // title of the notification panel
  hideHeader?: boolean; // Hide window header
  darkMode?: boolean; // Theme selection prop
  cardProps?: CardProps; // To customize the notification card
  realTimeNotificationEnabled?: boolean; // Poll settings for notification API for getting new notifications
  notificationsPerPage?: number; // Pagination prop for fetching notifications in single API call
  listEmptyComponent?: JSX.Element; // Custom UI for empty notifications scenario
  customFooter?: JSX.Element; // Custom Notification panel footer UI
  customHeader?: JSX.Element; // Custom Notification panel header UI
  customNotificationCard?: (notification: NotificationResponseDataItem) => JSX.Element; // UI for notification card
  onNotificationCardClick?: (notification: NotificationResponseDataItem) => void; // Function for notification click
  onError?: (error: SirenErrorType) => void; // Function provides appropriate feedback for unexpected errors.
};

type SirenNotificationIconProps = {
  theme?: Theme; // Object with multiple properties to customize the look and feel of notification feed.
  badgeType?: BadgeType; // badge type on top of notification icon (none | default | dot)
  realTimeUnviewedCountEnabled?: boolean; // Poll settings for new notification count for getting new notification count
  notificationIcon?: JSX.Element; // Custom notification bell icon
  onError?: (error: SirenErrorType) => void; // Function provides appropriate feedback for unexpected errors.
  darkMode?: boolean; // Theme selection prop
};

// Object with multiple properties to customize the look and feel of notification feed.
type SirenProviderConfigProps = {
  userToken: string;
  recipientId: string;
};

/**
 * Card Props
 * These props define the configuration options for individual notification cards.
 */
type CardProps = {
  hideAvatar?: boolean;
  showMedia?: boolean;
};

/**
 * Badge Type
 */
type BadgeType = 'none' | 'dot' | 'default';

/**
 * Theme
 * Object defining the theme configuration options.
 */
type Theme = {
  dark?: ThemeProps;
  light?: ThemeProps;
};

/**
 * Theme Props
 * These props define the configuration options for different theme elements.
 */
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
  window?: WindowProps;
  windowHeader?: WindowHeaderProps;
  windowContainer?: WindowContainerProps;
  notificationCard?: NotificationCardThemeProps;
};

/**
 * Window Props
 * These props define the configuration options for the notification window.
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
 * Window Header Props
 * These props define the configuration options for the window header.
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
 * Window Container Props
 * These props define the configuration options for the window container.
 */
type WindowContainerProps = {
  background?: string;
  padding?: number;
};

/**
 * Notification Card Props
 * These props define the configuration options for the notification card theme.
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
 * Notification Card
 * Object defining the structure of the prop passing to notification card.
 */
type NotificationCardProps = {
  onCardClick: (notification: NotificationResponseDataItem) => void;
  notification: NotificationResponseDataItem;
  cardProps: CardProps;
  styles: SirenStyleProps;
  onDelete: (id: string) => void;
};

/**
 * Notification Response
 * Object defining the structure of the notification response.
 */
type NotificationResponse = {
  data: NotificationResponseDataItem[];
  error: SirenErrorType;
  errors: SirenErrorType[];
  meta: {
    currentPage: string;
    first: string;
    last: string;
    pageSize: string;
    totalElements: string;
    totalPages: string;
  };
};

/**
 * Notification Response Data Item
 * Object defining the structure of an individual notification.
 */
type NotificationResponseDataItem = {
  createdAt: string;
  id: string;
  isRead: boolean;
  message: MessageContent;
  requestId: string;
};

/**
 * Message Content
 * Object defining the structure of the message content within a notification.
 */
type MessageContent = {
  actionUrl?: string;
  additionalData?: object;
  avatar?: AvatarContent;
  media?: MediaContent;
  body: string;
  channel: string;
  header: string;
  subHeader: string;
};

/**
 * Avatar Content
 * Object defining the structure of the avatar content within a notification.
 */
type AvatarContent = {
  actionUrl?: string;
  imageUrl?: string;
};

/**
 * Media Content
 * Object defining the structure of the media content within a notification.
 */
type MediaContent = {
  thumbnail?: string;
};

/**
 * Unviewed Type
 * Object defining the structure of unviewed notifications.
 */
type UnviewedType = {
  unviewedCount: number;
};

type SirenStyleProps = {
  container: ViewStyle | object;
  contentContainer: ViewStyle;
  headerContainer: ViewStyle;
  headerTitle: TextStyle | object;
  headerAction: TextStyle;
  cardContainer: ViewStyle;
  cardIconContainer: ViewStyle;
  cardIconRound: ViewStyle;
  cardAvatarStyle: ImageStyle;
  cardContentContainer: ViewStyle;
  cardTitle: TextStyle | object;
  cardDescription: TextStyle;
  cardImageStyle: ImageStyle | object;
  cardFooterRow: ViewStyle;
  dateStyle: TextStyle;
  deleteButton: ViewStyle;
  deleteButtonText: TextStyle;
  emptyContainer: ViewStyle;
  emptyText: TextStyle;
  errorText: TextStyle;
  errorButton: ViewStyle;
  errorButtonText: TextStyle;
};

export {
  SirenInboxProps,
  SirenNotificationIconProps,
  SirenProviderConfigProps,
  SirenStyleProps,
  Theme,
  ThemeProps,
  UnviewedType,
  NotificationResponse,
  NotificationResponseDataItem,
  NotificationCardProps
};
