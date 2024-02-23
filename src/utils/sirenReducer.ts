import type { NotificationDataType } from 'bilta-sdk/dist/types';

import { sirenReducerTypes } from './constants';
import type { Siren } from 'bilta-sdk';

export const initialState = {
  notifications: [],
  unviewedCount: 0,
  sirenCore: null
};

export const sirenReducer = (
  state: { notifications: NotificationDataType[]; unviewedCount: number; sirenCore: Siren | null },
  action:
    | { type: sirenReducerTypes.SET_NOTIFICATIONS; payload: NotificationDataType[] }
    | { type: sirenReducerTypes.NEW_NOTIFICATIONS; payload: NotificationDataType[] }
    | { type: sirenReducerTypes.SET_SIREN_CORE; payload: Siren | null }
    | { type: sirenReducerTypes.SET_UN_VIEWED_NOTIFICATION_COUNT; payload: number }
) => {
  switch (action.type) {
    case sirenReducerTypes.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload
      };
    case sirenReducerTypes.NEW_NOTIFICATIONS:
      return {
        ...state,
        notifications: [...action.payload, ...state.notifications]
      };
    case sirenReducerTypes.SET_SIREN_CORE:
      return {
        ...state,
        sirenCore: action.payload
      };
    case sirenReducerTypes.SET_UN_VIEWED_NOTIFICATION_COUNT:
      return {
        ...state,
        unviewedCount: action.payload
      };
    default:
      return state;
  }
};
