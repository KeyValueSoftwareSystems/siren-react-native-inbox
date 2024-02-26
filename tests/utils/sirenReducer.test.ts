// import { sirenReducer, initialState } from '../src/utils/sirenReducer';
// import { sirenReducerTypes } from '../src/utils/constants';

// const newNotification = {  
//   id: "1",
//   message: {
//     header: "New Message",
//     body: "You have a new message.",
//     avatar: {
//       imageUrl: "https://example.com/avatar.png",
//       actionUrl: null
//     },
//     channel: '',
//     subHeader: '',
//     actionUrl: '',
//     additionalData: ''
//   },
//   isRead: false,
//   createdAt: "2020-01-01T00:00:00Z",
//   requestId: ''
// }

// describe('sirenReducer', () => {
//   it('handles SET_NOTIFICATIONS action correctly', () => {
//     const action = {
//       type: sirenReducerTypes.SET_NOTIFICATIONS,
//       payload: [newNotification]
//     };
//     const newState = sirenReducer(initialState, action);

//     expect(newState.notifications).toEqual(action.payload);
//   });

//   it('handles NEW_NOTIFICATIONS action correctly', () => {
//     const action = {
//       type: sirenReducerTypes.NEW_NOTIFICATIONS,
//       payload: [newNotification]
//     };
//     const newState = sirenReducer({ ...initialState, notifications: [newNotification] }, action);

//     expect(newState.notifications).toEqual([...action.payload, ...[newNotification]]);
//   });

//   it('handles SET_SIREN_CORE action correctly', () => {
//     const sirenCore = { /* Mocked Siren object */ };
//     const action = {
//       type: sirenReducerTypes.SET_SIREN_CORE,
//       payload: sirenCore
//     };
//     const newState = sirenReducer(initialState, action);

//     expect(newState.sirenCore).toEqual(sirenCore);
//   });

//   it('handles SET_UN_VIEWED_NOTIFICATION_COUNT action correctly', () => {
//     const action = {
//       type: sirenReducerTypes.SET_UN_VIEWED_NOTIFICATION_COUNT,
//       payload: 5
//     };
//     const newState = sirenReducer(initialState, action);

//     expect(newState.unviewedCount).toEqual(5);
//   });

//   it('returns the current state for unknown action types', () => {
//     const currentState = { notifications: [], unviewedCount: 0, sirenCore: null };
//     const action = {
//       type: 'UNKNOWN_ACTION',
//       payload: null
//     };
//     const newState = sirenReducer(currentState, action);

//     expect(newState).toEqual(currentState);
//   });
// });
