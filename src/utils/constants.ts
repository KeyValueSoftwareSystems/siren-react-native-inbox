export const COLORS = {
  light: {
    primaryColor: '#F56630',
    activeCardColor: '#FFECE5',
    textColor: '#344054',
    neutralColor: '#FFFFFF',
    borderColor: '#667185'
  },
  dark: {
    primaryColor: '#F56630',
    activeCardColor: '#292929',
    textColor: '#FFFFFF',
    neutralColor: '#344054',
    borderColor: '#667185'
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

export enum eventTypes {
  MARK_ITEM_AS_VIEWED = 'MARK_ITEM_AS_VIEWED',
  MARK_ITEM_AS_READ = 'MARK_ITEM_AS_READ',
  MARK_ALL_AS_READ = 'MARK_ALL_AS_READ',
  DELETE_ITEM = 'DELETE_ITEM',
  DELETE_ALL_ITEM = 'DELETE_ALL_ITEM',
  NEW_NOTIFICATIONS = 'NEW_NOTIFICATIONS',
  UPDATE_NOTIFICATIONS_COUNT = 'UPDATE_NOTIFICATIONS_COUNT'
}

export enum events {
  NOTIFICATION_LIST_EVENT = 'NOTIFICATION_LIST_EVENT',
  NOTIFICATION_COUNT_EVENT = 'NOTIFICATION_COUNT_EVENT'
}

export const LIST_EMPTY_TEXT = "You don't have any notifications!";
export const ERROR_TEXT = 'Something went wrong!';
export const DEFAULT_WINDOW_TITLE = 'Notifications';
export const RETRY_BUTTON_LABEL = 'Retry';
export const CLEAR_ALL_LABEL = 'Clear All';

export const errorMap = {
  SIREN_OBJECT_NOT_FOUND: {
    Type: 'ERROR',
    Code: 'SIREN_OBJECT_NOT_FOUND',
    Message: 'Siren Object Not found'
  },
  MISSING_PARAMETER: {
    Type: 'ERROR',
    Code: 'MISSING_PARAMETER',
    Message: 'Missing Parameter'
  }
};
