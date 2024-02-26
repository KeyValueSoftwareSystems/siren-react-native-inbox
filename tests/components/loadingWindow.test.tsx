// import React from 'react';
// import { render } from '@testing-library/react-native';
// import LoadingWindow from './loadingWindow';

// describe('LoadingWindow', () => {
//   const customStyles = { /* custom styles */ };
//   const customTheme = { /* custom theme properties */ };
//   const mode = 'light';

//   it('renders without crashing', () => {
//     render(
//       <LoadingWindow
//         styles={customStyles}
//         mode={mode}
//         theme={customTheme}
//       />
//     );
//   });

//   it('renders ActivityIndicator', () => {
//     const { getByTestId } = render(
//       <LoadingWindow
//         styles={customStyles}
//         mode={mode}
//         theme={customTheme}
//       />
//     );

//     // Verify that ActivityIndicator is rendered
//     expect(getByTestId('activity-indicator')).toBeTruthy();
//   });

//   it('sets color based on theme and mode', () => {
//     const { getByTestId } = render(
//       <LoadingWindow
//         styles={customStyles}
//         mode={mode}
//         theme={customTheme}
//       />
//     );

//     const activityIndicator = getByTestId('activity-indicator');

//     // Check if color is set correctly based on the provided theme and mode
//     expect(activityIndicator.props.color).toEqual(customTheme?.colors?.textColor || '#000');
//   });
// });
