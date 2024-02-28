
import type { Siren } from 'test_notification';
import type { NotificationDataType } from 'test_notification/dist/types';

import { sirenReducerTypes } from '../../src/utils/constants';
import { initialState, sirenReducer } from '../../src/utils/sirenReducer';

const newNotification: NotificationDataType = {  
  id: "1",
  message: {
    header: "New Message",
    body: "You have a new message.",
    avatar: {
      imageUrl: "https://example.com/avatar.png",
      actionUrl: null
    },
    channel: '',
    subHeader: '',
    actionUrl: '',
    additionalData: ''
  },
  isRead: false,
  createdAt: "2020-01-01T00:00:00Z",
  requestId: ''
}

type actionType = 
    { type: sirenReducerTypes.SET_NOTIFICATIONS, payload: NotificationDataType[] }
    | { type: sirenReducerTypes.NEW_NOTIFICATIONS; payload: NotificationDataType[] }
    | { type: sirenReducerTypes.SET_SIREN_CORE; payload: Siren | null }
    | { type: sirenReducerTypes.SET_UN_VIEWED_NOTIFICATION_COUNT; payload: number }


describe('sirenReducer', () => {
  it('handles SET_NOTIFICATIONS action correctly', () => {
    const action: actionType = {
      type: sirenReducerTypes.SET_NOTIFICATIONS,
      payload: [newNotification]
    };
    const newState = sirenReducer(initialState, action);

    expect(newState.notifications).toEqual(action.payload);
  });

  it('handles NEW_NOTIFICATIONS action correctly', () => {
    const action: actionType = {
      type: sirenReducerTypes.NEW_NOTIFICATIONS,
      payload: [newNotification]
    };
    const newState = sirenReducer({ ...initialState, notifications: [newNotification] }, action);

    expect(newState.notifications).toEqual([...action.payload, ...[newNotification]]);
  });

  it('handles SET_SIREN_CORE action correctly', () => {
    const siren = null;
    const action: actionType = {
      type: sirenReducerTypes.SET_SIREN_CORE,
      payload: siren
    };
    const newState = sirenReducer(initialState, action);

    expect(newState.siren).toEqual(siren);
  });

  it('handles SET_UN_VIEWED_NOTIFICATION_COUNT action correctly', () => {
    const action: actionType = {
      type: sirenReducerTypes.SET_UN_VIEWED_NOTIFICATION_COUNT,
      payload: 5
    };
    const newState = sirenReducer(initialState, action);

    expect(newState.unviewedCount).toEqual(5);
  });

  test("returns the initial state for unknown actions", () => {
    const initialState = { notifications: [], unviewedCount: 0, siren: null };
    const action = { type: "UNKNOWN_ACTION" };
  
    const newState = sirenReducer(
      initialState,
      action as {
        type: sirenReducerTypes.SET_UN_VIEWED_NOTIFICATION_COUNT;
        payload: number;
      }
    );
  
    expect(newState).toEqual(initialState);
  });

  

});
