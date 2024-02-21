export const COLORS = {
  light: {
    primaryColor: '#EB5017',
    activeCardColor: '#FDEDE7',
    primaryTextColor: '#FFFFFF',
    secondaryColor: '#3D89DF',
    textColor: '#121212',
    neutralColor: '#FFFFFF',
    borderColor: '#D0D5DD'
  },
  dark: {
    primaryColor: '#EB5017',
    activeCardColor: '#292929',
    primaryTextColor: '#FFFFFF',
    secondaryColor: '#3D89DF',
    textColor: '#FFFFFF',
    neutralColor: '#121212',
    borderColor: '#D0D5DD'
  }
};

export enum ThemeMode {
  DARK = 'dark',
  LIGHT = 'light'
}

export enum LogLevel {
  INFO,
  ERROR
}

export enum BadgeType {
  NONE = 'none',
  DOT = 'dot',
  DEFAULT = 'default'
}

export const levelLogFns = {
  [LogLevel.INFO]: console.log,
  [LogLevel.ERROR]: console.error
};

export const LIST_EMPTY_TEXT = "You don't have any notifications!";
export const ERROR_TEXT = 'Something went wrong!';
export const DEFAULT_WINDOW_TITLE = 'Notifications';
export const RETRY_BUTTON_LABEL = 'Retry';
