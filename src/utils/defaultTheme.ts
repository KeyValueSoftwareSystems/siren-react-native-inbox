import { COLORS, ThemeMode } from './constants';

const defaultTheme = {
  light: {
    colors: {
      primaryColor: COLORS[ThemeMode.LIGHT].primaryColor,
      textColor: COLORS[ThemeMode.LIGHT].textColor,
      neutralColor: COLORS[ThemeMode.LIGHT].neutralColor,
      borderColor: COLORS[ThemeMode.LIGHT].borderColor,
    },
    notificationIcon: {
      size: 30,
    },
    window: {
      width: '100%',
      height: '100%',
    },
    windowHeader: {
      background: COLORS[ThemeMode.LIGHT].neutralColor,
      height: 50,
      titleColor: COLORS[ThemeMode.LIGHT].textColor,
      titleFontWeight: '500',
      titleSize: 20,
      headerActionColor: COLORS[ThemeMode.LIGHT].borderColor,
      closeIconSize: 20,
      titlePadding: 0,
    },
    windowContainer: {
      background: COLORS[ThemeMode.LIGHT].neutralColor,
      padding: 0
    },
    notificationCard: {
      padding: 10,
      borderWidth: 0.6,
      borderColor: COLORS[ThemeMode.LIGHT].borderColor,
      background: COLORS[ThemeMode.LIGHT].activeCardColor,
      avatarSize: 40,
      titleColor: COLORS[ThemeMode.LIGHT].textColor,
      titleFontWeight: '500',
      titleSize: 16,
      titlePadding: 0,
      descriptionColor: COLORS[ThemeMode.LIGHT].textColor,
      descriptionSize: 14,
      descriptionPadding: 0,
      dateColor: COLORS[ThemeMode.LIGHT].textColor,
      dateSize: 12
    }
  },
  dark: {
    colors: {
      primaryColor: COLORS[ThemeMode.DARK].primaryColor,
      textColor: COLORS[ThemeMode.DARK].textColor,
      neutralColor: COLORS[ThemeMode.DARK].neutralColor,
      borderColor: COLORS[ThemeMode.DARK].borderColor,
    },
    notificationIcon: {
      size: 30,
    },
    window: {
      width: '100%',
      height: '100%',
    },
    windowHeader: {
      background: COLORS[ThemeMode.DARK].neutralColor,
      height: 50,
      titleColor: COLORS[ThemeMode.DARK].textColor,
      titleFontWeight: '500',
      titleSize: 20,
      headerActionColor: COLORS[ThemeMode.DARK].borderColor,
      closeIconSize: 20,
      titlePadding: 0
    },
    windowContainer: {
      background: COLORS[ThemeMode.DARK].neutralColor,
      padding: 0
    },
    notificationCard: {
      padding: 10,
      borderWidth: 0.6,
      borderColor: COLORS[ThemeMode.DARK].borderColor,
      background: COLORS[ThemeMode.DARK].activeCardColor,
      avatarSize: 40,
      titleColor: COLORS[ThemeMode.DARK].textColor,
      titleFontWeight: '500',
      titleSize: 16,
      titlePadding: 0,
      descriptionColor: COLORS[ThemeMode.DARK].textColor,
      descriptionSize: 14,
      descriptionPadding: 0,
      dateColor: COLORS[ThemeMode.DARK].textColor,
      dateSize: 12
    }
  }
};

export default defaultTheme;
