import { DefaultTheme } from './index';
import { LogLevel, ThemeMode, levelLogFns } from './constants';
import type { SirenStyleProps, ThemeProps } from '../types';

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
    height: theme.window?.height || DefaultTheme[mode].window.height,
    borderColor: theme.window?.borderColor || DefaultTheme[mode].window.borderColor,
    borderRadius: theme.window?.borderRadius || DefaultTheme[mode].window.borderRadius,
    minWidth: 300
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
      theme.colors?.primaryColor ||
      DefaultTheme[mode].windowHeader.background,
    width: '100%',
    height: theme.windowHeader?.height || DefaultTheme[mode].windowHeader.height,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  headerTitle: {
    color:
      theme.windowHeader?.titleColor ||
      theme.colors?.neutralColor ||
      DefaultTheme[mode].windowHeader.titleColor,
    fontSize: theme.windowHeader?.titleSize || DefaultTheme[mode].windowHeader.titleSize,
    fontWeight:
      theme.windowHeader?.titleFontWeight || DefaultTheme[mode].windowHeader.titleFontWeight,
    width: '70%'
  },
  headerAction: {
    color:
      theme.windowHeader?.titleColor ||
      theme.colors?.neutralColor ||
      DefaultTheme[mode].windowHeader.titleColor
  },
  cardContainer: {
    backgroundColor:
      theme.notificationCard?.background ||
      theme.colors?.activeCardColor ||
      DefaultTheme[mode].notificationCard.background,
    width: '100%',
    padding: theme.notificationCard?.padding || DefaultTheme[mode].notificationCard.padding,
    flexDirection: 'row',
    borderBottomWidth:
      theme.notificationCard?.borderWidth || DefaultTheme[mode].notificationCard.borderWidth,
    borderBottomColor:
      theme.notificationCard?.borderColor ||
      theme.colors?.borderColor ||
      DefaultTheme[mode].notificationCard.borderColor
  },
  cardIconContainer: {
    paddingHorizontal: 10,
    paddingTop: 4
  },
  cardIconRound: {
    width: theme.notificationCard?.avatarSize || DefaultTheme[mode].notificationCard.avatarSize,
    height: theme.notificationCard?.avatarSize || DefaultTheme[mode].notificationCard.avatarSize,
    borderRadius:
      (theme.notificationCard?.avatarSize || DefaultTheme[mode].notificationCard.avatarSize) / 2,
    overflow: 'hidden',
    backgroundColor: theme.colors?.borderColor || DefaultTheme[mode].colors.borderColor
  },
  cardAvatarStyle: {
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  cardContentContainer: {
    flex: 1,
    width: '100%'
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
    paddingBottom: 4,
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
    fontWeight: '400',
    paddingBottom: 10,
    paddingHorizontal:
      theme.notificationCard?.descriptionPadding ||
      DefaultTheme[mode].notificationCard.descriptionPadding
  },
  cardImageStyle: {
    width: theme.notificationCard?.mediaWidth || DefaultTheme[mode].notificationCard.mediaWidth,
    height: theme.notificationCard?.mediaHeight || DefaultTheme[mode].notificationCard.mediaHeight,
    borderRadius:
      theme.notificationCard?.mediaRadius || DefaultTheme[mode].notificationCard.mediaRadius,
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor:
      theme.notificationCard?.mediaPlaceholder ||
      DefaultTheme[mode].notificationCard.mediaPlaceholder
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  dateStyle: {
    color:
      theme.notificationCard?.dateColor ||
      theme.colors?.borderColor ||
      DefaultTheme[mode].notificationCard.dateColor,
    fontSize: theme.notificationCard?.dateSize || DefaultTheme[mode].notificationCard.dateSize,
    opacity: 0.6
  },
  deleteButton: {
    width: 15,
    height: 15,
    overflow: 'hidden',
    justifyContent: 'center'
  },
  deleteIcon: {
    width: '100%',
    height: '100%',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    minHeight: 100,
    width: '100%'
  },
  emptyText: {
    color: theme.colors?.textColor || DefaultTheme[mode].colors.textColor,
    fontSize: 18,
    fontWeight: '400',
    padding: 20
  },
  errorText: {
    color: theme.colors?.primaryColor || DefaultTheme[mode].colors.primaryColor,
    fontSize: 18,
    fontWeight: '400',
    padding: 20
  },
  errorButton: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: theme.colors?.primaryColor || DefaultTheme[mode].colors.primaryColor
  },
  errorButtonText: {
    color: theme.colors?.primaryTextColor || DefaultTheme[mode].colors.primaryTextColor,
    fontSize: 16,
    fontWeight: '500'
  },
  transparent: {
    backgroundColor: 'transparent'
  }
});
