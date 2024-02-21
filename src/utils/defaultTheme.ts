import { COLORS, ThemeMode } from './constants';

const defaultTheme = {
  light: {
    colors: {
      primaryColor: COLORS[ThemeMode.LIGHT].primaryColor,
      secondaryColor: COLORS[ThemeMode.LIGHT].secondaryColor,
      textColor: COLORS[ThemeMode.LIGHT].textColor,
      neutralColor: COLORS[ThemeMode.LIGHT].neutralColor,
      borderColor: COLORS[ThemeMode.LIGHT].borderColor,
      primaryTextColor: COLORS[ThemeMode.DARK].primaryTextColor
    },
    unreadBadgeCount: {
      background: COLORS[ThemeMode.LIGHT].secondaryColor,
      color: COLORS[ThemeMode.LIGHT].neutralColor,
      borderRadius: 10,
      fontSize: 14,
      inset: 2,
      size: 14
    },
    window: {
      width: '100%',
      height: '100%',
      borderColor: COLORS[ThemeMode.LIGHT].borderColor,
      borderRadius: 0,
      shadowDepth: 0,
      shadowColor: COLORS[ThemeMode.LIGHT].borderColor
    },
    windowHeader: {
      background: COLORS[ThemeMode.LIGHT].primaryColor,
      height: 50,
      titleColor: COLORS[ThemeMode.LIGHT].neutralColor,
      titleFontWeight: '500',
      titleSize: 20,
      closeIconColor: COLORS[ThemeMode.LIGHT].neutralColor,
      closeIconSize: 20
    },
    windowContainer: {
      background: COLORS[ThemeMode.LIGHT].neutralColor,
      padding: 0
    },
    notificationCard: {
      height: '100%',
      padding: 10,
      borderWidth: 1,
      borderColor: COLORS[ThemeMode.LIGHT].borderColor,
      background: COLORS[ThemeMode.LIGHT].activeCardColor,
      hoverBackground: COLORS[ThemeMode.LIGHT].neutralColor,
      avatarSize: 40,
      titleColor: COLORS[ThemeMode.LIGHT].textColor,
      titleFontWeight: '500',
      titleSize: 16,
      titlePadding: 0,
      descriptionColor: COLORS[ThemeMode.LIGHT].textColor,
      descriptionSize: 14,
      descriptionPadding: 0,
      mediaWidth: '100%',
      mediaHeight: 150,
      mediaObjectFit: 'cover',
      mediaRadius: 8,
      mediaPlaceholder: COLORS[ThemeMode.LIGHT].borderColor,
      dateColor: COLORS[ThemeMode.LIGHT].textColor,
      dateSize: 12
    }
  },
  dark: {
    colors: {
      primaryColor: COLORS[ThemeMode.DARK].primaryColor,
      secondaryColor: COLORS[ThemeMode.DARK].secondaryColor,
      textColor: COLORS[ThemeMode.DARK].textColor,
      neutralColor: COLORS[ThemeMode.DARK].neutralColor,
      borderColor: COLORS[ThemeMode.DARK].borderColor,
      primaryTextColor: COLORS[ThemeMode.DARK].primaryTextColor
    },
    unreadBadgeCount: {
      background: COLORS[ThemeMode.DARK].secondaryColor,
      color: COLORS[ThemeMode.DARK].neutralColor,
      borderRadius: 10,
      fontSize: 14,
      inset: 2,
      size: 14
    },
    window: {
      width: '100%',
      height: '100%',
      borderColor: COLORS[ThemeMode.DARK].borderColor,
      borderRadius: 0,
      shadowDepth: 0,
      shadowColor: COLORS[ThemeMode.DARK].borderColor
    },
    windowHeader: {
      background: COLORS[ThemeMode.DARK].primaryColor,
      height: 50,
      titleColor: COLORS[ThemeMode.DARK].primaryTextColor,
      titleFontWeight: '500',
      titleSize: 20,
      closeIconColor: COLORS[ThemeMode.DARK].neutralColor,
      closeIconSize: 20
    },
    windowContainer: {
      background: COLORS[ThemeMode.DARK].neutralColor,
      padding: 0
    },
    notificationCard: {
      height: '100%',
      padding: 10,
      borderWidth: 1,
      borderColor: COLORS[ThemeMode.DARK].borderColor,
      background: COLORS[ThemeMode.DARK].activeCardColor,
      hoverBackground: COLORS[ThemeMode.DARK].neutralColor,
      avatarSize: 40,
      titleColor: COLORS[ThemeMode.DARK].textColor,
      titleFontWeight: '500',
      titleSize: 16,
      titlePadding: 0,
      descriptionColor: COLORS[ThemeMode.DARK].textColor,
      descriptionSize: 14,
      descriptionPadding: 0,
      mediaWidth: '100%',
      mediaHeight: 150,
      mediaObjectFit: 'cover',
      mediaRadius: 8,
      mediaPlaceholder: COLORS[ThemeMode.DARK].borderColor,
      dateColor: COLORS[ThemeMode.DARK].textColor,
      dateSize: 12
    }
  }
};

export default defaultTheme;
