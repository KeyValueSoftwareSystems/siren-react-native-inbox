export const COLORS = {
  light: {
    primaryColor: '#EB5017',
    activeCardColor: '#FDEDE7',
    primaryTextColor: '#FFFFFF',
    textColor: '#121212',
    neutralColor: '#FFFFFF',
    borderColor: '#D0D5DD'
  },
  dark: {
    primaryColor: '#EB5017',
    activeCardColor: '#292929',
    primaryTextColor: '#FFFFFF',
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
export const defaultBadgeStyle = {
  size: 15,
  color: '#FF0000',
  textColor: '#FFFFFF',
  textSize: 7
};

export const levelLogFns = {
  [LogLevel.INFO]: console.log,
  [LogLevel.ERROR]: console.error
};

export enum updateNotificationsTypes {
  MARK_ITEM_AS_VIEWED = 'MARK_ITEM_AS_VIEWED',
  MARK_ITEM_AS_READ = 'MARK_ITEM_AS_READ',
  MARK_ALL_AS_READ = 'MARK_ALL_AS_READ',
  DELETE_ITEM = 'DELETE_ITEM',
  DELETE_ALL_ITEM = 'DELETE_ALL_ITEM'
}

export enum sirenReducerTypes {
  SET_NOTIFICATIONS = 'SET_NOTIFICATIONS',
  NEW_NOTIFICATIONS = 'NEW_NOTIFICATIONS',
  SET_UN_VIEWED_NOTIFICATION_COUNT = 'SET_UN_VIEWED_NOTIFICATION_COUNT',
  SET_SIREN_CORE = 'SET_SIREN_CORE'
}

export const LIST_EMPTY_TEXT = "You don't have any notifications!";
export const ERROR_TEXT = 'Something went wrong!';
export const DEFAULT_WINDOW_TITLE = 'Notifications';
export const RETRY_BUTTON_LABEL = 'Retry';
export const CLEAR_ALL_LABEL = 'Clear All';

export const errorMap = {
  SIREN_OBJECT_NOT_FOUND: {
    Type: "ERROR",
    Code: "SIREN_OBJECT_NOT_FOUND",
    Message: "Siren Object Not found",
  },
  MISSING_PARAMETER: {
    Type: "ERROR",
    Code: "MISSING_PARAMETER",
    Message: "Missing Parameter",
  },
}