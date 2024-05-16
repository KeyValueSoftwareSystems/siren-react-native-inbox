import type { NotificationDataType } from '@sirenapp/js-sdk/dist/esm/types';

import { defaultStyles, eventTypes, levelLogFns, LogLevel, ThemeMode } from './constants';
import type { StyleProps, CustomStyleProps, ThemeProps } from '../types';

import { DefaultTheme } from './index';

export const isNonEmptyArray = (arr?: unknown[] | null) =>
  Boolean(arr && typeof arr === 'object' && arr instanceof Array && arr.length > 0);

export const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

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
    case eventTypes.RESET_NOTIFICATIONS: {
      updatedNotifications = [];
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
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (millisecondsDiff < 60000) return 'Just now';
  else if (minutes < 60) return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  else if (hours < 24) return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  else if (days < 30) return days === 1 ? '1 day ago' : `${days} days ago`;
  else if (months < 12) return months === 1 ? '1 month ago' : `${months} months ago`;
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
  customStyles: CustomStyleProps = {},
  mode: ThemeMode = ThemeMode.LIGHT
): StyleProps => ({
  container: {
    backgroundColor:
      theme.windowContainer?.background ||
      theme.colors?.neutralColor ||
      DefaultTheme[mode].windowContainer.background,
    width: customStyles.window?.width || defaultStyles.window?.width,
    height: customStyles.window?.height || defaultStyles.window?.height
  },
  contentContainer: {
    backgroundColor:
      theme.windowContainer?.background ||
      theme.colors?.neutralColor ||
      DefaultTheme[mode].windowContainer.background,
    padding: customStyles.windowContainer?.padding || defaultStyles.windowContainer?.padding
  },
  headerContainer: {
    backgroundColor:
      theme.windowHeader?.background ||
      theme.colors?.neutralColor ||
      DefaultTheme[mode].windowHeader.background,
    borderBottomColor:
      theme.windowHeader?.borderColor ||
      theme.colors?.borderColor ||
      DefaultTheme[mode].windowHeader?.borderColor,
    borderBottomWidth:
      customStyles.windowHeader?.borderWidth || defaultStyles.windowHeader?.borderWidth,
    height: customStyles.windowHeader?.height || defaultStyles.windowHeader?.height
  },
  headerTitle: {
    color:
      theme.windowHeader?.titleColor ||
      theme.colors?.textColor ||
      DefaultTheme[mode].windowHeader.titleColor,
    fontSize: customStyles.windowHeader?.titleSize || defaultStyles.windowHeader.titleSize,
    fontWeight:
      customStyles.windowHeader?.titleFontWeight || defaultStyles.windowHeader.titleFontWeight,
    paddingLeft: customStyles.windowHeader?.titlePadding || defaultStyles.windowHeader.titlePadding
  },
  headerAction: {
    color:
      theme.windowHeader?.headerActionColor ||
      theme.colors?.clearAllIcon ||
      DefaultTheme[mode].windowHeader.headerActionColor
  },
  clearIcon: {
    backgroundColor:
      theme.windowHeader?.headerActionColor ||
      theme.colors?.clearAllIcon ||
      DefaultTheme[mode].windowHeader.headerActionColor,
    height: (customStyles.clearAllIcon?.size || defaultStyles.clearAllIcon.size) * 0.12,
    borderRadius: (customStyles.clearAllIcon?.size || defaultStyles.clearAllIcon.size) * 0.12,
    marginTop: (customStyles.clearAllIcon?.size || defaultStyles.clearAllIcon.size) * 0.1,
    marginBottom: (customStyles.clearAllIcon?.size || defaultStyles.clearAllIcon.size) * 0.05,
    marginRight: (customStyles.clearAllIcon?.size || defaultStyles.clearAllIcon.size) * 0.5
  },
  clearIconContainer: {
    width: customStyles.clearAllIcon?.size || defaultStyles.clearAllIcon.size,
    height: customStyles.clearAllIcon?.size || defaultStyles.clearAllIcon.size,
    marginRight: (customStyles.clearAllIcon?.size || defaultStyles.clearAllIcon.size) * 0.3
  },
  timerIcon: {
    borderColor: theme.colors?.timerIcon || DefaultTheme[mode].colors.timerIcon,
    width: customStyles.timerIcon?.size || defaultStyles.timerIcon.size,
    height: customStyles.timerIcon?.size || defaultStyles.timerIcon.size,
    borderRadius: (customStyles.timerIcon?.size || defaultStyles.timerIcon.size) / 2,
    borderWidth: (customStyles.timerIcon?.size || defaultStyles.timerIcon.size) * 0.1,
    padding: (customStyles.timerIcon?.size || defaultStyles.timerIcon.size) * 0.1
  },
  timerIconLine: {
    backgroundColor: theme.colors?.timerIcon || DefaultTheme[mode].colors.timerIcon,
    height: (customStyles.timerIcon?.size || defaultStyles.timerIcon.size) * 0.36,
    width: (customStyles.timerIcon?.size || defaultStyles.timerIcon.size) * 0.1
  },
  timerIconLine2: {
    backgroundColor: theme.colors?.timerIcon || DefaultTheme[mode].colors.timerIcon,
    height: (customStyles.timerIcon?.size || defaultStyles.timerIcon.size) * 0.28,
    width: (customStyles.timerIcon?.size || defaultStyles.timerIcon.size) * 0.1,
    marginLeft: (customStyles.timerIcon?.size || defaultStyles.timerIcon.size) * 0.22,
    marginTop: -(customStyles.timerIcon?.size || defaultStyles.timerIcon.size) * 0.1
  },
  cardContainer: {
    padding: customStyles.notificationCard?.padding || defaultStyles.notificationCard.padding
  },
  cardWrapper: {
    backgroundColor:
      theme.notificationCard?.background || DefaultTheme[mode].notificationCard.background,
    borderBottomColor:
      theme.notificationCard?.borderColor ||
      theme.colors?.borderColor ||
      DefaultTheme[mode].notificationCard.borderColor,
    borderBottomWidth:
      customStyles.notificationCard?.borderWidth || defaultStyles.notificationCard.borderWidth
  },
  activeCardMarker: {
    backgroundColor: theme.colors?.primaryColor || DefaultTheme[mode].colors?.primaryColor
  },
  cardIconRound: {
    width: customStyles.notificationCard?.avatarSize || defaultStyles.notificationCard.avatarSize,
    height: customStyles.notificationCard?.avatarSize || defaultStyles.notificationCard.avatarSize,
    borderRadius:
      (customStyles.notificationCard?.avatarSize || defaultStyles.notificationCard.avatarSize) / 2
  },
  closeIcon: {
    backgroundColor: theme.colors?.deleteIcon || DefaultTheme[mode].colors.deleteIcon,
    height: (customStyles.deleteIcon?.size || defaultStyles.deleteIcon.size) * 0.14
  },
  closeButton: {
    width: customStyles.deleteIcon?.size || defaultStyles.deleteIcon.size,
    height: customStyles.deleteIcon?.size || defaultStyles.deleteIcon.size
  },
  cardTitle: {
    color:
      theme.notificationCard?.titleColor ||
      theme.colors?.textColor ||
      DefaultTheme[mode].notificationCard.titleColor,
    fontSize: customStyles.notificationCard?.titleSize || defaultStyles.notificationCard.titleSize,
    fontWeight:
      customStyles.notificationCard?.titleFontWeight ||
      defaultStyles.notificationCard.titleFontWeight,
    lineHeight:
      (customStyles.notificationCard?.titleSize || defaultStyles.notificationCard.titleSize) + 6
  },
  cardSubTitle: {
    color:
      theme.notificationCard?.subTitleColor ||
      theme.colors?.textColor ||
      DefaultTheme[mode].notificationCard.subTitleColor,
    fontSize:
      customStyles.notificationCard?.subtitleSize || defaultStyles.notificationCard.subtitleSize,
    fontWeight:
      customStyles.notificationCard?.subtitleFontWeight ||
      defaultStyles.notificationCard.subtitleFontWeight,
    lineHeight:
      (customStyles.notificationCard?.subtitleSize || defaultStyles.notificationCard.subtitleSize) +
      8
  },
  cardDescription: {
    color:
      theme.notificationCard?.descriptionColor ||
      theme.colors?.textColor ||
      DefaultTheme[mode].notificationCard.descriptionColor,
    fontSize:
      customStyles.notificationCard?.descriptionSize ||
      defaultStyles.notificationCard.descriptionSize,
    fontWeight:
      customStyles.notificationCard?.descriptionFontWeight ||
      defaultStyles.notificationCard.descriptionFontWeight,
    lineHeight:
      (customStyles.notificationCard?.descriptionSize ||
        defaultStyles.notificationCard.descriptionSize) + 8
  },
  dateStyle: {
    color:
      theme.notificationCard?.dateColor ||
      theme.colors?.dateColor ||
      DefaultTheme[mode].notificationCard.dateColor,
    fontSize: customStyles.notificationCard?.dateSize || defaultStyles.notificationCard.dateSize
  },
  emptyText: {
    color: theme.colors?.textColor || DefaultTheme[mode].colors.textColor
  },
  errorText: {
    color: theme.colors?.textColor || DefaultTheme[mode].colors.textColor
  },
  errorButton: {
    backgroundColor: theme.colors?.primaryColor || DefaultTheme[mode].colors.primaryColor
  },
  errorButtonText: {
    color: theme.colors?.textColor || DefaultTheme[mode].colors.textColor
  },
  skeltonLoaderColor: {
    backgroundColor: theme.colors?.textColor || DefaultTheme[mode].colors.textColor
  },
  highlighted: {
    backgroundColor:
      theme.colors?.highlightedCardColor || DefaultTheme[mode].colors.highlightedCardColor
  },
  backIcon: {
    backgroundColor:
      theme.windowHeader?.titleColor ||
      theme.colors?.textColor ||
      DefaultTheme[mode].windowHeader.titleColor
  },
  mediaContainer: {
    backgroundColor: DefaultTheme[mode].notificationCard.mediaContainerBackground
  },
  tabContainer: {
    backgroundColor:
      theme.tabs?.containerBackgroundColor || DefaultTheme[mode].tabs.containerBackgroundColor,
    borderBottomColor: theme.colors?.borderColor || DefaultTheme[mode].colors.borderColor,
    height: customStyles.tabs?.containerHeight || defaultStyles.tabs.containerHeight
  },
  activeTab: {
    backgroundColor:
      theme.tabs?.activeTabBackgroundColor || DefaultTheme[mode].tabs.activeTabBackgroundColor
  },
  inActiveTab: {
    backgroundColor:
      theme.tabs?.inactiveTabBackgroundColor || DefaultTheme[mode].tabs.inactiveTabBackgroundColor
  },
  activeTabText: {
    color: theme.tabs?.activeTabTextColor || DefaultTheme[mode].tabs.activeTabTextColor,
    fontSize: customStyles.tabs?.activeTabTextSize || defaultStyles.tabs.activeTabTextSize,
    fontWeight: customStyles.tabs?.activeTabTextWeight || defaultStyles.tabs.activeTabTextWeight
  },
  inActiveTabText: {
    color: theme.tabs?.inactiveTabTextColor || DefaultTheme[mode].tabs.inactiveTabTextColor,
    fontSize: customStyles.tabs?.inactiveTabTextSize || defaultStyles.tabs.inactiveTabTextSize,
    fontWeight: customStyles.tabs?.inactiveTabTextWeight || defaultStyles.tabs.inactiveTabTextWeight
  },
  activeIndicator: {
    backgroundColor: theme.tabs?.indicatorColor || DefaultTheme[mode].tabs.indicatorColor,
    height: customStyles.tabs?.indicatorHeight || defaultStyles.tabs.indicatorHeight
  }
});
