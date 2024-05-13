import { COLORS, ThemeMode } from './constants';

const defaultTheme = {
  light: {
    colors: {
      primaryColor: COLORS[ThemeMode.LIGHT].primaryColor,
      textColor: COLORS[ThemeMode.LIGHT].textColor,
      neutralColor: COLORS[ThemeMode.LIGHT].neutralColor,
      highlightedCardColor: COLORS[ThemeMode.LIGHT].highlightedCardColor,
      borderColor: COLORS[ThemeMode.LIGHT].borderColor,
      dateColor: COLORS[ThemeMode.LIGHT].dateColor,
      deleteIcon: COLORS[ThemeMode.LIGHT].deleteIcon,
      timerIcon: COLORS[ThemeMode.LIGHT].timerIcon,
      clearAllIcon: COLORS[ThemeMode.LIGHT].clearAllIcon,
      infiniteLoader: COLORS[ThemeMode.LIGHT].infiniteLoader,
    },
    windowHeader: {
      background: COLORS[ThemeMode.LIGHT].neutralColor,
      titleColor: COLORS[ThemeMode.LIGHT].textColor,
      headerActionColor: COLORS[ThemeMode.LIGHT].clearAllIcon,
      borderColor: COLORS[ThemeMode.LIGHT].borderColor
    },
    windowContainer: {
      background: COLORS[ThemeMode.LIGHT].neutralColor
    },
    notificationCard: {
      borderColor: COLORS[ThemeMode.LIGHT].borderColor,
      background: COLORS[ThemeMode.LIGHT].neutralColor,
      titleColor: COLORS[ThemeMode.LIGHT].textColor,
      subTitleColor: COLORS[ThemeMode.LIGHT].textColor,
      descriptionColor: COLORS[ThemeMode.LIGHT].textColor,
      dateColor: COLORS[ThemeMode.LIGHT].textColor,
      mediaContainerBackground: COLORS[ThemeMode.LIGHT].imageBackground,
    },
    tabs: {
      containerBackgroundColor: COLORS[ThemeMode.LIGHT].neutralColor,
      activeTabBackgroundColor: COLORS[ThemeMode.LIGHT].neutralColor,
      inactiveTabBackgroundColor: COLORS[ThemeMode.LIGHT].neutralColor,
      activeTabTextColor: COLORS[ThemeMode.LIGHT].primaryColor,
      inactiveTabTextColor: COLORS[ThemeMode.LIGHT].textColor,
      indicatorColor: COLORS[ThemeMode.LIGHT].primaryColor,
    }
  },
  dark: {
    colors: {
      primaryColor: COLORS[ThemeMode.DARK].primaryColor,
      textColor: COLORS[ThemeMode.DARK].textColor,
      neutralColor: COLORS[ThemeMode.DARK].neutralColor,
      highlightedCardColor: COLORS[ThemeMode.DARK].highlightedCardColor,
      borderColor: COLORS[ThemeMode.DARK].borderColor,
      dateColor: COLORS[ThemeMode.DARK].dateColor,
      deleteIcon: COLORS[ThemeMode.DARK].deleteIcon,
      timerIcon: COLORS[ThemeMode.DARK].timerIcon,
      clearAllIcon: COLORS[ThemeMode.DARK].clearAllIcon,
      infiniteLoader: COLORS[ThemeMode.LIGHT].infiniteLoader,
    },
    windowHeader: {
      background: COLORS[ThemeMode.DARK].neutralColor,
      titleColor: COLORS[ThemeMode.DARK].textColor,
      headerActionColor: COLORS[ThemeMode.DARK].clearAllIcon,
      borderColor: COLORS[ThemeMode.DARK].borderColor
    },
    windowContainer: {
      background: COLORS[ThemeMode.DARK].neutralColor
    },
    notificationCard: {
      borderColor: COLORS[ThemeMode.DARK].borderColor,
      background: COLORS[ThemeMode.DARK].neutralColor,
      titleColor: COLORS[ThemeMode.DARK].textColor,
      subTitleColor: COLORS[ThemeMode.DARK].textColor,
      descriptionColor: COLORS[ThemeMode.DARK].textColor,
      dateColor: COLORS[ThemeMode.DARK].dateColor,
      mediaContainerBackground: COLORS[ThemeMode.DARK].imageBackground,
    },
    tabs: {
      containerBackgroundColor: COLORS[ThemeMode.LIGHT].neutralColor,
      activeTabBackgroundColor: COLORS[ThemeMode.LIGHT].neutralColor,
      inactiveTabBackgroundColor: COLORS[ThemeMode.LIGHT].neutralColor,
      activeTabTextColor: COLORS[ThemeMode.LIGHT].primaryColor,
      inactiveTabTextColor: COLORS[ThemeMode.LIGHT].textColor,
      indicatorColor: COLORS[ThemeMode.LIGHT].primaryColor,
    }
  }
};

export default defaultTheme;
