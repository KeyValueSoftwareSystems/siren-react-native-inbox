import type { NotificationDataType } from 'test_notification/dist/esm/types';

import { eventTypes, levelLogFns, LogLevel, ThemeMode } from './constants';
import type { SirenStyleProps, ThemeProps } from '../types';

import { DefaultTheme } from './index';

export const isNonEmptyArray = (arr?: unknown[] | null) =>
  Boolean(arr && typeof arr === 'object' && arr instanceof Array && arr.length > 0);

export const updateNotifications = (
  eventData: {
    id?: string;
    action: string;
    newNotifications?: NotificationDataType[];
    unreadCount?: number;
  },
  notifications: NotificationDataType[]
): NotificationDataType[] => {
  let updatedNotifications: NotificationDataType[] = [];

  switch (eventData.action) {
    case eventTypes.MARK_ITEM_AS_READ:
      updatedNotifications = notifications.map((item) =>
        item.id === eventData.id ? { ...item, isRead: true } : item
      );
      break;
    case eventTypes.MARK_ALL_AS_READ:
      updatedNotifications = notifications.map((item) => ({
        ...item,
        isRead: true
      }));
      break;
    case eventTypes.DELETE_ITEM:
      updatedNotifications = notifications.filter((item) => item.id != eventData.id);
      break;
    case eventTypes.DELETE_ALL_ITEM:
      updatedNotifications = [];
      break;
    case eventTypes.NEW_NOTIFICATIONS: {
      const newNotifications: NotificationDataType[] = eventData?.newNotifications || [];

      updatedNotifications = [...newNotifications, ...notifications];
      break;
    }
    default:
      break;
  }

  return updatedNotifications;
};

export const generateElapsedTimeText = (timeString: string) => {
  const currentTime = new Date().getTime();
  const targetTime = new Date(timeString).getTime();
  const millisecondsDiff = currentTime - targetTime;

  const seconds = Math.floor(millisecondsDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  if (millisecondsDiff < 60000) return 'Just now';
  else if (minutes < 60) return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  else if (hours < 24) return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  else if (days < 365) return days === 1 ? '1 day ago' : `${days} days ago`;
  else return years === 1 ? '1 year ago' : `${years} years ago`;
};

export const logger = {
  log: async (level: LogLevel.INFO | LogLevel.ERROR, message: string) => {
    const timestamp = new Date().toISOString();
    const levelString = LogLevel[level]?.toUpperCase();
    const levelLogFn = levelLogFns[level];

    levelLogFn(`[${timestamp}] [${levelString}] ${message}`);
  },
  error: function (error: string) {
    this.log(LogLevel.ERROR, error);
  },
  info: function (message: string) {
    this.log(LogLevel.INFO, message);
  }
};

export const applyTheme = (
  theme: ThemeProps = {},
  mode: ThemeMode = ThemeMode.LIGHT
): SirenStyleProps => ({
  container: {
    backgroundColor:
      theme.windowContainer?.background ||
      theme.colors?.neutralColor ||
      DefaultTheme[mode].windowContainer.background,
    width: theme.window?.width || DefaultTheme[mode].window.width,
    height: theme.window?.height || DefaultTheme[mode].window.height
  },
  contentContainer: {
    backgroundColor:
      theme.windowContainer?.background ||
      theme.colors?.neutralColor ||
      DefaultTheme[mode].windowContainer.background,
    padding: theme.windowContainer?.padding || DefaultTheme[mode].windowContainer.padding
  },
  headerContainer: {
    backgroundColor:
      theme.windowHeader?.background ||
      theme.colors?.neutralColor ||
      DefaultTheme[mode].windowHeader.background,
    height: theme.windowHeader?.height || DefaultTheme[mode].windowHeader.height,
    borderBottomColor:
      theme.windowHeader?.borderColor ||
      theme.colors?.borderColor ||
      DefaultTheme[mode].windowHeader?.borderColor
  },
  headerTitle: {
    color:
      theme.windowHeader?.titleColor ||
      theme.colors?.textColor ||
      DefaultTheme[mode].windowHeader.titleColor,
    fontSize: theme.windowHeader?.titleSize || DefaultTheme[mode].windowHeader.titleSize,
    fontWeight:
      theme.windowHeader?.titleFontWeight || DefaultTheme[mode].windowHeader.titleFontWeight,
    paddingLeft: theme.windowHeader?.titlePadding || DefaultTheme[mode].windowHeader.titlePadding
  },
  headerAction: {
    color:
      theme.windowHeader?.headerActionColor ||
      theme.colors?.textColor ||
      DefaultTheme[mode].windowHeader.headerActionColor
  },
  clearIcon: {
    backgroundColor:
      theme.windowHeader?.headerActionColor ||
      theme.colors?.textColor ||
      DefaultTheme[mode].windowHeader.headerActionColor
  },
  timerIcon: {
    borderColor: theme.colors?.textColor || DefaultTheme[mode].colors.textColor
  },
  timerIconLine: {
    backgroundColor: theme.colors?.textColor || DefaultTheme[mode].colors.textColor
  },
  cardContainer: {
    backgroundColor:
      theme.notificationCard?.background ||
      theme.colors?.highlightedCardColor ||
      DefaultTheme[mode].notificationCard.background,
    padding: theme.notificationCard?.padding || DefaultTheme[mode].notificationCard.padding
  },
  cardWrapper: {
    borderBottomWidth:
      theme.notificationCard?.borderWidth || DefaultTheme[mode].notificationCard.borderWidth,
    borderBottomColor:
      theme.notificationCard?.borderColor ||
      theme.colors?.borderColor ||
      DefaultTheme[mode].notificationCard.borderColor
  },
  activeCardMarker: {
    backgroundColor: theme.colors?.primaryColor || DefaultTheme[mode].colors?.primaryColor
  },
  cardIconRound: {
    width: theme.notificationCard?.avatarSize || DefaultTheme[mode].notificationCard.avatarSize,
    height: theme.notificationCard?.avatarSize || DefaultTheme[mode].notificationCard.avatarSize,
    borderRadius:
      (theme.notificationCard?.avatarSize || DefaultTheme[mode].notificationCard.avatarSize) / 2,
    backgroundColor: theme.colors?.borderColor || DefaultTheme[mode].colors.borderColor
  },
  closeIcon: {
    backgroundColor: theme.colors?.textColor || DefaultTheme[mode].colors.textColor
  },
  cardTitle: {
    color:
      theme.notificationCard?.titleColor ||
      theme.colors?.textColor ||
      DefaultTheme[mode].notificationCard.titleColor,
    fontSize: theme.notificationCard?.titleSize || DefaultTheme[mode].notificationCard.titleSize,
    fontWeight:
      theme.notificationCard?.titleFontWeight ||
      DefaultTheme[mode].notificationCard.titleFontWeight,
    paddingHorizontal:
      theme.notificationCard?.padding || DefaultTheme[mode].notificationCard.titlePadding
  },
  cardDescription: {
    color:
      theme.notificationCard?.descriptionColor ||
      theme.colors?.textColor ||
      DefaultTheme[mode].notificationCard.descriptionColor,
    fontSize:
      theme.notificationCard?.descriptionSize ||
      DefaultTheme[mode].notificationCard.descriptionSize,
    paddingHorizontal:
      theme.notificationCard?.descriptionPadding ||
      DefaultTheme[mode].notificationCard.descriptionPadding
  },
  dateStyle: {
    color:
      theme.notificationCard?.dateColor ||
      theme.colors?.textColor ||
      DefaultTheme[mode].notificationCard.dateColor,
    fontSize: theme.notificationCard?.dateSize || DefaultTheme[mode].notificationCard.dateSize
  },
  emptyText: {
    color: theme.colors?.textColor || DefaultTheme[mode].colors.textColor
  },
  errorText: {
    color: theme.colors?.primaryColor || DefaultTheme[mode].colors.primaryColor
  },
  errorButton: {
    backgroundColor: theme.colors?.primaryColor || DefaultTheme[mode].colors.primaryColor
  },
  errorButtonText: {
    color: theme.colors?.textColor || DefaultTheme[mode].colors.textColor
  }
});
